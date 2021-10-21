import React from 'react'
import { Card } from 'antd';
import FormToDo from '../FormToDo/formToDo'
import FormList from '../FormList/formList';

const tabList = [
  {
    key: 'addTodo',
    tab: 'Add ToDo',
  },
  {
    key: 'addList',
    tab: 'Add List',
  },
];

class CardToDo extends React.Component {
  state = {
    key: 'addTodo',
  };
  
  private contentList
  constructor(props) {
    super(props)
    this.contentList = {
      addTodo: <FormToDo {...props}/>,
      addList: <FormList />,
    };
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  render() {
    return (
      <>
        <Card
          style={{ margin: '20px 20px 0px' }}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key');
          }}
        >
          {this.contentList[this.state.key]}
        </Card>
      </>
    );
  }
}

export default CardToDo;