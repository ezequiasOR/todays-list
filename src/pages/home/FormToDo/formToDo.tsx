import React from 'react';
import { observer } from 'mobx-react'
import { Form, Input, Button, Select, DatePicker, Row, Col } from 'antd';
import { FormInstance } from 'antd/es/form';
import ToDoStore from '../../../stores/todoStore'
import CrudActionType from '../../../utils/CrudActionType';

@observer
class FormToDo extends React.Component {
  formRef = React.createRef<FormInstance>()
  protected store
  protected lists = []
  protected toDoInfos

  constructor(props) {
    super(props)
    this.lists = props.lists
    this.toDoInfos = props.toDoInfos
    this.store = new ToDoStore()
  }

  onFinish = (token: string) => {
    this.store.save(CrudActionType.CREATE, () => {}, () => {}, `todo`)
    this.onReset()
  }

  onReset = () => {
    this.formRef.current!.resetFields();
  };

  render() {
    return (
      <Form
        layout="vertical"
        onFinish={() => this.onFinish("token")}
        ref={this.formRef}
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label="To do" name={'description'} >
              <Input
                placeholder={'Type the ToDo'}
                onChange={value => 
                  this.store.updateAttributeDecoratorKeyEventValue('description', value)
                }
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="List" name={'listId'}>
              <Select
                placeholder={'Choose the ToDo List'}
                options={this.lists}
                onChange={value => 
                  this.store.updateAttributeDecoratorKeyValue('listId', value)
                }
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Date" name={'dtToDo'} >
              <DatePicker
                showTime={true}
                showSecond={false}
                onChange={dh => 
                  this.store.updateAttributeDecoratorKeyValue('dtToDo', dh)
                }
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item label=" ">
              <Button style={{ padding: '4px 6px' }} size={'middle'} type="primary" htmlType="submit" >Add ToDo</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
};

export default FormToDo