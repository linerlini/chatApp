import Friend from 'assets/js/model/friendInfo';
import { userRelationship } from 'assets/js/model/constants';

const store = {
  state: {
    friends: [],
    friendHandleRecord: {}, // 已经处理的
    friendHandleing: {}, // 等待处理的
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
    addFriend(state, { user, groupIndex }) {
      state.friends[groupIndex][user.account] = new Friend({
        groupIndex,
        ...user,
      });
    },
    addHandleRecord(state, user) {
      state.friendHandleRecord[user.account] = user;
    },
    addHandleing(state, user) {
      state.friendHandleing[user.account] = user;
    },
  },
  actions: {
    initFriends({ commit }, payload) {
      const { groups, applyFirends } = payload;
      const formatGroups = groups.map((item) => {
        const result = Object.create(null);
        item.forEach((item1) => {
          result[item1.account] = new Friend({
            name: item1.name,
            account: item1.account,
            signature: item1.signature,
            chats: [item1.lastword],
            groupIndex: item1.groupIndex,
            relationship: userRelationship.FRIEND,
          });
        });
        return result;
      });
      const handleing = Object.create(null);
      const friendHandleRecord = Object.create(null);
      applyFirends.forEach((item) => {
        if (
          item.relationship === userRelationship.RECEIVE_APPLY
          || item.relationship === userRelationship.APPLYING
        ) {
          handleing[item.account] = {
            name: item.name,
            account: item.account,
            signature: item.signature,
            relationship: item.relationship,
          };
        } else {
          friendHandleRecord[item.account] = {
            name: item.name,
            account: item.account,
            signature: item.signature,
            relationship: item.relationship,
          };
        }
      });
      console.log(formatGroups);
      console.log(handleing);
      console.log(friendHandleRecord);
      commit('setFriends', formatGroups || []);
      commit('setFriendHandleing', handleing);
      commit('setFriendHandleRecord', friendHandleRecord);
    },
    handleFriendApplyResult({ commit, state }, { account, handleResult, groupIndex }) {
      const { friendHandleing } = state;
      const newFriendHandleing = { ...friendHandleing };
      // 从申请中删除，并添加到处理记录中
      const user = newFriendHandleing[account];
      delete newFriendHandleing[user.account];
      user.relationship = handleResult;
      if (handleResult === userRelationship.FRIEND) {
        commit('addFriend', {
          user,
          groupIndex,
        });
      }
      commit('addHandleRecord', user);
      commit('setFriendHandleing', newFriendHandleing);
    },
    handleFriendApply({ commit, state }, user) {
      if (state.friendHandleRecord[user.account]) {
        const newRecord = { ...state.friendHandleRecord };
        delete newRecord[user.account];
        commit('setFriendHandleRecord', newRecord);
      }
      commit('addHandleing', user);
    },
  },
  namespaced: true,
};

export default store;
