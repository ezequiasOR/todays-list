import React from 'react'

import { observer } from 'mobx-react'
import { Button, Col, Form, Input, Row } from 'antd'
import { FormInstance } from 'antd/es/form'
import UserStore from '../../stores/UserStore'
import { SaveFilled } from '@ant-design/icons'
import CrudActionType from '../../utils/CrudActionType'

@observer
class SignUpForm extends React.Component {
  formRef = React.createRef<FormInstance>()
  protected store
  protected history

  constructor(props) {
    super(props)
    this.store = new UserStore()
    this.history = props.history
  }

  onFinish = () => {
    this.store.save(
      CrudActionType.CREATE,
      () => {},
      () => {},
      `signup`
    )
    this.onReset()
    this.history.push('/signin')
  }

  onReset = () => {
    this.formRef.current!.resetFields()
  }

  render() {
    return (
      <Form layout="vertical" onFinish={() => this.onFinish()} ref={this.formRef}>
        <Row>
          <Col span={8} offset={8}>
            <Form.Item label="Username" name={'username'}>
              <Input
                placeholder={'Type the username'}
                onChange={(value) =>
                  this.store.updateAttributeDecoratorKeyEventValue('username', value)
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={8}>
            <Form.Item label="name" name={'name'}>
              <Input
                placeholder={'Type the name'}
                onChange={(value) =>
                  this.store.updateAttributeDecoratorKeyEventValue('name', value)
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={8}>
            <Form.Item label="E-mail" name={'email'}>
              <Input
                placeholder={'Type the email'}
                onChange={(value) =>
                  this.store.updateAttributeDecoratorKeyEventValue('email', value)
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={8}>
            <Form.Item label="Password" name={'password'}>
              <Input
                placeholder={'Type the password'}
                onChange={(value) =>
                  this.store.updateAttributeDecoratorKeyEventValue('password', value)
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={2} offset={8}>
            <Form.Item label=" ">
              <Button size={'large'} type="primary" htmlType="submit" icon={<SaveFilled />}>
                Sign Up
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default SignUpForm
