<template>
  <div class="chat-user-item-wrapper">
    <div class="user-icon"><img src="~public/images/usericon.jpg" alt=""></div>
    <div class="user-chat-info">
      <p class="user-name">{{reactiveUserInfo.name}}</p>
      <p class="chat-info">{{chatInfo}}</p>
    </div>
    <div class="user-status" @click="checkApplyRecord($event)">
      <div class="apply" v-if="itemType === userItemType.USER_APPLY">
        <div
          class="accept button"
          v-show="userInfo.relationship === userRelationship.RECEIVE_APPLY"
        >accept</div>
        <div
          class="wait button"
          v-show="userInfo.relationship === userRelationship.APPLYING"
        >wait</div>
        <div
          class="reject button"
          v-show="userInfo.relationship === userRelationship.RECEIVE_APPLY"
        >reject</div>
        <div
          class="mark not-pass"
          v-show="userInfo.relationship === userRelationship.NOTPASS"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yijujue"></use>
          </svg>
        </div>
        <div
          class="mark has-pass"
          v-show="userInfo.relationship === userRelationship.FRIEND"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yunxu"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { userItemType, userRelationship, handleFriendApply } from 'assets/js/model/constants';

export default {
  components: {},
  props: {
    userInfo: {
      type: Object,
    },
    itemType: {
      type: Number,
      default: 0,
    },
  },
  emits: ['handle-friendship'],
  setup(props, context) {
    const reactiveUserInfo = reactive(props.userInfo);
    const lastWord = computed(() => reactiveUserInfo.chats[reactiveUserInfo.chats.length - 1]);
    const chatInfo = computed(() => (props.itemType === userItemType.USER_MESSAGE
      ? lastWord.value : reactiveUserInfo.signature));
    // 接受或者拒绝好友申请
    function checkApplyRecord(event) {
      const target = event.target.closest('.apply > div');
      if (!target) {
        return;
      }
      let buttonType = handleFriendApply.WAIT;
      const classList = target.classList;
      if (classList.contains('accept')) {
        buttonType = handleFriendApply.ACCEPT;
      } else if (classList.contains('reject')) {
        buttonType = handleFriendApply.REJECT;
      } else if (classList.contains('wait')) {
        buttonType = handleFriendApply.WAIT;
      } else {
        buttonType = handleFriendApply.RESULT;
      }
      context.emit('handle-friendship', {
        buttonType,
        account: props.userInfo.account,
        relationship: props.userInfo.relationship,
      });
    }
    return {
      reactiveUserInfo,
      chatInfo,
      userRelationship,
      userItemType,
      checkApplyRecord,
    };
  },
};
</script>
<style lang="scss" scoped>
  @import '~assets/style/mixin.scss';
  .chat-user-item-wrapper{
    display: flex;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid #e7ebee;
    padding: 0px 15px;
    .user-icon {
      width: 40px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .user-chat-info {
      flex: 1;
      margin-left: 15px;
      padding-right: 10px;
      overflow: hidden;
      .user-name {
        font-size: 16px;
        color: #597a96;
        @include no-wrap;
      }
      .chat-info {
        font-size: 12px;
        color: #aab8c2;
        @include no-wrap;
      }
    }
    .user-status {
      width: 40px;
      align-self: stretch;
      .button {
        width: 100%;
        line-height: 20px;
        border-radius: 3px;
        text-align: center;
        font-size: 12px;
        color: white;
      }
      .mark {
        font-size: 30px;
        text-align: center;
        color: #cc163a;
      }
      .accept {
        background: #cc163a;
      }
      .reject {
        background: #3e3841;
      }
      .wait {
        background: #a8456b;
      }
      .apply {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
      }
    }
  }
</style>
