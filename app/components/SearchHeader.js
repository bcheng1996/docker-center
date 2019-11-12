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
    Input
  } from 'antd';

import Colors from '../constants/Colors';

const { Search } = Input;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

type Props = {
    searchProperty: (search_term) => void,
    search_term: string
}

export default class SearchHeader extends Component<Props> {

   
    
  render() {
    const {searchProperty, search_term} = this.props
    return (
        <Layout>
            <Header style={styles.header}>
                <Row align="bottom" justify="space-around" gutter={[12, 0]}>
                    <Col span={9}>
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
                        trigger="click"
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