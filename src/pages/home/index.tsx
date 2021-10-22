import React from 'react'
import { observer } from 'mobx-react'
import CollapseList from './CollapseList/collapseList'
import HomeStore from '../../stores/HomeStore';
import { Card, Spin } from 'antd';
import FormToDo from './FormToDo/formToDo';
import FormList from './FormList/formList';

@observer
class HomeIndex extends React.Component {
  protected store;
  protected lists;
  protected contentList;

  state = {
    key: 'addTodo'
  };
  
  tabList = [
    {
      key: 'addTodo',
      tab: 'Add ToDo',
    },
    {
      key: 'addList',
      tab: 'Add List',
    },
  ];

  constructor(props) {
    super(props)
    this.store = new HomeStore()
  }

  componentDidMount() {
    this.store.init()
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.key !== this.state.key) {
      this.store.init()
    }
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };
  
  buildProps(lists) {
    return {
      lists: this.returnLists(lists),
      homeStore: this.store
    }
  }

  returnLists(data) {
    const lists = [{}]
    if (data) {
      data.forEach(list => {
        const obj = {
          value: list.id,
          label: list.name
        }
        lists.push(obj)
      });
    } else {
      return lists
    }
    lists.splice(0, 1)
    return lists
  }

  render() {
    if (this.store.object && this.store.object.id) {
      this.contentList = {
        addTodo: <FormToDo {...this.buildProps(this.store.object.lists)} />,
        addList: <FormList {...this.buildProps(this.store.object.lists)} />,
      };
      return (
        <div style={{ margin: '20px 10% 20px' }}>
          <Card
            style={{ margin: '20px 20px 0px' }}
            tabList={this.tabList}
            activeTabKey={this.state.key}
            onTabChange={key => {
              this.onTabChange(key, 'key');
            }}
          >
            {this.contentList[this.state.key]}
          </Card>
          <CollapseList />
        </div>
      )
    } else {
      return <Spin />
    }
  }
}

export default HomeIndex