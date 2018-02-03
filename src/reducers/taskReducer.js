import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_TASKS_SUCCESS:
      return Object.assign({}, state, { tasks: action.tasksResult });

    case types.CREATE_TASK_REQUEST_SUCCESS:
      return Object.assign({}, state, { tasks: action.newTask.body });

    case types.UPDATE_TASK_REQUEST_SUCCESS:
      return Object.assign({}, state, { tasks: action.updatedTask.body });

    case types.DELETE_TASK_REQUEST_SUCCESS:
      return Object.assign({}, state, { tasks: action.allTasks.body });

    default:
      return state;
  }
}
