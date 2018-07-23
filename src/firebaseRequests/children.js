import axios from 'axios';
import constants from '../constants';

// Read Children

const getChildren = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/children.json`)
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

export default { getChildren };
