import axios from 'axios';

export const getRegisters = ({ keySetter, dataSetter, endpoint }) => {
  axios
    .get(`http://localhost:8080/${endpoint}`)
    .then((res) => {
      dataSetter(res.data);
      keySetter(Object.keys(res.data[0]));
    })
    .catch((err) => {
      dataSetter([]), keySetter([]);
    });
};

export const deleteRegister = ({ id, endpoint }) => {
  axios.delete(`http://localhost:8080/${endpoint}/${id}`).then((res) => {});
};

export const getRegister = ({ dataSetter, endpoint, id }) => {
  axios.get(`http://localhost:8080/${endpoint}/${id}`).then((res) => {
    dataSetter(res.data);
    console.log(res.data);
  });
};

export const createRegister = ({ endpoint }) => {
  axios
    .post(`http://localhost:8080/${endpoint}`)
    .then((res) => {
      console.log(res.status);
    })
    .catch((err) => {
      console.log(err);
    });
};
