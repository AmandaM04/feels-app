import axios from 'axios';
import constants from '../constants';

// Read Users

const getUsers = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/user.json?orderBy="uid"&equalTo="${uid}"`)
      .then((res) => {
        const users = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach((key) => {
            res.data[key].id = key;
            users.push(res.data[key]);
          });
        }
        resolve(users);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Create New User

const postUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/user.json`, user)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Update User

const putUser = (userId, user) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/user/${userId}.json`, user)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

export default { getUsers, postUser, putUser };
