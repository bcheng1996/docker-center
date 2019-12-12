import React, { Component } from 'react';
import {Layout, List, Rate} from 'antd';
import PropertyCard from '../components/PropertyCard';
import Comment from '../components/Comment';
import * as Format from '../utils/format';

import Colors from '../constants/Colors';
// import styles from './Properties.css';

const {Content, Sider, Header} = Layout;


export default class Properties extends Component {

    state = {
        collapsed: true,
        comments: []
    };


    componentDidMount() {
        this.props.getAllProperties();
    }


    onCollapse = collapsed => {
      this.setState({collapsed})
    };

    handlePropertyCardClick = (property) => {
        this.setState({
            collapsed: false,
            comments: [property.id]
        })
    }

    render() {
        const { collapsed, comments } = this.state
        const { properties } = this.props
        const data = properties;

        return (
            <Layout>
                <Content style={{backgroundColor: Colors.white, padding: 20}}>
                <Header style={{backgroundColor: Colors.white}}>

                </Header>
                    <List
                        grid={{ gutter: [10, 10], column: 3 }}
                        dataSource={data}
                        renderItem={(property) => (
                            <List.Item>
                                <PropertyCard 
                                    image={property.images[0]}
                                    height={300}
                                    title={Format.formatCurrency(property.estimate)} 
                                    subtitle={property.Address.street + ", " + property.Address.City.name + ", " + property.Address.State.name + " " + property.Address.zipcode}
                                    rightContent={`${property.bedrooms} bd | ${property.bathrooms} ba | ${property.finishedSqFt} sqft`}
                                    footer={<Rate disabled value={property.rating}></Rate>}
                                    onClick={() => this.handlePropertyCardClick(property)}
                                />
                            </List.Item>
                        )}
                    />
                </Content>
                <Sider 
                    collapsible
                    reverseArrow
                    theme="light"
                    style={styles.rightSideBar}
                    width={500}
                    collapsedWidth={0}
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}
                >
                    <Content style={{padding: 10}}>
                        <Comment/>
                    </Content>
                </Sider>
            </Layout>
        );
    }
}



const styles = {
    rightSideBar: {
        boxShadow: `-3px 0px 10px rgba(0,0,0,0.15)`,
        shadowOpacity: 0.3
    },
}