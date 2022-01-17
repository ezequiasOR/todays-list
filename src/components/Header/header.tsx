import React from 'react'
import { observer } from 'mobx-react'

import { Row, Col, Divider } from 'antd'
import Navbar from '../Navbar/navbar'
import Title from '../Title/title'

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
        <Divider className="ant-card-bordered" style={{ margin: '0px' }} />
      </Row>
    )
  }
}

export default Header
