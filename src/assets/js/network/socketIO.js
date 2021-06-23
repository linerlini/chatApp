import store from 'store';
import { socketStatusCode, wsEvents } from 'assets/js/model/constants';
// import { socketBaseOptions } from '@/config';

// function connectWebSocket() {
//   const socket = new WebSocket('ws://localhost:5001/chat');
//   socket.onopen = function open(e) {
//     console.log(e);
//     socket.send('hello server');
//     store.commit('setSocket', socket);
//     store.commit('changeSocketStatus', socketStatusCode.OK);
//   };
//   socket.onmessage = function messageHandle(message) {
//     console.log(message);
//   };
//   socket.onerror = function errorHandle(err) {
//     console.log(err);
//     store.commit('setSocket', null);
//     store.commit('changeSocketStatus', socketStatusCode.CONNECT_ERROR);
//   };
// }
// export default connectWebSocket;

class WebSocketClass {
  constructor({
    url,
    msgCallback,
    name = 'default',
    pingpongTime = 10000,
    retryCount = 5,
  }) {
    this.url = url;
    this.msgCallback = msgCallback;
    this.name = name;
    this.ws = null; // websocket对象
    this.status = socketStatusCode.NO_CONNECT; // websocket状态
    this.pingpongTime = pingpongTime; // 心跳间隔
    this.retryCount = retryCount; // 重连上限
    this.nowRetryCount = 0; // 已经重联的次数
  }

  connect(data) {
    // 新建 WebSocket 实例
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      // 连接ws成功回调
      this.status = socketStatusCode.OK;
      store.commit('changeSocketStatus', socketStatusCode.OK);
      console.log(`${this.name}连接成功`);
      // 重制重连次数
      this.nowRetryCount = 0;
      this.heartCheck();
      if (data !== undefined) {
        // 有要传的数据,就发给后端
        this.ws.send(data);
      }
    };
    // 监听服务器端返回的信息
    this.ws.onmessage = (e) => {
      let response = null;
      if (e.data) {
        response = JSON.parse(e.data);
      } else {
        return;
      }
      // 把数据传给回调函数，并执行回调
      if (response.type === wsEvents.PING_PONG && response.data === 'pong') {
        this.pingPong = 'pong'; // 服务器端返回pong,修改pingPong的状态
        console.log('pingpong');
        return;
      }
      this.msgCallback(response);
    };
    // ws关闭回调
    this.ws.onclose = (e) => {
      this.closeHandle(e); // 判断是否关闭
    };
    // ws出错回调
    this.onerror = (e) => {
      this.closeHandle(e); // 判断是否关闭
    };
  }

  heartCheck() {
    this.pingPong = 'ping'; // ws的心跳机制状态值
    this.pingInterval = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        // 检查ws为链接状态 才可发送
        this.ws.send(JSON.stringify({
          type: wsEvents.PING_PONG,
          data: 'ping',
        })); // 客户端发送ping
      }
    }, this.pingpongTime);
    this.pongInterval = setInterval(() => {
      if (this.pingPong === 'ping') {
        this.closeHandle('pingPong没有改变为pong'); // 没有返回pong 重启webSocket
      }
      // 重置为ping 若下一次 ping 发送失败 或者pong返回失败(pingPong不会改成pong)，将重启
      this.pingPong = 'ping';
    }, this.pingpongTime * 2);
  }

  // 发送信息给服务器
  sendHandle(data) {
    console.log(`${this.name}发送消息给服务器:`, data);
    return this.ws.send(data);
  }

  closeHandle(e = 'err') {
    // 因为webSocket并不稳定，规定只能手动关闭(调closeMyself方法)，否则就重连
    if (this.status !== socketStatusCode.NO_CONNECT) {
      console.log(`${this.name}断开，重连websocket`, e);
      if (this.pingInterval !== undefined && this.pongInterval !== undefined) {
        // 清除定时器
        clearInterval(this.pingInterval);
        clearInterval(this.pongInterval);
      }
      this.nowRetryCount += 1;
      if (this.nowRetryCount < this.retryCount) {
        this.status = socketStatusCode.RETRYING;
        store.commit('changeSocketStatus', socketStatusCode.RETRYING);
        this.connect(); // 重连
      } else {
        this.status = socketStatusCode.CONNECT_ERROR;
        store.commit('changeSocketStatus', socketStatusCode.CONNECT_ERROR);
      }
    } else {
      console.log(`${this.name}websocket手动关闭`);
    }
  }

  // 手动关闭WebSocket
  closeMyself() {
    console.log(`关闭${this.name}`);
    this.status = socketStatusCode.NO_CONNECT;
    store.commit('changeSocketStatus', socketStatusCode.NO_CONNECT);
    return this.ws.close();
  }
}
export default WebSocketClass;
