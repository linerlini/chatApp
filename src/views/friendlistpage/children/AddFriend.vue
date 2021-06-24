<template>
  <div class="func-page-wrapper">
    <base-tab-bar :tab-arr="tabArr" @current-tab-change="changeCurrentPage" class="tab-bar">
      <template #find>
        <div class="tab-item" :class="{active:currentPage === 'find'}">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tianjiahaoyou"></use>
          </svg>
        </div>
      </template>
      <template #newfriend>
        <div class="tab-item" :class="{active:currentPage === 'newfriend'}">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
        </div>
      </template>
    </base-tab-bar>
    <div class="content">
      <ul class="pages">
        <base-user-info
          :user-info="user"
          :show="user && currentPage==='find'"
          :button-text="buttonText"
          @button-click="addFriends"
          class="page"
        />
        <apply-friends-list
          v-show="currentPage==='newfriend'"
          class="page"
          @handle-friendship="acceptOrReject"
        />
      </ul>
    </div>
    <friends-group v-show="groupListShow" @close="closeGroupList" @submit="getSelectGroup"/>
    <search-box class="search" v-model="query"/>
    <confirm-dialog
      :show-type="showType"
      :success-info="successInfo"
      :fail-info="errorInfo"
      @dialog-close="closeDialog"
      @submit-yes="rejectApply"
    />
  </div>
</template>

<script>
import {
  ref,
  watch,
  computed,
} from 'vue';
import { useStore } from 'vuex';
import BaseTabBar from 'components/common/BaseTabBar.vue';
import SearchBox from 'components/common/SearchBox.vue';
import BaseUserInfo from 'components/content/BaseUserInfo.vue';
import { ConfirmDialog, dialogFunc, dialogShowType } from 'components/content/confirmDialog';
import { searchUserInfo, applyAddFriend, handleFriend } from 'api/addFriend/index';
import debounce from 'assets/js/tools/debounce';
import { userRelationship, handleFriendApply } from 'assets/js/model/constants';
import ApplyFriendsList from './ApplyFriendsList.vue';
import FriendsGroup from './FriendsGroup.vue';
import funcCart from '../utils/funcCart';

export default {
  components: {
    BaseTabBar,
    SearchBox,
    BaseUserInfo,
    ApplyFriendsList,
    FriendsGroup,
    ConfirmDialog,
  },
  setup() {
    const store = useStore();
    const friends = store.state.friendInfoModule;
    // 提示信息
    const {
      successInfo,
      errorInfo,
      showType,
      selectInfo,
    } = dialogFunc();
    function closeDialog() {
      showType.value = dialogShowType.HIDDEN;
    }
    // 切换查找和申请列表
    const tabArr = ['find', 'newfriend'];
    const { changeCurrentPage, currentPage } = funcCart(tabArr);
    // 搜索相关
    const query = ref('');
    const user = ref(undefined); // 搜索结果
    const searchUser = debounce(async (queryStr) => {
      const querys = Number(queryStr);
      // 搜索关键字为空
      if (!querys) {
        user.value = undefined;
        return;
      }
      // 如果搜索自己
      if (querys === store.state.account) {
        user.value = {
          name: store.state.name,
          signature: store.state.signature,
          status: userRelationship.FRIEND,
          account: store.state.account,
        };
        return;
      }
      // 如果是自己的好友或者已经发出了申请
      let isFriend = false;
      isFriend = friends.friends.some((group) => {
        const friend = group[querys];
        if (friend) {
          user.value = {
            name: friend.name,
            signature: friend.signature,
            status: friend.relationship,
            account: friend.account,
          };
          return true;
        }
        return false;
      });
      let isApplyingFriend = false;
      if (friends.friendHandleing[querys]) {
        const friend = friends.friendHandleing[querys];
        user.value = {
          name: friend.name,
          signature: friend.signature,
          status: friend.relationship,
          account: friend.account,
        };
        isApplyingFriend = true;
      } else {
        isApplyingFriend = false;
      }
      if (isFriend || isApplyingFriend) {
        return;
      }
      try {
        const result = await searchUserInfo(querys);
        if (result.searchResult) {
          user.value = {
            name: result.name,
            signature: result.signature,
            account: result.account,
            status: userRelationship.STRANGE,
          };
        } else {
          user.value = undefined;
        }
      } catch (err) {
        user.value = undefined;
        errorInfo.value = '网络错误，稍后再试';
        showType.value = dialogShowType.ERROR;
      }
    });
    const queryWatch = watch(query, (value) => {
      searchUser(value);
    });
    // 根据好友关系，计算好友信息button文本
    const buttonText = computed(() => {
      let content = '';
      let status = 5;
      if (user.value) {
        status = user.value.status;
      }
      switch (status) {
        case userRelationship.FRIEND:
          content = 'my friend';
          break;
        case userRelationship.APPLYING:
          content = 'applying';
          break;
        case userRelationship.RECEIVE_APPLY:
          content = 'wait handle';
          break;
        default:
          content = 'ADD FRIEND';
      }
      return content;
    });
    // 处理选择好友列表
    const groupListShow = ref(false);
    let groupIndex = 0;
    let isHandleFriendship = false; // 判断是哪种情况下发起的选择好友列表，是接受申请，还是发起申请。
    function closeGroupList() {
      isHandleFriendship = false;
      groupListShow.value = false;
    }
    function getSelectGroup(list) {
      if (list.length === 0) {
        errorInfo.value = 'Not to choose';
        showType.value = dialogShowType.ERROR;
        return;
      }
      groupIndex = list[0];
      if (!isHandleFriendship) {
        apply();
        user.value.status = userRelationship.APPLYING;
      } else {
        acceptApply();
      }
      closeGroupList();
    }
    // 处理添加好友逻辑
    const handleUserInfo = {};
    const addFriends = function func() {
      const { status } = user;
      switch (status) {
        case userRelationship.RECEIVE_APPLY:
          isHandleFriendship = true;
          groupListShow.value = true;
          break;
        case userRelationship.APPLYING:
          successInfo.value = 'please wait a monent';
          showType.value = dialogShowType.OK;
          break;
        case userRelationship.FRIEND:
          successInfo.value = 'You are already friends';
          showType.value = dialogShowType.OK;
          break;
        default:
          groupListShow.value = true;
      }
    };
    async function apply() {
      const result = await applyAddFriend({
        account: store.state.account,
        addAccount: user.value.account,
        name: store.state.name,
        addName: user.value.name,
        group: groupIndex,
        groupname: store.state.groupNames[groupIndex],
        signature: store.state.signature,
        friendSignature: user.value.signature,
      });
      if (result) {
        successInfo.value = 'add success';
        showType.value = dialogShowType.OK;
        user.value.relationship = userRelationship.APPLYING;
        user.value.groupIndex = groupIndex;
        store.dispatch('friendInfoModule/handleFriendApply', user.value);
      } else {
        errorInfo.value = 'add error';
        showType.value = dialogShowType.ERROR;
      }
    } // 申请添加好友
    function acceptOrReject(obj) {
      switch (obj.buttonType) {
        case handleFriendApply.REJECT: // 拒绝按钮
          handleUserInfo.account = obj.account;
          selectInfo.value = 'are you sure?';
          showType.value = dialogShowType.SELECT;
          break;
        case handleFriendApply.ACCEPT: // 接受按钮
          handleUserInfo.account = obj.account;
          isHandleFriendship = true;
          groupListShow.value = true;
          break;
        case handleFriendApply.WAIT: // 等待按钮
          errorInfo.value = 'Please wait a moment';
          showType.value = dialogShowType.ERROR;
          break;
        default: // 结果按钮
          showResultPromtp(obj.relationship);
      }
    } // 处理是接受还是申请好奇请求或者申请结果的提示
    function showResultPromtp(type) {
      if (type === userRelationship.REJECT) {
        errorInfo.value = 'You have rejected his friend request';
        showType.value = dialogShowType.ERROR;
      } else if (type === userRelationship.NOTPASS) {
        errorInfo.value = 'Your application failed';
        showType.value = dialogShowType.ERROR;
      } else {
        successInfo.value = 'You are already friends!';
        showType.value = dialogShowType.OK;
      }
    }
    async function rejectApply() {
      const result = await handleFriend({
        account: store.state.account,
        addAccount: handleUserInfo.account,
        type: 0,
      });
      if (!result) {
        errorInfo.value = 'handle failed!';
        showType.value = dialogShowType.ERROR;
        return;
      }
      store.dispatch('friendInfoModule/handleFriendApplyResult', {
        handleResult: userRelationship.REJECT,
        account: handleUserInfo.account,
      });
    }
    async function acceptApply() {
      const result = await handleFriend({
        account: store.state.account,
        addAccount: handleUserInfo.account,
        type: 1,
        options: {
          groupIndex,
        },
      });
      if (!result) {
        errorInfo.value = 'handle failed!';
        showType.value = dialogShowType.ERROR;
        return;
      }
      successInfo.value = 'add success';
      showType.value = dialogShowType.OK;
      store.dispatch('friendInfoModule/handleFriendApplyResult', {
        handleResult: userRelationship.FRIEND,
        account: handleUserInfo.account,
        groupIndex,
      });
    }
    return {
      tabArr,
      changeCurrentPage,
      currentPage,
      query,
      queryWatch,
      user,
      groupListShow,
      closeGroupList,
      getSelectGroup,
      buttonText,
      successInfo,
      errorInfo,
      selectInfo,
      showType,
      closeDialog,
      addFriends,
      acceptOrReject,
      rejectApply,
    };
  },
};
</script>
<style lang="scss" scoped>
  .func-page-wrapper {
    width: 290px;
    height: 484px;
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
    transition: 250ms all ease-in-out;
    transform-origin: bottom right;
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    flex-direction: column;
    .tab-bar {
      height: 69px;
      .tab-item {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #BBC6CE;
        font-size: 28px;
        &.active {
          color: #5D9CEC;
        }
      }
    }
    .content {
     flex: 1;
     overflow: hidden;
     .pages {
       display: inline-block;
       white-space: nowrap;
       height: 100%;
       .page {
         display: inline-block;
         height: 100%;
         width: 290px;
       }
     }
    }
    .search {
      align-self: center;
      margin-bottom: 10px;
    }
  }
</style>
