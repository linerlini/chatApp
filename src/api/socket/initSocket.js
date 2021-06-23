import WebSocketClass from 'assets/js/network/socketIO';

export default function initSocket(account) {
  const url = new URL('ws://localhost:5001/chat');
  url.searchParams.append('account', account);
  url.searchParams.append('device', 0);
  const ws = new WebSocketClass({
    url: url.toString(),
    name: 'chat',
    msgCallback: (message) => console.log(message),
  });
  ws.connect();
  return ws;
}
