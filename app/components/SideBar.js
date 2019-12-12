import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import styles from './SideBar.css';
import routes from '../constants/routes';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class SideBar extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { children } = this.props;
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" onClick={({ item, key, keyPath }) => console.log(key)}>
            <Menu.Item key="1" title="Explore">
              <Icon type="search" />
              Search
              <Link to={routes.HOME} className={styles.link}>Home</Link>
            </Menu.Item>
            <Menu.Item key="2" title="Properties"> 
              <Icon type="home" />
              Properties
              <Link to={routes.PROPERTIES} className={styles.link}>Properties</Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>{children}</Layout>
      </Layout>
    );
  }
}
