import request from 'assets/js/network';
import refreshJWT from 'assets/js/network/refreshJWT';
import { wsEvents } from 'assets/js/model/constants';

async function getChatRecord({
  fromAccount,
  findAccount,
  uid,
}) {
  try {
    const result = await request({
      url: '/message',
      params: {
        fromaccount: fromAccount,
        findaccount: findAccount,
        uid,
      },
    });
    return result;
  } catch (err) {
    if (err.message === 'refresh JWT') {
      await refreshJWT();
      return getChatRecord({
        fromAccount,
        findAccount,
        uid,
      });
    }
    console.log(err);
    return Promise.reject(err);
  }
}
function sendMessage({
  ws,
  message,
  toAccount,
  fromAccount,
}) {
  if (!ws) {
    return false;
  }
  ws.sendHandle(JSON.stringify({
    type: wsEvents.PRIVATE_CHAT_SEND,
    data: {
      fromAccount,
      toAccount,
      message,
      device: 0, // represent phone
    },
  }));
  return true;
}

export {
  getChatRecord,
  sendMessage,
};
