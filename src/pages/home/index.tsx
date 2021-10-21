import React from 'react'
import { observer } from 'mobx-react'
import CardToDo from './CardToDo/cardToDo'
import CollapseList from './CollapseList/collapseList'
import HomeStore from '../../stores/HomeStore';
import { Spin } from 'antd';

@observer
class HomeIndex extends React.Component {
  protected store;
  protected lists;

  constructor(props) {
    super(props)
    this.store = new HomeStore()
  }

  componentDidMount() {
    this.store.init()

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
      return (
        <div style={{ margin: '20px 10% 20px' }}>
          <CardToDo {...[this.returnLists(this.store.object.lists)]} />
          <CollapseList />
        </div>
      )
    } else {
      return <Spin />
    }
  }
}

export default HomeIndex