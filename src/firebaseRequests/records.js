import axios from 'axios';
import constants from '../constants';

// Read Records

const getRecords = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/records.json?orderBy="uid"&equalTo="${uid}"`)
      .then((res) => {
        const records = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach((key) => {
            res.data[key].id = key;
            records.push(res.data[key]);
          });
        }
        resolve(records);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Post New Record

const postRecord = (newRecord) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/records.json`, newRecord)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

export default { getRecords, postRecord };
