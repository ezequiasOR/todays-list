import { Form, Input, Button, Select, DatePicker, Row, Col } from 'antd';

const FormToDo = () => {
  
  return (
    <Form layout="vertical" >
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="To do">
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
            <Button type="primary" >Add ToDo</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FormToDo