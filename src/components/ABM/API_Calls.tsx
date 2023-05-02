import axios from 'axios';

export const getCategories = ({ keySetter, dataSetter }) => {
  axios.get(`http://localhost:8080/api/v1/rubros-articulos`).then((res) => {
    dataSetter(res.data);
    keySetter(Object.keys(res.data[0]));
  });
};
