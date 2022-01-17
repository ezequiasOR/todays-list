import React from 'react'

import { PageHeader } from 'antd'

class Title extends React.Component {
  render() {
    return <PageHeader ghost={false} title="ToDo" subTitle="This is a ToDo website" />
  }
}

export default Title
