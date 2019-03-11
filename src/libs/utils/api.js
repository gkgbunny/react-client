import axios from 'axios';

const callApi = async (url, reqMethod, data, header) => {
  const response = axios({
    baseURL: 'https://express-training.herokuapp.com/api',
    url,
    method: reqMethod,
    data: data,
    headers: {
      Authorization: header,
    },
  });
  return response;
}

export default callApi;
