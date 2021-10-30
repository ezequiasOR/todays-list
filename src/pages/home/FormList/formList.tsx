import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Button, Row, Col } from 'antd';
import { FormInstance } from 'antd/es/form';
import CrudActionType from '../../../utils/CrudActionType';
import ListStore from '../../../stores/ListStore';

@observer
class FormList extends React.Component {
  formRef = React.createRef<FormInstance>()
  protected store
  protected homeIndex
  protected homeStore
  protected userId
  protected listObj

  constructor(props) {
    super(props)
    this.homeIndex = props.homeIndex
    this.homeStore = props.homeStore
    this.listObj = props.listObj
    this.userId = props.userId
    this.store = new ListStore()
  }
  
  componentDidMount() {
    if (this.listObj) {
      this.store.init(this.listObj)
    }
  }
  
  onFinish = (token: string) => {
    if (this.listObj && this.listObj.id) {
      this.store.save(
        CrudActionType.UPDATE,
        () => this.homeStore.getLists(this.userId),
        () => {}, `list`
      )
    } else {
      this.store.save(
        CrudActionType.CREATE,
        () => this.homeStore.getLists(this.userId),
        () => {}, `user/${encodeURI(this.userId)}/list`
      )
    }
    this.onReset()
  }

  onReset = () => {
    this.formRef.current!.resetFields();
    this.homeIndex.resetList()
  };

  render() {
    return (
      <Form
        layout="vertical"
        onFinish={() => this.onFinish("token")}
        ref={this.formRef}
      >
        <Row gutter={8}>
          <Col span={22}>
            <Form.Item label="List name" name={'name'} >
              <Input
                placeholder={'Type the list name'}
                defaultValue={this.listObj ? this.listObj.name: undefined}
                onChange={value =>
                  this.store.updateAttributeDecoratorKeyEventValue('name', value)
                }
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item label=" ">
              <Button size={'middle'} type="primary" htmlType="submit" >Add List</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
};

export default FormList