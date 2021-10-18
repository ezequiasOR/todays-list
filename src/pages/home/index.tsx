import React from 'react'
import { observer } from 'mobx-react'
import CardToDo from '../../components/CardToDo/cardToDo'

@observer
class homeIndex extends React.Component {
  render() {
    return (
      <CardToDo />
    )
  }
}

export default homeIndex