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
  return axios.delete(`http://localhost:8080/${endpoint}/${id}`);
};

export const getRegister = ({ dataSetter, endpoint, id }) => {
  axios.get(`http://localhost:8080/${endpoint}/${id}`).then((res) => {
    dataSetter(res.data);
  });
};

export const createRegister = async ({ endpoint, persistenObject }) => {
  try {
    const res = await axios.post(`http://localhost:8080/${endpoint}`, persistenObject);
    return res;
  } catch (err) {
    console.error(err);
    throw err; // or return some error object if you want
  }
};

export const updateRegister = async ({ endpoint, persistenObject, id }) => {
  try {
    const res = await axios.put(`http://localhost:8080/${endpoint}/${id}`, {
      ...persistenObject,
      id: id,
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err; // or return some error object if you want
  }
};
