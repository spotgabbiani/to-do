import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import {Link} from 'react-router';
import { Icon, Modal, Input, Form, Row, Col } from 'antd';
import { object } from 'prop-types';
import Header from "../Header";
import * as todoActions from '../../actions/todoActions';

export class HomePage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      tasks: [],
      visible: false,
      createdTask: false
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    this.props.actions.getAllTasks()
      .then((data) => {
        return this.setState({
          tasks: data.tasksResult
        });
      }).catch((data) => {
      console.log('failed to load request: ', data);
    });
  }

  showModal() {
    this.setState({
      visible: true
    });
  }
  handleOk(e) {
    const { getFieldValue } = this.props.form;
    const { resetFields } = this.props.form;
    this.props.form.validateFields((error) => {
      if (!error) {
        const taskData = Object.assign({},
          getFieldValue('name') && { name: getFieldValue('name') }
        );
        this.props.actions.createTask(taskData)
          .then((data) => {
            resetFields(['name']);
            return this.setState({
              createdTask: true,
              visible: false
            });
          }).catch((data) => {
          console.log('failed to create task: ', data);
        });
      }
    });
  }
  handleCancel(e) {
    const { resetFields } = this.props.form;
    resetFields(['name']);
    this.setState({
      visible: false
    });
  }

  updateTask(taskId, status){
    const taskData = { status: status };
    this.props.actions.updateTask(taskId, taskData)
      .then((data) => {
        return this.setState({
          tasks: data.tasksResult
        });
      }).catch((data) => {
      console.log('failed to update task: ', data);
    });
  }

  deleteTask(taskId) {
    this.props.actions.deleteTask(taskId)
      .then((data) => {
        return this.setState({
          visible: false
        });
      }).catch((data) => {
      console.log('failed to delete task: ', data);
    });
  }

  render () {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="app-container">
        <Header/>
        <h2>Tasks</h2>
        <ol>
          {this.props.tasks && this.props.tasks.map((taskData) => {
            return (
            <li key={taskData._id} className={
              taskData.status[0] === "ongoing" && "yellow" ||
              taskData.status[0] === "pending" && "gray"  ||
              taskData.status[0] === "completed" && "green"
            }>
              <Row type="flex">
                <Col xs={{ span: 24 }} sm={{ span: 10 }}>
                  {taskData.name}
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 5, offset: 9 }}>
                  { taskData.status[0] === "pending" && <Icon className="control-buttons" type="play-circle-o" onClick={() => this.updateTask(taskData._id, 'ongoing')}/>}
                  { taskData.status[0] === "ongoing" && <Icon className="control-buttons" type="pause-circle-o" onClick={() => this.updateTask(taskData._id, 'pending')}/>}
                  { taskData.status[0] === "ongoing" && <Icon className="control-buttons" type="check-circle-o" onClick={() => this.updateTask(taskData._id, 'completed')}/>}
                  <Icon className="control-buttons" type="delete" onClick={() => this.deleteTask(taskData._id)}/>
                </Col>
              </Row>
            </li>
            );
          })}
        </ol>
        <Icon type="plus-circle-o" className="add-button" onClick={this.showModal}/>
        <Modal
          title="Add Task"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText='Cancel'
          okText='Add'
        >
          <Form>
            <FormItem
              label="Name"
            >
              {getFieldDecorator('name', {
                rules: [
                  { max: 250, message: 'The Name you provided is too long' },
                  { required: true, message: 'Please input the task name!' }
                ]
              })(
                <Input/>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

HomePage.propTypes = {
  form: object,
  actions: object.isRequired,
  tasks: object
};

function mapStateToProps(state) {
  return {
    tasks: state.task.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(HomePage));
