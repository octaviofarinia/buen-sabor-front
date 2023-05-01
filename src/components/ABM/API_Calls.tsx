import axios from 'axios';

export const getCategories = async ({ setter }) => {
  axios.get('http://localhost:8080/api/v1/rubros-articulos').then((res) => {
    setter(res.data);
  }).catch((err)=>{
    <div className='p-20 shadow-2xl rounded-lg'>
        {err.message}
    </div>
  });
};
