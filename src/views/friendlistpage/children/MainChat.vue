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
    <div class="user-list">
      <base-user-item v-for="item in friends" :key="item.name" :user-info="item"/>
    </div>
  </div>
</template>

<script>
import BaseTabBar from 'components/common/BaseTabBar.vue';
import BaseUserItem from 'components/content/BaseUserItem.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import funcCart from '../utils/funcCart';

export default {
  components: {
    BaseTabBar,
    BaseUserItem,
  },
  setup() {
    const store = useStore();
    // 切换好友和信息
    const tabArr = ['friend', 'message'];
    const { changeCurrentPage, currentPage } = funcCart(tabArr);
    // 处理并展示好友信息
    const friends = computed(() => store.state.friendInfoModule.friends.flat());
    return {
      tabArr,
      changeCurrentPage,
      currentPage,
      friends,
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
    .user-list {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
