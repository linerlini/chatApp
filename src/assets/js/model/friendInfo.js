class Friend {
  constructor({
    name,
    account,
    signature,
    relationship,
    chats = [],
    groupIndex,
    notAcceptWordCount,
    loginStatus,
  }) {
    this.name = name;
    this.account = account;
    this.chats = chats;
    this.signature = signature;
    this.relationship = relationship;
    this.groupIndex = groupIndex;
    this.notAcceptWordCount = notAcceptWordCount || 0;
    this.loginStatus = loginStatus;
  }
}
Friend.createNewFriend = function createNewFriend() {
  return new Friend({
    name: 'hello',
    account: 123,
    signature: 'this is a virtual people',
    relationship: 1,
    groupIndex: 0,
  });
};
export default Friend;
