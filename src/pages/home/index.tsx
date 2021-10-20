import React from 'react'
import { observer } from 'mobx-react'
import CardToDo from './CardToDo/cardToDo'
import CollapseList from './CollapseList/collapseList'
import HomeIndexStore from '../../stores/HomeIndexStore';
import User from '../../domains/user';
import HomeService from '../../services/home'

@observer
class homeIndex extends React.Component {
  protected store;

  constructor(props) {
    super(props)
    this.store = new HomeIndexStore(new User(), HomeService, 'User')
  }

  render() {
    return (
      <div style={{ margin: '20px 10% 20px' }}>
        <CardToDo />
        <CollapseList />
      </div>
    )
  }
}

export default homeIndex