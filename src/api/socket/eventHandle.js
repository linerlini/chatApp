import store from 'store';
import FriendChat from 'assets/js/model/friendChat';
import { loginStatusType, userRelationship, wsEvents } from '../../assets/js/model/constants';

const eventHandleMap = new Map();

function loginInOtherDevice() {
  console.log(111);
  store.commit('setLoginStatus', loginStatusType.LOGIN_IN_OTHER_DEVICE);
}
eventHandleMap.set(wsEvents.OTHER_DEVICE_LOGIN, loginInOtherDevice);

function loginInPhonePc() {
  store.commit('friendChatModule/setToastType', 0);
  store.commit('friendChatModule/setToastMessage', 'login in PC');
  store.commit('friendChatModule/setToastTime', new Date());
}
eventHandleMap.set(wsEvents.LOGIN_IN_PHONE_PC, loginInPhonePc);

function friendOnline(data) {
  const { account, device } = data;
  const { friends } = store.state.friendInfoModule;
  let name = '';
  friends.some((group) => {
    if (group[account]) {
      name = group[account].name;
      return true;
    }
    return false;
  });
  store.commit('friendInfoModule/changeFriendLoginStatus', {
    account,
    loginStatus: loginStatusType.ONLINE,
  });
  store.commit('friendChatModule/setToastType', 0);
  store.commit('friendChatModule/setToastMessage', `${name} login in ${device ? 'PHONE' : 'PC'}`);
  store.commit('friendChatModule/setToastTime', new Date());
}
eventHandleMap.set(wsEvents.FRIEND_ONLINE, friendOnline);

function friendOffLine(data) {
  const { account } = data;
  store.commit('friendInfoModule/changeFriendLoginStatus', {
    account,
    loginStatus: loginStatusType.OFFLINE,
  });
}
eventHandleMap.set(wsEvents.FRIEND_OFFLINE, friendOffLine);

function syncMessage({
  toAccount,
  message,
  sendTime,
}) {
  store.commit('friendInfoModule/addChatRecord', {
    account: toAccount,
    message: new FriendChat({
      message,
      createTime: new Date(sendTime),
      isSend: 1,
    }),
  });
}
eventHandleMap.set(wsEvents.PRIVATE_CHAT_SEND_OTHER_DEVICE, syncMessage);

function receivePrivateChatMessage({
  fromAccount,
  message,
  receiveTime,
}) {
  store.commit('friendInfoModule/addChatRecord', {
    account: fromAccount,
    message: new FriendChat({
      message,
      createTime: new Date(receiveTime),
      isSend: 0,
    }),
  });
  store.commit('friendChatModule/setToastType', 0);
  store.commit('friendChatModule/setToastMessage', 'a new message has been received');
  store.commit('friendChatModule/setToastTime', new Date());
}
eventHandleMap.set(wsEvents.PRIVATE_CHAT_RECEIVE, receivePrivateChatMessage);

function syncFriendApply({
  friendAccount,
  friendName,
  friendSignature,
  groupIndex,
}) {
  store.dispatch('friendInfoModule/handleFriendApply', {
    account: friendAccount,
    name: friendName,
    signature: friendSignature,
    relationship: userRelationship.APPLYING,
    groupIndex,
  });
}
eventHandleMap.set(wsEvents.SYNC_FRIEND_APPLY, syncFriendApply);

function receiveFriendApply({
  fromAccount,
  fromName,
  fromSignature,
}) {
  store.dispatch('friendInfoModule/handleFriendApply', {
    account: fromAccount,
    name: fromName,
    signature: fromSignature,
    relationship: userRelationship.RECEIVE_APPLY,
  });
  store.commit('friendChatModule/setToastType', 0);
  store.commit('friendChatModule/setToastMessage', 'receiving a friend request');
  store.commit('friendChatModule/setToastTime', new Date());
}
eventHandleMap.set(wsEvents.RECEIVE_FRIEND_APPLY, receiveFriendApply);

function receiveFriendApplyResult({ fromAccount, result }) {
  store.dispatch('friendInfoModule/handleFriendApplyResult', {
    account: fromAccount,
    handleResult: result ? userRelationship.FRIEND : userRelationship.NOTPASS,
  });
  store.commit('friendChatModule/setToastType', 0);
  store.commit('friendChatModule/setToastMessage', 'The result of your friend request');
  store.commit('friendChatModule/setToastTime', new Date());
}
eventHandleMap.set(wsEvents.RECEIVE_FRIEND_APPLY_RESULT, receiveFriendApplyResult);

export default eventHandleMap;
