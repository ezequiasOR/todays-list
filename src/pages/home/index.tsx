import React from 'react'
import { observer } from 'mobx-react'
import HomeStore from '../../stores/HomeStore';
import { Card, Collapse, Spin } from 'antd';
import FormToDo from './FormToDo/formToDo';
import FormList from './FormList/formList';

@observer
class HomeIndex extends React.Component {
  protected store;
  protected lists;
  protected contentList;
  protected userId

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
    this.userId = props.userId
    this.store.getLists(this.userId)
  }

  componentDidMount() {
    this.store.init()
    this.store.getLists(this.userId)
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.key !== this.state.key) {
      this.store.init()
      this.store.getLists(this.userId)
    }
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };
  
  buildProps() {
    return {
      lists: this.returnLists(this.store.lists),
      homeStore: this.store,
      userId: this.userId
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

  callback(key) {
    console.log(key);
  }
  
  render() {
    const { Panel } = Collapse;
    if (this.store.object && this.store.object.id) {
      this.contentList = {
        addTodo: <FormToDo {...this.buildProps()} />,
        addList: <FormList {...this.buildProps()} />,
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
          <Collapse style={{margin: '20px 20px 0px'}} onChange={this.callback} expandIconPosition={'right'}>
            {this.store.lists.map((list) => {
              return (
                <Panel header={list.name} key={`${list.id}-${list.name}`}>
                  <p>asdfasdfasdfasdfasdfasdf</p>
                </Panel>
              )
            })}
            
          </Collapse>
        </div>
      )
    } else {
      return <Spin />
    }
  }
}

export default HomeIndex