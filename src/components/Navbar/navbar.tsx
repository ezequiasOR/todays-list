import React from 'react'
import { observer } from "mobx-react";
import './navbar.css'

import { Menu, Row } from 'antd';
import { HomeOutlined, LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

@observer
class Navbar extends React.Component {
  state = {
    current: 'home',
  };

  handleClick = (e: { key: string }) => {
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Row justify="end" className="row-menu" >
        <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <SubMenu key="menu" icon={<MenuOutlined />} title="Menu">
            <Menu.Item key="profile" icon={<UserOutlined />}>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>Logout</Menu.Item>
          </SubMenu>
        </Menu>
      </Row>
    );
  }
}

export default Navbar;