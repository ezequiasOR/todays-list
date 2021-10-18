import React from 'react'
import { observer } from "mobx-react";
import './navbar.css'


import { Menu } from 'antd';
import { SettingOutlined, HomeOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
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
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <SubMenu key="menu" icon={<MenuOutlined />} title="Menu">
          <Menu.Item key="profile" icon={<SettingOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>Logout</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default Navbar;