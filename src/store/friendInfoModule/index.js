import Friend from 'assets/js/model/friendInfo';
import { userRelationship } from 'assets/js/model/constants';

const store = {
  state: {
    friends: [],
    friendHandleRecord: [], // 已经处理的
    friendHandleing: [], // 等待处理的
  },
  mutations: {
    setFriends(state, payload) {
      state.friends = payload;
    },
    setFriendHandleing(state, payload) {
      state.friendHandleing = payload;
    },
    setFriendHandleRecord(state, payload) {
      state.friendHandleRecord = payload;
    },
  },
  actions: {
    initFriends({ commit }, payload) {
      const { groups, applyFirends } = payload;
      const formatGroups = groups.map((item) => {
        const result = item.map((item1) => new Friend({
          name: item1.name,
          account: item1.account,
          signature: item1.signature,
          chats: [item1.lastword],
        }));
        return result;
      });
      const handleing = [];
      const friendHandleRecord = [];
      applyFirends.forEach((item) => {
        if (
          item.relationship === userRelationship.RECEIVE_APPLY
          || item.relationship === userRelationship.APPLYING
        ) {
          handleing.push([item.account, {
            name: item.name,
            account: item.account,
            signature: item.signature,
            relationship: item.relationship,
          }]);
        } else {
          friendHandleRecord.push([item.account, {
            name: item.name,
            account: item.account,
            signature: item.signature,
            relationship: item.relationship,
          }]);
        }
      });
      commit('setFriends', formatGroups);
      commit('setFriendHandleing', handleing);
      commit('setFriendHandleRecord', friendHandleRecord);
    },
    handleFriendApply({ commit, state }, payload) {
      const { friendHandleRecord, friendHandleing } = state;
      const newFriendHandleRecord = new Map(friendHandleRecord);
      const newFriendHandleing = new Map(friendHandleing);
      const user = newFriendHandleing.get(payload.account);
      newFriendHandleing.delete(user.account);
      user.relationship = payload.handleResult;
      newFriendHandleRecord.set(user.account, user);
      if (payload.handleResult === userRelationship.FRIEND) {
        const { friends } = state;
        commit('setFriends', [...friends, new Friend(
          ...user,
        )]);
      }
      commit('setFriendHandleing', Array.from(newFriendHandleing));
      commit('setFriendHandleRecord', Array.from(newFriendHandleRecord));
    },
  },
  namespaced: true,
};

export default store;
