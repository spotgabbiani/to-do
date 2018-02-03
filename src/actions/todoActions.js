import * as types from './actionTypes';
import todoAPI from '../api/todoAPI';

export function getAllTasksSuccess(tasksResult) {
  return { type: types.GET_ALL_TASKS_SUCCESS, tasksResult};
}

export function getAllTasks() {
  return dispatch => {
    return todoAPI.getAllTasks()
      .then(data => {
        return dispatch(getAllTasksSuccess(data.body));
      }).catch(error => {
        throw (error);
      });
  };
}

export function createTaskSuccess(newTask) {
  return { type: types.CREATE_TASK_REQUEST_SUCCESS, newTask };
}

export function createTask(taskData) {
  return dispatch => {
    return todoAPI.createTask(taskData)
      .then(newTask => {
        return dispatch(createTaskSuccess(newTask));
      }).catch(error => {
        throw (error);
      });
  };
}

export function updatedTaskSuccess(updatedTask) {
  return { type: types.UPDATE_TASK_REQUEST_SUCCESS, updatedTask };
}

export function updateTask(taskId, taskData) {
  return dispatch => {
    return todoAPI.updateTask(taskId, taskData)
      .then(updatedTask => {
        return dispatch(updatedTaskSuccess(updatedTask));
      }).catch(error => {
        throw (error);
      });
  };
}

export function deleteTaskSuccess(allTasks) {
  return { type: types.DELETE_TASK_REQUEST_SUCCESS, allTasks };
}

export function deleteTask(taskId) {
  return dispatch => {
    return todoAPI.deleteTask(taskId)
      .then(allTasks => {
        return dispatch(deleteTaskSuccess(allTasks));
      }).catch(error => {
        throw (error);
      });
  };
}
