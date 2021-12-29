import React from 'react';

import { observer } from "mobx-react";
import { Button, Col, Form, Input, Row } from 'antd';
import { FormInstance } from 'antd/es/form';
import UserStore from '../../stores/UserStore';
import { LoginOutlined } from '@ant-design/icons';
import { setUserSession } from '../../utils/Utils';

@observer
class SignInForm extends React.Component {
  formRef = React.createRef<FormInstance>()
  protected store
  private history

  constructor(props) {
    super(props)
    this.store = new UserStore()
    this.history = props.history
  }

  onFinish = () => {
    this.store.login(
      setUserSession,
      () => {},
      `signin`
    )
    this.onReset()
  }

  onReset = () => {
    this.formRef.current!.resetFields();
    this.history.push('/')
  }

  render() {
    return (
      <Form
        layout="vertical"
        onFinish={() => this.onFinish()}
        ref={this.formRef}
      >
        <Row>
          <Col span={8} offset={8} >
            <Form.Item label="Username" name={'username'} >
              <Input
                placeholder={'Type the username'}
                onChange={value => 
                  this.store.updateAttributeDecoratorKeyEventValue('username', value)
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={8} >
            <Form.Item label="Password" name={'password'} >
              <Input
                placeholder={'Type the password'}
                onChange={value => 
                  this.store.updateAttributeDecoratorKeyEventValue('password', value)
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={2} offset={8} >
            <Form.Item label=" ">
              <Button
                size={'large'}
                type="primary"
                htmlType="submit"
                icon={<LoginOutlined />}
              >
                Sign In
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SignInForm
