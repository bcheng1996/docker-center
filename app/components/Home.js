// @flow
import React, { Component } from 'react';
// import routes from '../constants/routes';
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
  Modal
} from 'antd';
import Map from '../containers/Map';
import SearchHeader from '../containers/SearchHeader';
import Colors from '../constants/Colors';
import PropertyModal from '../containers/PropertyModal';
import PropertyCard from '../components/PropertyCard';
import PropertyPopup from './PropertyPopup';

import * as Format from '../utils/format';

const { Search } = Input;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

type Props = {
  visible: Boolean
};

export default class Home extends Component<Props> {
  props: Props;

  state = {
    collapsed: false
  };

  componentDidMount() {
    this.props.getAllProperties();
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handlePropertyCardClick = (property) => {
    this.props.selectProperty(property);
    this.props.centerMap(property.Address.latitude, property.Address.longitude);
  }

  render() {
    const { collapsed } = this.state;
    const { properties } = this.props
    const data = properties;
    return (
      <Layout>
        <PropertyModal />
        <Content
          style={{
            minHeight: 280,
            background: '#fff'
          }}
        >
          <SearchHeader/>
          <Layout>
            <Sider width={0} />
            <Content>
              <Map />
            </Content>
            <Sider
              collapsible
              style={styles.rightSideBar}
              width={700}
              collapsedWidth={0}
              reverseArrow
              theme="light"
              collapsed={collapsed}
              onCollapse={this.onCollapse}
            >
              <Content style={{ padding: 10 }}>
                {/* <PropertyCard title="51747943" subtitle="201 Cardinal Ln, Nellysford, VA 22968" rightContent="5 bd | 8 ba | 15,000 sqft"/> */}
                <List
                  grid={{ gutter: [10, 10], column: 2 }}
                  dataSource={data}
                  renderItem={(property) => (
                    <List.Item>
                      <PropertyCard 
                        image={property.images[0]}
                        title={Format.formatCurrency(property.estimate)} 
                        subtitle={property.Address.street + ", " + property.Address.City.name + ", " + property.Address.State.name + " " + property.Address.zipcode}
                        rightContent={`${property.bedrooms} bd | ${property.bathrooms} ba | ${property.finishedSqFt} sqft`}
                        onClick={() => this.handlePropertyCardClick(property)}
                      />
                    </List.Item>
                  )}
                />
              </Content>
            </Sider>
          </Layout>
        </Content>
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
    width: 100
  },
  rightSideBar: {
    backgroundColor: Colors.white,
    boxShadow: `-3px 0px 10px rgba(0,0,0,0.15)`,
    shadowOpacity: 0.3
  },
  card: {
    // borderRadius: 0,
    // borderBottomColor: 'transparent',
    // boxShadow: `0px 5px 0px 0px ${Colors.primary}`,
  }
};
