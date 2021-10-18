import { Form, Input, Button, Row, Col } from 'antd';

const FormList = () => {
  
  return (
    <Form layout="vertical" >
      <Row gutter={8}>
        <Col span={22}>
          <Form.Item label="List name">
            <Input />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item label=" ">
            <Button type="primary" >Add List</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FormList