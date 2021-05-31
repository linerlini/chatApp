class Friend {
  constructor({
    name,
    account,
    signature,
    relationship,
    chats = [],
  }) {
    this.name = name;
    this.account = account;
    this.chats = chats;
    this.signature = signature;
    this.relationship = relationship;
  }
}
export default Friend;
