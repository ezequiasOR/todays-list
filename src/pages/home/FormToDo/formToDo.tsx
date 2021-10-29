import React from 'react';
import { observer } from 'mobx-react'
import { Form, Input, Button, Select, DatePicker, Row, Col } from 'antd';
import { FormInstance } from 'antd/es/form';
import ToDoStore from '../../../stores/todoStore'
import CrudActionType from '../../../utils/CrudActionType';
import { SaveFilled } from '@ant-design/icons';
import moment from 'moment';

@observer
class FormToDo extends React.Component {
  formRef = React.createRef<FormInstance>()
  protected store
  protected homeStore
  protected homeIndex
  protected lists = []
  protected toDoObj

  constructor(props) {
    super(props)
    debugger
    this.lists = props.lists
    this.toDoObj = props.toDoObj
    this.homeStore = props.homeStore
    this.homeIndex = props.homeIndex
    this.store = new ToDoStore()
  }

  componentDidMount() {
    if (this.toDoObj) {
      this.store.init(this.toDoObj)
    }
  }

  onFinish = (token: string) => {
    if (!this.toDoObj) {
      this.store.save(
        CrudActionType.CREATE,
        () => this.homeStore.getTodos(this.store.object.listId),
        () => {}, `todo`
      )
    } else {
      this.store.save(
        CrudActionType.UPDATE,
        () => this.homeStore.getTodos(this.toDoObj.listId),
        () => {}, `todo`
      )
    }
    this.onReset()
  }

  onReset = () => {
    debugger
    this.formRef.current!.resetFields();
    this.homeIndex.toDoEdit = undefined
    this.homeIndex.setState({ key: 'addTodo'})
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
                defaultValue={this.toDoObj ? this.toDoObj.description: undefined}
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
                defaultValue={this.lists && this.toDoObj ? this.toDoObj.listId : undefined}
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
                defaultValue={this.toDoObj ? moment(this.toDoObj.dtToDo) : undefined}
                onChange={dt => 
                  this.store.updateAttributeDecoratorKeyValue('dtToDo', dt)
                }
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item label=" ">
              <Button
                style={{ padding: '4px 6px' }}
                size={'middle'}
                type="primary"
                htmlType="submit"
                icon={<SaveFilled />}
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
};

export default FormToDo