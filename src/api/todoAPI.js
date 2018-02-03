const config = require('../../config.json');
import request from 'superagent';

const baseUrl = config.apiBaseUrl;

module.exports = {
  getAllTasks: () => {
    return new Promise((resolve, reject) => {
      return request
        .get(`${baseUrl}/tasks`)
        .end((err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(res);
        });
    });
  },

  createTask: (taskData) => {
    return new Promise((resolve, reject) => {
      return request
        .post(`${baseUrl}/tasks`)
        .send(taskData)
        .end((err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(res);
        });
    });
  },

  updateTask: (taskId, taskData) => {
    return new Promise((resolve, reject) => {
      return request
        .put(`${baseUrl}/tasks/${taskId}`)
        .send(taskData)
        .end((err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(res);
        });
    });
  },

  deleteTask: (taskId) => {
    return new Promise((resolve, reject) => {
      return request
        .delete(`${baseUrl}/tasks/${taskId}`)
        .end((err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(res);
        });
    });
  }
};
