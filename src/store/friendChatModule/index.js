const store = {
  state: {
    chatAccount: -1, // 初始化
    isShowChatCard: false,
    showMessageToast: false,
    toastType: null, // 0 is system, 1 is friend
    toastMessage: null,
    toastTime: null,
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
    setShowMessageToast(state, value) {
      state.showMessageToast = value;
    },
    setToastType(state, value) {
      state.toastType = value;
    },
    setToastMessage(state, value) {
      state.toastMessage = value;
    },
    setToastTime(state, value) {
      state.toastTime = value;
    },
  },
  namespaced: true,
};
export default store;
