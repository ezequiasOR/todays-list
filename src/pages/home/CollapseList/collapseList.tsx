import React from 'react'
import { Collapse } from 'antd';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

class CollapseList extends React.Component {

  render() {
    return (
      <Collapse style={{margin: '20px 20px 0px'}} defaultActiveKey={['1']} onChange={callback} expandIconPosition={'right'}>
        <Panel header="Today's List" key="1">
          <p>{text}</p>
        </Panel>
      </Collapse>
  
    );
  }
}

export default CollapseList
