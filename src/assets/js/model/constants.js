const userItemType = {
  USER_INFO: 0,
  USER_MESSAGE: 1,
  USER_APPLY: 2,
};
const userRelationship = {
  RECEIVE_APPLY: 0, // 收到申请
  APPLYING: -1, // 申请添加的过程中
  FRIEND: 1, // 已添加
  REJECT: 2, // 拒绝
  NOTPASS: 3, // 没通过
  STRANGE: 4, // 陌生
};
const dialogShowType = {
  SELECT: 3,
  ERROR: 2,
  OK: 1,
  HIDDEN: 0,
};
const handleFriendApply = {
  REJECT: 0,
  ACCEPT: 1,
  WAIT: 2,
  RESULT: 3,
};
const funcName = {
  ALL_FRIEND_PAGE: 0,
  ADD_FRIEND_PAGE: 1,
  GROUP_FRIEND_PAGE: 2,
};

const socketStatusCode = {
  OK: 1,
  LOGIN_IN_OTHER_DEVICE: 2,
  CONNECT_ERROR: 3,
  NO_CONNECT: 4,
  RETRYING: 5,
};

const wsEvents = {
  PING_PONG: 'pingpong',
  PRIVATE_CHAT_SEND: 'PRIVATE_CHAT_SEND',
  OTHER_DEVICE_LOGIN: 'OTHER_DEVICE_LOGIN',
  LOGIN_IN_PHONE_PC: 'LOGIN_IN_PHONE_PC',
  FRIEND_ONLINE: 'FRIEND_ONLINE',
  PRIVATE_CHAT_SEND_OTHER_DEVICE: 'PRIVATE_CHAT_SEND_OTHER_DEVICE',
  PRIVATE_CHAT_RECEIVE: 'PRIVATE_CHAT_RECEIVE',
  FRIEND_OFFLINE: 'FRIEND_OFFLINE',
  SYNC_FRIEND_APPLY: 'SYNC_FRIEND_APPLY',
  RECEIVE_FRIEND_APPLY: 'RECEIVE_FRIEND_APPLY',
  RECEIVE_FRIEND_APPLY_RESULT: 'RECEIVE_FRIEND_APPLY_RESULT',
};

const loginStatusType = {
  ONLINE: 0,
  OFFLINE: 1,
  LOGIN_IN_OTHER_DEVICE: 2,
};
export {
  userItemType,
  userRelationship,
  dialogShowType,
  handleFriendApply,
  funcName,
  socketStatusCode,
  wsEvents,
  loginStatusType,
};
