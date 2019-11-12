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
  Input
} from 'antd';
import Map from '../containers/Map';
import SearchHeader from '../containers/SearchHeader';
import Colors from '../constants/Colors';

const { Search } = Input;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const data = [
      {
        title: 'Title 1'
      },
      {
        title: 'Title 2'
      },
      {
        title: 'Title 3'
      },
      {
        title: 'Title 4'
      }
    ];
    return (
      <Layout>
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
                <List
                  grid={{ gutter: [10, 10], column: 2 }}
                  dataSource={data}
                  renderItem={() => (
                    <List.Item>
                      <Card
                        hoverable
                        style={styles.card}
                        size="small"
                        cover={
                          <img
                            alt="example"
                            style={{ maxHeight: 125, objectFit: 'cover' }}
                            src="https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg"
                          />
                        }
                      >
                        <Row type="flex" justify="space-between" aligh="bottom">
                          <Col>
                            <Title level={4}>$670,000</Title>
                          </Col>
                          <Col>5 bd | 8 ba | 15,000 sqft </Col>
                        </Row>
                        <Row>
                          <Col>201 Cardinal Ln, Nellysford, VA 22968</Col>
                        </Row>
                      </Card>
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
