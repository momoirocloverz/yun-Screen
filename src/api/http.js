const instance = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  transformRequest: [
    function (data, headers) {
      return JSON.stringify(data);
    },
  ],
});
instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('xs_token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  },
);
instance.interceptors.response.use(
  (response) => {
    if (response.data.resultCode === '404') {
      console.log('404');
      return;
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error.response);
  },
);
export default instance;
