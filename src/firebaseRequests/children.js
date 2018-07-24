import axios from 'axios';
import constants from '../constants';

// Read Children

const getChildren = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/children.json?orderBy="uid"&equalTo="${uid}"`)
      .then((res) => {
        const children = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach((key) => {
            res.data[key].id = key;
            children.push(res.data[key]);
          });
        }
        resolve(children);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Post New Child

const postChild = (children) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/children.json`, children)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getChildren, postChild };
