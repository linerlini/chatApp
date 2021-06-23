import store from 'store';
import { socketStatusCode } from 'assets/js/model/constants';

function connectWebSocket() {
  const socket = new WebSocket('ws://localhost:5001/chat');
  socket.onopen = function open(e) {
    console.log(e);
    socket.send('hello server');
    store.commit('setSocket', socket);
    store.commit('changeSocketStatus', socketStatusCode.OK);
  };
  socket.onmessage = function messageHandle(message) {
    console.log(message);
  };
  socket.onerror = function errorHandle(err) {
    console.log(err);
    store.commit('setSocket', null);
    store.commit('changeSocketStatus', socketStatusCode.CONNECT_ERROR);
  };
}
export default connectWebSocket;
