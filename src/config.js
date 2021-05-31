const axiosBaseOptions = {
  baseURL: 'http://localhost:5001',
  timeout: 5000,
  validateStatus(status) {
    return status >= 200 && (status < 300 || status === 304);
  },
};

const funcName = {
  ALL_FRIEND_PAGE: 0,
  ADD_FRIEND_PAGE: 1,
  GROUP_FRIEND_PAGE: 2,
};

export {
  axiosBaseOptions,
  funcName,
};
