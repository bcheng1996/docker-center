import React, { Component } from 'react';
import {
    Modal,
    Button,
    Input,
    Layout,
    Row,
    Col,
    Icon,
    Empty
} from 'antd'
import Colors from '../constants/Colors';

const { Search } = Input;
const {Header, Content} = Layout;

type Props = {
    hidePropertyModal: () => void,
    searchProperty: (search_term) => void,
    property: Dict,
    is_searching: Boolean,
    visible: Boolean
}

export default class PropertyModal extends Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
      };
    
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
            visible: false,
            confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.props.hidePropertyModal()
    };

    renderPropertyInfo = (property) => {
        console.log("PROPERTY", property)

        return(
            <p>property</p>
        )
    }

    render() {
        const { visible, hidePropertyModal, searchProperty, is_searching, property } = this.props 
        const { confirmLoading, ModalText } = this.state;
        return (
            <div>
                <Modal
                    title="Add a New Property"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Layout>
                        <Header style={{backgroundColor: Colors.white}}>
                            <Row>
                                <Col span={2}>
                                    <Icon style={{fontSize: 18}} type="home"/>
                                </Col>
                                <Col span={22}>
                                    <Search
                                        placeholder="ZPID. Example: 51811295"
                                        onSearch={value => searchProperty(value)}
                                        loading={this.props.is_searching}
                                      />
                                </Col>
                            </Row>

                        </Header>
                        <Content style={{backgroundColor: Colors.white}}>
                            {Object.keys(property).length != 0 ? this.renderPropertyInfo(property) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> }
                        </Content>
                    </Layout>
                </Modal>
            </div>
        );
    }
    
}
