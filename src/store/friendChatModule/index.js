const store = {
  state: {
    chatAccount: -1, // 初始化
    isShowChatCard: false,
  },
  mutations: {
    setChatAccount(state, account) {
      if (account === null || !account) {
        return;
      }
      state.chatAccount = account;
    },
    setIsShowChatCard(state, value) {
      state.isShowChatCard = value;
    },
  },
  namespaced: true,
};
export default store;
