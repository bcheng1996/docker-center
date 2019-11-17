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
    Icon
  } from 'antd';
import PropertyModal from './PropertyModal';
import Colors from '../constants/Colors';

const { Search } = Input;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

type Props = {
    searchProperty: (search_term) => void,
    showPropertyModal: () => void,
    hidePropertyModal: () => void,
    search_term: string
}

export default class SearchHeader extends Component<Props> {

   
    
  render() {
    const {searchProperty, showPropertyModal, search_term} = this.props
    return (
        <Layout>
            <Header style={styles.header}>
                <Row align="bottom" justify="end" gutter={[12, 0]}>
                    <Col span={7}>
                        <Search
                            placeholder="City, State"
                            onSearch={value => {console.log(search_term); searchProperty(value)}}
                        />
                    </Col>

                    <Col span={3} >
                        <Popover
                        placement="bottom"
                        title="Bottom"
                        content="bottom"
                        trigger="click"Property
                        >
                        <Button type="primary" ghost style={styles.popoverButton}>
                            Price
                        </Button>
                        </Popover>
                    </Col>
                    <Col span={3} >
                        <Popover
                        placement="bottom"
                        title="Bottom"
                        content="bottom"
                        trigger="click"
                        >
                        <Button type="primary" ghost style={styles.popoverButton}>
                            Beds
                        </Button>
                        </Popover>
                    </Col>
                    <Col span={3}>
                        <Popover
                        placement="bottom"
                        title="Bottom"
                        content="bottom"
                        trigger="click"
                        >
                        <Button type="primary" ghost style={styles.popoverButton}>
                            Home Type
                        </Button>
                        </Popover>
                    </Col>

                    <Col offset={6} span={2}>
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