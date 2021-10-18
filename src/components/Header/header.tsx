import React from 'react'
import { observer } from "mobx-react";


import { Row, Col } from 'antd';
import Navbar from '../Navbar/navbar';
import Title from '../Title/title';

@observer
class Header extends React.Component {

  render() {
    return (
      <Row>
        <Col span={20}>
          <Title />
        </Col>
        <Col className="navbar-span" span={4}>
          <Navbar />
        </Col>
      </Row>
    );
  }
}

export default Header;