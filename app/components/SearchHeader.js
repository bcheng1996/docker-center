import React, { Component } from 'react';
import {
    Layout,
    Button,
    Popover,
    Row,
    Col,
    List,
    Card,
    Typography,
    Input,
    Icon,
    Form,
    message,
    AutoComplete
  } from 'antd';
  
import PropertyModal from './PropertyModal';
import PriceFilter from './PriceFilter';
import BedroomsFilter from './BedroomsFilter';
import Colors from '../constants/Colors';
import * as GCP from '../api/google';
import * as API from '../api/api';

const { Search } = Input;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Option } = AutoComplete;

type Props = {
    searchProperty: (search_term) => void,
    showPropertyModal: () => void,
    hidePropertyModal: () => void,
    getAllProperties: () => void,
    search_term: string
}

export default class SearchHeader extends Component<Props> {

    constructor(props){
        super(props);
        this.state = {
            priceTitle: "Price",
            bedroomsTitle: "Bedrooms",
            filters: {},
            priceVisible: false,
            bedroomsVisible: false,
            dataSource: [],
            autoCompleteValue: ""
        }
        this.timeout = 0
    
    }
   
    setFilters = (filters, type) => {
        let newFilters = this.state.filters;
        for(let filter in filters) {
            if(filter == "bedrooms" && newFilters.hasOwnProperty('bedrooms[gte]')) {
                // use exact bedrooms filter
                delete newFilters['bedrooms[gte]']
            }
            if(filter == "bedrooms[gte]" && newFilters.hasOwnProperty('bedrooms')) {
                // use greater than range operator; bedrooms[gte]
                delete newFilters['bedrooms']
            }
            newFilters[filter] = filters[filter]
        }

        this.setState(Object.assign({}, this.state, {
            filters: newFilters,
            priceVisible: type == "price"? false: this.state.priceVisible,
            bedroomsVisible: type == "bedrooms"? false: this.state.bedroomsVisible 
        }), () => {
            this.props.getAllProperties(newFilters)
            message.config({top: 75})
            message.info("Filter applied", 5)
        })
    }

    handlePlaceSearch = (place) => {
        message.loading({content: "Searching location", key:"updatable"})
        GCP.placeSearch(place).then(
            place => {
                message.success({content: "Location found!", key:"updatable"})
                this.props.center_map(place['candidates'][0]['geometry']['location']['lat'], place['candidates'][0]['geometry']['location']['lng'])
            }
        )
    }

    handleAutoComplete = (value) => {
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          API.searchLocations(value)
          .then(res => {
              this.setState({dataSource: res["addresses"].concat(res['cities'])}, () =>{
                  console.log(this.state.dataSource.map(this.renderOption))
              })
          })
        }, 300);

        // this.setState({dataSource: !value? [] : API.getProperties})
    }

    renderOption = (item) => {
        if(item['street']){
            return (
                <Option key={`street_${item['id']}`} text={item['street']}>
                  <div className="global-search-item">
                    <span className="global-search-item-desc">
                        {item['street']}
                    </span>
                  </div>
                </Option>
              );
        }
        if(item['name']){
            return (
                <Option key={`city_${item['id']}`} text={item['name']}>
                  <div className="global-search-item">
                    <span className="global-search-item-desc">
                        {item['name']}
                    </span>
                  </div>
                </Option>
              );
        }
    }

    handleOnSelect = (item) => {

    }

  render() {
    const {searchProperty, showPropertyModal, getAllProperties, search_term} = this.props
    const {priceTitle, bedroomsTitle, dataSource, autoCompleteValue} = this.state
    return (
        <Layout>
            <Header style={styles.header}>
                <Row align="bottom" justify="end" gutter={[12, 0]}>
                    <Col span={7}>
                        <AutoComplete
                            value={autoCompleteValue}
                            dataSource={dataSource.map(this.renderOption)}
                            placeholder="City, State"
                            onSearch={(value) => this.handleAutoComplete(value)}
                            onChange={(value) => this.setState({autoCompleteValue: value}, () => console.log(value))}
                            onSelect={(value, option) => this.setState({autoCompleteValue: option.props.text})}
                        />
                    </Col>

                    <Col span={3} >
                        <Popover
                        placement="bottom"
                        title="Price Range"
                        content={<PriceFilter filter={(filters) => this.setFilters(filters, "price")} setTitle={(title)=> this.setState({'priceTitle': title})}/>}
                        trigger="click"
                        visible={this.state.priceVisible}
                        >
                        <Button type="primary" ghost style={styles.popoverButton} onClick={() => this.setState({priceVisible: !this.state.priceVisible, bedroomsVisible: false})}>
                            {priceTitle}
                        </Button>
                        </Popover>
                    </Col>
                    <Col span={3} >
                        <Popover
                        placement="bottom"
                        title="Number of Bedrooms"
                        content={<BedroomsFilter filter={(filters) => this.setFilters(filters, "bedrooms")} setTitle={(title)=> this.setState({'bedroomsTitle': title})}/>}
                        trigger="click"
                        visible={this.state.bedroomsVisible}
                        >
                        <Button type="primary" ghost style={styles.popoverButton} onClick={() => this.setState({bedroomsVisible: !this.state.bedroomsVisible, priceVisible: false})}>
                            {bedroomsTitle}
                        </Button>
                        </Popover>
                    </Col>

                    <Col style={{'position': 'absolute', 'right': 0}}>
                        <Button type='dashed' icon="plus" onClick={showPropertyModal}>New Property</Button>
                    </Col>
                </Row>
            </Header>
      </Layout>
    );
  }
}

const styles = {
    header: {
      paddingLeft: 20,
      backgroundColor: Colors.white,
      borderBottom: '1px solid #777777',
      shadowColor: '#777777',
      shadowRadius: '10px',
      shadowOpacity: 0.8
    },
    popoverButton: {
      width: '100%',
      flexWrap: 'wrap'
    },
  };