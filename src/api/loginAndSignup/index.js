import request from 'assets/js/network';

const TOKEN_TIMEOUT = 2;

async function login(account, password) {
  const requestBody = {
    account,
    password,
  };
  try {
    const result = await request({
      url: '/login',
      data: requestBody,
      method: 'post',
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log('login err', err);
    return false;
  }
}

async function register({ account, password, name }) {
  const requestBody = {
    account,
    password,
    name,
  };
  try {
    const result = await request({
      url: '/register',
      data: requestBody,
      method: 'post',
    });
    return result;
  } catch (err) {
    console.log(err);
    console.log('register err');
    return Promise.reject(err);
  }
}

async function loginRefresh() {
  try {
    const result = await request({
      url: '/login',
    });
    return result;
  } catch (err) {
    if (err.body === TOKEN_TIMEOUT) {
      return Promise.reject(new Error('tokenTimeout'));
    }
    return Promise.reject(new Error('tokenInvalid'));
  }
}
export {
  login,
  register,
  loginRefresh,
};
