import axios from 'axios';
import qs from 'qs';
import store from 'store';
import * as configs from '../../../config';

const instance = axios.create(configs.axiosBaseOptions);

instance.interceptors.request.use((baseConfig) => {
  const config = baseConfig;
  config.headers = Object.assign(config.method.toLowerCase() === 'get' ? {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  } : {
    'Content-Type': 'application/json; charset=UTF-8',
  }, config.headers);
  if (store.state.token) {
    config.headers.Authorization = store.state.token;
  }
  if (config.method.toLowerCase() === 'post') {
    const contentType = config.headers['Content-Type'];
    if (contentType.includes('json')) {
      config.data = JSON.stringify(config.data);
    } else {
      config.data = qs.stringify(config.data);
    }
  } else {
    if ((config.params && config.params instanceof URLSearchParams) || !config.params) {
      return config;
    }
    const newParams = new URLSearchParams();
    Object.entries(config.params).forEach((value) => {
      newParams.append(value[0], value[1]);
    });
    config.params = newParams;
  }
  return config;
}, (err) => {
  console.log('request err');
  return Promise.reject(err);
});

instance.interceptors.response.use((res) => res.data, (err) => {
  if (err.response) {
    const { response } = err;
    if (response.status === 401 && response.data === 'token timeout') {
      return Promise.reject(new Error('refresh JWT'));
    }
    return Promise.reject(err.response);
  }
  if (
    err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1
  ) {
    return Promise.reject(new Error({ msg: '请求超时' }));
  }
  return Promise.reject(err);
});
async function request(options) {
  let result;
  try {
    result = await instance.request(options);
  } catch (err) {
    return Promise.reject(err);
  }
  return result;
}

export default request;
