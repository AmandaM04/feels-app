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

// Post New User

const postUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/users.json`, user)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getUsers, postUser };
