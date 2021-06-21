export default class FriendChat {
  constructor({
    message,
    createTime,
    isSend,
  }) {
    this.message = message;
    this.createTime = createTime || new Date();
    this.isSend = isSend;
  }
}
