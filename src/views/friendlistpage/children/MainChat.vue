<template>
  <div class="func-page-wrapper">
    <base-tab-bar :tab-arr="tabArr" @current-tab-change="changeCurrentPage" class="tab-bar">
      <template #friend>
        <div class="tab-item" :class="{active:currentPage === 'friend'}">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-friend"></use>
          </svg>
        </div>
      </template>
      <template #message>
        <div class="tab-item" :class="{active:currentPage === 'message'}">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon-test"></use>
          </svg>
        </div>
      </template>
    </base-tab-bar>
    <div class="content">
      <scroll
        :data-arr="showValue"
        click
        v-show="!showFriendInfoCard"
        class="list"
      >
        <div
          class="user-list"
          v-show="currentPage === 'friend'"
          @click.stop="openFriendInfoCard($event)"
        >
          <base-user-item
            v-for="(value, key) in friends"
            :key="key"
            :user-info="value"
          />
        </div>
        <div class="chat-list" v-show="currentPage === 'message'">
          <base-user-item
            v-for="(item) in chats.notHasAcceptRecord"
            :key="item.account"
            :user-info="item"
            :item-type="userItemType.USER_MESSAGE"
          />
          <base-user-item
            v-for="(item) in chats.hasAcceptRecord"
            :key="item.account"
            :user-info="item"
            :item-type="userItemType.USER_MESSAGE"
          />
        </div>
      </scroll>
      <div class="user-info-card">
        <base-user-info
          :show="showFriendInfoCard && currentPage === 'friend'"
          :user-info="currentFriendInfoCard"
          button-text="send message"
        />
        <div class="user-link" v-show="showFriendInfoCard && currentPage === 'friend'"></div>
      </div>
      <search-box class="search" v-show="!showFriendInfoCard"/>
    </div>
  </div>
</template>

<script>
import BaseTabBar from 'components/common/BaseTabBar.vue';
import BaseUserItem from 'components/content/BaseUserItem.vue';
import Scroll from 'components/common/Scroll.vue';
import BaseUserInfo from 'components/content/BaseUserInfo.vue';
import SearchBox from 'components/common/SearchBox.vue';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { userItemType } from 'assets/js/model/constants';
import funcCart from '../utils/funcCart';

export default {
  components: {
    Scroll,
    BaseTabBar,
    BaseUserItem,
    BaseUserInfo,
    SearchBox,
  },
  setup() {
    const store = useStore();
    // 切换好友和信息
    const tabArr = ['friend', 'message'];
    const { changeCurrentPage, currentPage } = funcCart(tabArr);
    // 好友信息和聊天信息
    const friends = computed(() => {
      let result = {};
      store.state.friendInfoModule.friends.forEach((group) => {
        result = Object.assign(result, group);
      });
      return result;
    });
    const chats = computed(() => {
      const hasAcceptRecord = [];
      const notHasAcceptRecord = [];
      Object.keys(friends.value).forEach((key) => {
        const friendChats = friends.value[key].chats;
        if (!friendChats.length) {
          return;
        }
        if (friends.value[key].notAcceptWordCount) {
          notHasAcceptRecord.push(friends.value[key]);
        } else {
          hasAcceptRecord.push(friends.value[key]);
        }
      });
      return { hasAcceptRecord, notHasAcceptRecord };
    });
    // 用于切换tab时刷新scroll
    const showValue = computed(() => (currentPage.value === 'friend' ? friends : chats));
    // 好友资料卡相关
    const showFriendInfoCard = ref(false);
    const currentFriendInfoCard = ref(undefined);
    // 好友列表的点击事件处理
    function openFriendInfoCard(event) {
      const target = event.target.closest('.chat-user-item-wrapper');
      if (!target) {
        return;
      }
      const { account } = target.dataset;
      console.log(friends);
      currentFriendInfoCard.value = friends.value[account];
      console.log(currentFriendInfoCard.value);
      showFriendInfoCard.value = true;
    }
    // 搜索相关
    return {
      tabArr,
      changeCurrentPage,
      currentPage,
      friends,
      chats,
      showValue,
      openFriendInfoCard,
      showFriendInfoCard,
      currentFriendInfoCard,
      userItemType,
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
      display: flex;
      flex-direction: column;
      height: calc(100% - 69px);

      .list {
        flex: 1;
      }
      .search {
        flex: 0;
        margin-bottom: 10px;
        align-self: center;
      }
      .user-list {
        flex: 1;
        overflow: hidden;
      }
      .user-info-card {
        .user-link {
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
</style>
