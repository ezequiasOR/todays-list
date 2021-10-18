import React from 'react'
import { observer } from 'mobx-react'

@observer
class homeIndex extends React.Component {
  // constructor() {
  //   super()
  // }

  componentDidMount() {
    // const { setTitle } = this.props
    // setTitle(HOME.text)
    // this.store.init()
  }

  render() {
    return (
      <div>
        <p>Home</p>
      </div>
    )
  }
}

export default homeIndex