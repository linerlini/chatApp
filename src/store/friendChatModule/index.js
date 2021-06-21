import FriendChat from "assets/js/model/friendChat";

const store = {
    state: {
        chatRecords: {},
    },
    mutations: {
        setChatRecords(state, records) {
            state.chatRecords = records;
        }
    },
    actions: {
        initChatRecords({ state })
    }
}