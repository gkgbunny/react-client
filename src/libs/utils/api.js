import axios from 'axios';
class Api {
  callApi = async (url, reqMethod, data, header) => {
    console.log('**************************++++++++++4545454', data);
    const response = axios({
      url: `https://express-training.herokuapp.com/api${url}`,
      method: reqMethod,
      data: data,
      headers: {
        'Authorization': header,
      },
    });
    return response;
  }
}

export default Api;
