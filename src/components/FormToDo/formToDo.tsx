import React from 'react';
import { observer } from 'mobx-react'
import { Form, Input, Button, Select, DatePicker, Row, Col } from 'antd';
import ToDoService from '../../services/todo'
import ToDoStore from '../../stores/todoStore'
import ToDo from "../../domains/toDo"

@observer
class FormToDo extends React.Component {
  protected store
  constructor(props) {
    super(props)
    this.store = new ToDoStore(ToDo, ToDoService, 'ToDo')
  }
  onFinish = (token: string) => {
    debugger
    console.log(token)
    this.store.addTodo()
  }

  render() {

    return (
      <Form layout="vertical" onFinish={() => this.onFinish("token")} >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label="To do" rules={[{required: true,  message: 'Por favor escolhe suas categorias!',}]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="List">
              <Select>
                <Select.Option value="demo">Today's List</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Date">
              <DatePicker showTime={true} showSecond={false} />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item label=" ">
              <Button size={'middle'} type="primary" htmlType="submit" >Add ToDo</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
};

export default FormToDo