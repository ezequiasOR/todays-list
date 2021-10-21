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
  constructor(props) {
    super(props)
    this.store = new ListStore()
  }
  
  onFinish = (token: string) => {
    console.log(token)
    // TODO: trocar URL com userId fixo por `list/${encodeURI(this.store.object.userId)}/todo` 
    this.store.save(CrudActionType.CREATE, () => {}, () => {}, `user/1/list`)
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
          <Col span={22}>
            <Form.Item label="List name" name={'name'} >
              <Input
                placeholder={'Type the list name'}
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