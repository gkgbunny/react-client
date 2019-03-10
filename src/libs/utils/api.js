import axios from 'axios';

const callApi = async (url, reqMethod, reqEmail, reqPassword) => {
  const response = axios({
    url: `https://express-training.herokuapp.com/api${url}`,
    method: reqMethod,
    data: {
      email: reqEmail,
      password: reqPassword,
    },
  });
  return response;
};
export default callApi;
