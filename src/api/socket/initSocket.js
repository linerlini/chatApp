import WebSocketClass from 'assets/js/network/socketIO';
import eventHandleMap from './eventHandle';

function msgHandle(res) {
  console.log(res);
  const { type, data } = res;
  if (eventHandleMap.has(type)) {
    eventHandleMap.get(type)(data);
  }
}

export default function initSocket(account) {
  const url = new URL('ws://localhost:5001/chat');
  url.searchParams.append('account', account);
  url.searchParams.append('device', 0);
  const ws = new WebSocketClass({
    url: url.toString(),
    name: 'chat',
    msgCallback: msgHandle,
  });
  ws.connect();
  return ws;
}
