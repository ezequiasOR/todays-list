import React from 'react'
import { observer } from 'mobx-react'
import HomeStore from '../../stores/HomeStore'
import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Dropdown,
  Menu,
  Row,
  Spin,
  Table,
  Tooltip,
} from 'antd'
import FormToDo from './FormToDo/formToDo'
import FormList from './FormList/formList'
import './index.css'
import { EditOutlined, DeleteOutlined, MenuOutlined } from '@ant-design/icons'
import { getUser, getValueDate } from '../../utils/Utils'

@observer
class HomeIndex extends React.Component {
  protected store
  protected contentList
  protected userId
  protected toDoEdit
  protected listEdit

  state = {
    key: 'addTodo',
    refresh: false,
  }

  tabList = [
    {
      key: 'addTodo',
      tab: 'Add ToDo',
    },
    {
      key: 'addList',
      tab: 'Add List',
    },
  ]

  constructor(props) {
    super(props)
    this.store = new HomeStore()
    this.userId = getUser()?.id
    this.store.getLists(this.userId)
  }

  componentDidMount() {
    this.store.init(this.userId)
    this.store.getLists(this.userId)
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key })
  }

  listOptions = (list) => {
    return (
      <Menu>
        <Menu.Item key="editList" icon={<EditOutlined />} onClick={() => this.editList(list)}>
          Edit list
        </Menu.Item>
        <Menu.Item
          key="deleteList"
          danger
          icon={<DeleteOutlined />}
          onClick={() => this.store.deleteList(list.id)}
        >
          Delete List
        </Menu.Item>
      </Menu>
    )
  }

  listExtra = (listId) => (
    <Dropdown overlay={this.listOptions(listId)}>
      <MenuOutlined />
    </Dropdown>
  )

  buildProps(toDoEdit = {}, listEdit = {}) {
    return {
      lists: this.returnLists(this.store.lists),
      homeStore: this.store,
      homeIndex: this,
      userId: this.userId,
      toDoObj: toDoEdit,
      listObj: listEdit,
    }
  }

  returnLists(data) {
    const lists = [{}]
    if (data) {
      data.forEach((list) => {
        const obj = {
          value: list.id,
          label: list.name,
        }
        lists.push(obj)
      })
    } else {
      return lists
    }
    lists.splice(0, 1)
    return lists
  }

  getToDosForEachList(key, store) {
    if (key) {
      key.forEach((k) => {
        const listId = k.split('-')[0]
        store.getTodos(listId)
      })
    }
  }

  toggleChecked(toDo, store) {
    this.setState({ refresh: !this.state.refresh })
    toDo.completed = !toDo.completed
    store.toggleCheckedToDo(toDo)
  }

  editTodo(toDo) {
    this.toDoEdit = toDo
    this.setState({ key: 'addList' })
  }

  editList(list) {
    this.listEdit = list
    this.setState({ key: 'addList' })
  }

  resetTodo() {
    this.toDoEdit = undefined
    this.setState({ key: 'addList' })
  }

  resetList() {
    this.listEdit = undefined
    this.setState({ key: 'addTodo' })
  }

  render() {
    const { Panel } = Collapse
    if (this.store.object && this.store.object.id) {
      this.contentList = {
        addTodo: <FormToDo {...this.buildProps(this.toDoEdit)} />,
        addList: <FormList {...this.buildProps(undefined, this.listEdit)} />,
      }

      const tableButtons = {
        title: '',
        dataIndex: '',
        width: '90px',
        render: (row) => {
          return (
            <>
              <Row gutter={8}>
                <Col>
                  <Tooltip title="Edit">
                    <Button
                      onClick={() => {
                        this.editTodo(row)
                      }}
                      icon={<EditOutlined />}
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip title="Delete">
                    <Button
                      onClick={() => this.store.deleteTodo(row.id)}
                      danger={true}
                      icon={<DeleteOutlined />}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </>
          )
        },
      }

      const columns = [
        {
          title: '',
          dataIndex: '',
          width: '5px',
          render: (row) => (
            <Checkbox
              checked={row.completed}
              onChange={() => this.toggleChecked(row, this.store)}
            />
          ),
        },
        {
          title: 'To-Do',
          dataIndex: 'description',
        },
        {
          title: 'Date/Hour',
          dataIndex: 'dtToDo',
          width: '150px',
          render: (date) => getValueDate(date),
        },
        tableButtons,
      ]

      return (
        <div style={{ margin: '20px 10% 20px' }}>
          <Card
            style={{ margin: '20px 20px 0px' }}
            tabList={this.tabList}
            activeTabKey={this.state.key}
            onTabChange={(key) => {
              this.onTabChange(key, 'key')
            }}
          >
            {this.contentList[this.state.key]}
          </Card>
          {this.store.lists.map((list) => {
            return (
              <Collapse
                key={`collapse-${list.id}`}
                style={{ margin: '20px 20px 0px' }}
                onChange={(key) => this.getToDosForEachList(key, this.store)}
                expandIconPosition={'right'}
              >
                <Panel
                  header={list.name}
                  key={`${list.id}-${list.name}`}
                  extra={this.listExtra(list)}
                >
                  <Table columns={columns} dataSource={this.store.todos[list.id]} size="small" />
                </Panel>
              </Collapse>
            )
          })}
        </div>
      )
    } else {
      return <Spin className="spinner" />
    }
  }
}

export default HomeIndex
