import { io } from 'socket.io-client';
import { axiosBaseOptions } from '@/config';
import store from 'store';
import { socketStatusCode } from '../model/constants';

function connect(tk, account) {
  const token = tk || store.state.token;
  const socket = io(axiosBaseOptions.baseURL, {
    path: '/chat',
    auth: {
      token,
    },
    query: {
      account,
      device: 0,
    },
  });
  store.commit('setSocket', socket);
  socket.on('connect', () => {
    store.commit('changeSocketStatus', socketStatusCode.CONNECT);
    console.log('connect successfully');
  });
  socket.on('new-device-connect', (device) => {
    if (+device === 0) {
      store.commit('changeSocketStatus', socketStatusCode.LOGIN_IN_OTHER_DEVICE);
    }
  });
  socket.on('connect_error', (err) => {
    console.log(err);
    store.commit('changeSocketStatus', socketStatusCode.CONNECT_ERROR);
  });
  socket.on('islogined-friend', () => {
    console.log('isloginedFriends');
  });
}

export default connect;
