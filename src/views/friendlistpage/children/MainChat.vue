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
        <div class="chat-list" v-show="currentPage === 'message'"></div>
      </scroll>
      <base-user-info
        :show="showFriendInfoCard"
        :user-info="currentFriendInfoCard"
      />
      <search-box class="search"/>
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
    const chats = computed(() => []);
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
    return {
      tabArr,
      changeCurrentPage,
      currentPage,
      friends,
      showValue,
      openFriendInfoCard,
      showFriendInfoCard,
      currentFriendInfoCard,
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
    }
  }
</style>
