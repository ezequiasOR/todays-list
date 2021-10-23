import React from 'react'
import { observer } from 'mobx-react'
import HomeStore from '../../stores/HomeStore';
import { Button, Card, Checkbox, Col, Collapse, Row, Spin, Table, Tooltip } from 'antd';
import FormToDo from './FormToDo/formToDo';
import FormList from './FormList/formList';
import './index.css'
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DadosEstaticosService from '../../constants/dadosEstaticosService';

@observer
class HomeIndex extends React.Component {
  protected store;
  protected lists;
  protected contentList;
  protected userId
  protected todoEdit

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
  
  buildProps(toDoInfos = {}) {
    return {
      lists: this.returnLists(this.store.lists),
      homeStore: this.store,
      userId: this.userId,
      toDoInfos: toDoInfos
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
    debugger
    console.log(key);
    if (key) {
      key.forEach(k => {
        const listId = k.split('-')[0]
        this.store.getTodos(listId)
      })
    }
  }
  
  passData(toDo) {
    // debugger
    // this.todoEdit = toDo
    // this.forceUpdate()
  }

  render() {
    const { Panel } = Collapse;

    if (this.store.object && this.store.object.id) {
      this.contentList = {
        addTodo: <FormToDo {...this.buildProps(this.todoEdit)} />,
        addList: <FormList {...this.buildProps()} />,
      };

      const tableButtons = {
        title: '',
        dataIndex: '',
        width: '90px',
        render: row => {
          return (
            <>
              <Row gutter={8}>
                <Col>
                  <Tooltip title="Edit">
                    <Button onClick={() => this.passData(row)} icon={<EditOutlined />}></Button>
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip title="Delete">
                    <Button onClick={() => this.store.deleteTodo(row.id)} danger={true} icon={<DeleteOutlined />}></Button>
                  </Tooltip>
                </Col>
              </Row>
            </>
          )
        }
      }
  
      const columns = [
        {
          title: '',
          dataIndex: 'completed',
          width: '1px',
          render: value => (<Checkbox checked={value} />)
        }, {
          title: 'To-Do',
          dataIndex: 'description',
        }, {
          title: 'Date/Hour',
          dataIndex: 'dtToDo',
          width: '150px',
        },
        tableButtons
      ];
    
  
      const data = [
        {
          id: '1',
          completed: false,
          description: 'Tarefa 1 aqui',
          dtToDo: '2021-11-14',
        },
        {
          id: '2',
          completed: true,
          description: 'Tarefa 2 aqui Tarefa 2 Tarefa 2 Tarefa 2 aqui Tarefa 2 Tarefa 2',
          dtToDo: '2021-10-14',
        },
        {
          id: '3',
          completed: false,
          description: 'Tarefa 3 Tarefa 3 Tarefa 3',
          dtToDo: '2022-01-04',
        },
      ];

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
                  <Table columns={columns} dataSource={data} size="small" />
                </Panel>
              )
            })}
          </Collapse>
        </div>
      )
    } else {
      return <Spin className="spinner" />
    }
  }
}

export default HomeIndex