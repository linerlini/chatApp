<template>
  <div class="chat-wrapper">
    <div class="chat-header">
      <div class="user-info">
        <img src="~public/images/usericon.jpg" alt="">
        <p>{{userInfo.name}}</p>
      </div>
      <div class="close-chat" @click="closeChat">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon-test4"></use>
        </svg>
      </div>
    </div>
    <scroll class="message-wrapper">
      <div class="chat-main">
        <base-message-item
          v-for="(item) in userInfo.chats"
          :key="item.createTime"
          :message="item"
          :name="item.isSend ? myName : userInfo.name"
        />
      </div>
    </scroll>
    <div class="chat-footer">
      <div class="chat-action-container">
        <button class="select-biaoqing">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-biaoqing"></use>
          </svg>
        </button>
        <button class="send-message">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-send-s"></use>
          </svg>
        </button>
      </div>
      <div class="chat-input">
        <textarea rows="1"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import Scroll from 'components/common/Scroll.vue';
import BaseMessageItem from 'components/common/BaseMessageItem.vue';
import FriendInfo from 'assets/js/model/friendInfo';

export default {
  components: {
    Scroll,
    BaseMessageItem,
  },
  emits: ['close-chat'],
  setup(props, context) {
    const store = useStore();
    // 获取自己的用户名
    const myName = computed(() => store.state.name);
    const friends = computed(() => {
      let result = {};
      store.state.friendInfoModule.friends.forEach((group) => {
        result = Object.assign(result, group);
      });
      return result;
    });
    // 获取当前聊天对象的信息
    const userInfo = computed(() => {
      const account = store.state.friendChatModule.chatAccount;
      if (friends.value[account]) {
        console.log(friends.value[account]);
        return friends.value[account];
      }
      return FriendInfo.createNewFriend();
    });
    // 关闭聊天框
    function closeChat() {
      context.emit('close-chat');
    }
    return {
      myName,
      userInfo,
      closeChat,
    };
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/style/mixin.scss";
  .chat-wrapper {
    width: 340px;
    border-radius: 10px;
    background: white;
    font-size: 0px;
    .chat-header {
      height: 60px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .user-info {
        padding: 0 16px;
        border-radius: 999px;
        height: 40px;
        background: rgba(84, 196, 250, 0.2);
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
        p {
          font-size: 12px;
          color: rgb(84, 196, 250);
          flex: 1;
          @include no-wrap;
        }
      }
      .close-chat {
        font-size: 24px;
        color: rgb(153, 153, 153);
      }
    }
    .message-wrapper {
      height: 360px;
      box-shadow: rgb(0 0 0 / 7%) 0px 1px 2px 0px inset;
    }
    .chat-footer {
      border-top: 1px solid rgb(229, 229, 229);
      padding-bottom: 16px;
      .chat-action-container {
        display: flex;
        padding: 8px 12px;
        justify-content: space-between;
        > button {
          width: 30px;
          height: 30px;
          border: none;
          outline: none;
          background: transparent;
          padding: 0px;
          font-size: 30px;
        }
      }
      .chat-input {
        max-height: 120px;
        textarea {
          height: 88px;
          width: 100%;
          line-height: 22px;
          resize: none;
          padding: 0 18px;
          border: none;
          outline: none;
          color: rgb(51, 51, 51);
          font-size: 15px;
        }
      }
    }
  }
</style>>
