import React, { Component } from 'react';
import {
    Modal,
    Button,
    Input,
    Layout,
    Row,
    Col,
    Icon,
    Empty,
    Carousel,
    Typography,
    Form,
    Rate,
    Alert,
} from 'antd'
import Map from '../containers/Map';
import FactsPane from './FactsPane';
import Colors from '../constants/Colors';
import * as Format from '../utils/format';
import PropertyForm from './PropertyForm';


const { Search } = Input;
const { Title, Text } = Typography;
const {Header, Content, Sider, Footer} = Layout;

type Props = {
    hidePropertyModal: () => void,
    searchProperty: (search_term) => void,
    addProperty: (property) => void,
    property: Dict,
    is_searching: Boolean,
    visible: Boolean,
    loading: Boolean,
}

export default class PropertyModal extends Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        rating: 2.5,
        input_zpid: '',
        image_url: '',
        input_image_url: '',
        can_submit: false,
      };
    
    timer = null;


    componentDidUpdate(prevProps) {
        if(this.props.property['zpid'] != prevProps.property['zpid']) {
            this.setState({input_image_url: '', image_url: '', rating: 2.5})
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };


    handleSearch = (value) => {
        this.props.searchProperty(value)
        if(this.props.property_ids.includes(parseInt(value))) {
            this.setState({can_submit: false})
        }else{
            this.setState({can_submit: true})
        }
        
    }

    handleOk = (property) => {
        let copy_property = {...property}
        copy_property['rating'] = this.state.rating,
        copy_property['images'] = [this.state.image_url]

        this.props.addProperty(copy_property)
    };
    
    handleCancel = () => {
        this.props.hidePropertyModal();
    };

    handleImageUrlChange = ({ target: { value } }) => {
        if(this.timer) {
            clearTimeout(this.timer);
        }
        this.setState({input_image_url: value})
        this.timer = setTimeout(() => this.setState({image_url: value}), 200);  
    }

    handleImageUrlError = () => {
        this.setState({image_url: ''});
    }

    handleRatingChange = (value) => {
        this.setState({rating: value});
    }

    handleDisabled = () => {
        return (this.state.image_url == '' || !this.state.can_submit)
    }

    handleAfterClose = () => {
        this.setState({
            image_url: '',
            input_image_url: '',
            input_zpid: '',
            can_submit: false,
        }, () => {
            this.props.emptySearch()
        })
    }

    handleZPIDChange = ({target: {value}}) => {
        this.setState({input_zpid: value})
    }


    renderPropertyInfo = (property) => {
        const property_zestimate = Format.formatCurrency(property['zestimate']['amount']['_']);
        const property_address = property['address'];
        const property_details = property['details'];

        return(
            <Layout>
                <Sider theme={'light'} width="50%">
                    <Title level={3}>
                        {property_zestimate}
                    </Title>
                    <Text>
                        <b>{property_details['bedrooms']}</b> bed | <b>{property_details['bathrooms']}</b> bath | <b>{property_details['finishedSqFt']}</b> sqft
                    </Text>

                    <Title level={4}>
                        {property_address['street'] + ", " + property_address['city'] + ", " + property_address['state'] + " " + property_address['zipcode']}
                    </Title>

                    <FactsPane title={"Facts & Features"} facts={this.props.getFacts(property)}/>
                </Sider>
                <Content style={{backgroundColor: Colors.white}}>
                <Form layout="vertical">
                    <Form.Item 
                        label="ImageURL">
                        <Input value={this.state.input_image_url} onChange={this.handleImageUrlChange}/>
                    </Form.Item>
                    {this.state.image_url? 
                        <img style={{width: '100%', height: '100%'}} onError={this.handleImageUrlError} src={this.state.image_url}></img>
                        :
                        <Empty imageStyle={{width: '100%', height: '100%'}}/>
                    }
                    <Form.Item 
                        label="Rate">
                        <Rate allowHalf value={this.state.rating} onChange={this.handleRatingChange}/>
                    </Form.Item>
                </Form>
                    {/* <img src="https://photos.zillowstatic.com/cc_ft_768/ISv4rw0nvwxc1h0000000000.webp"></img> */}
                </Content>
            </Layout>
        )
    }

    renderFooter = (property) => {
        console.log(this.props.property_ids.includes(parseInt(property['zpid'])))
        if(property && this.props.property_ids.includes(parseInt(property['zpid']))){
            return(
                <Footer style={{backgroundColor: Colors.white}}>
                    <Alert
                        message="Duplicate Property"
                        description="This property is already in your list!"
                        type="info"
                        showIcon
                    />
                </Footer>
            )
        }
        return null
    }

    render() {
        const { visible, hidePropertyModal, searchProperty, is_searching, property, loading} = this.props 
        const { confirmLoading, ModalText, rating } = this.state;
        return (
            <div>
                <Modal
                    title="Add a New Property"
                    width={800}
                    visible={visible}
                    okText="Add"
                    okButtonProps={{disabled: this.handleDisabled()}}
                    onOk={() => this.handleOk(property)}
                    confirmLoading={loading}
                    onCancel={this.handleCancel}
                    afterClose={this.handleAfterClose}
                >
                    <Layout>
                        <Header style={{backgroundColor: Colors.white}}>
                            <Row justify="start">
                                <Col span={2}>
                                    <Icon style={{fontSize: 18}} type="home"/>
                                </Col>
                                <Col span={22}>
                                    <Search
                                        placeholder="ZPID. Example: 51811295"
                                        value={this.state.input_zpid}
                                        onChange={e => this.handleZPIDChange(e)}
                                        onSearch={value => this.handleSearch(value)}
                                        loading={this.props.is_searching}
                                      />
                                </Col>
                            </Row>
                        </Header>
                        <Content style={{backgroundColor: Colors.white}}>
                            {Object.keys(property).length != 0  ? this.renderPropertyInfo(property) : 
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> }
                        </Content>
                        {this.renderFooter(property)}
                    </Layout>
                </Modal>
            </div>
        );
    }
    
}
