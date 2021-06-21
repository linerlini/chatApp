import store from 'store';
import request from 'assets/js/network';
import storage from 'assets/js/tools/storage';

async function refreshJWT() {
  const { account } = store.state;
  try {
    const result = await request({
      url: '/login/refresh',
      params: {
        account,
      },
    });
    // 更新本地存储的token
    const oldData = storage.get('user');
    oldData.token = result;
    storage.set('user', oldData);
    store.commit('setToken', result);
    return result;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export default refreshJWT;
