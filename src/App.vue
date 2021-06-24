<template>
  <router-view class="page">
  </router-view>
  <v-dialog v-show="isShowChatCard">
    <base-chat-card
      class="chat-card"
      @close-chat="closeChat"
    />
  </v-dialog>
  <message-toast/>
  <confirm-dialog
    :show-type="showType"
    :success-info="successInfo"
    :fail-info="errorInfo"
    @dialog-close="closeDialog"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import BaseChatCard from 'components/common/BaseChatCard.vue';
import VDialog from 'components/common/Dialog.vue';
import MessageToast from 'components/content/MessageToast.vue';
import ConfirmDialog from 'components/content/confirmDialog/ConfirmDialog.vue';
import dialogFunc from 'components/content/confirmDialog/tool';
import { dialogShowType, loginStatusType } from 'assets/js/model/constants';
import storage from 'assets/js/tools/storage';

export default {
  components: {
    BaseChatCard,
    MessageToast,
    VDialog,
    ConfirmDialog,
  },
  setup() {
    const store = useStore();
    const isShowChatCard = computed(() => store.state.friendChatModule.isShowChatCard);
    function closeChat() {
      store.commit('friendChatModule/setIsShowChatCard', false);
    }
    // 提示信息
    const { successInfo, errorInfo, showType } = dialogFunc();
    function closeDialog() {
      showType.value = dialogShowType.HIDDEN;
    }
    // 检测登陆状态
    watch(() => store.state.loginStatus, (value) => {
      if (value === loginStatusType.LOGIN_IN_OTHER_DEVICE) {
        errorInfo.value = 'Your account is logged in on another device!';
        showType.value = dialogShowType.ERROR;
        setTimeout(() => {
          storage.clear();
          window.location.replace(window.location);
        }, 3000);
      }
    });
    return {
      isShowChatCard,
      closeChat,
      successInfo,
      errorInfo,
      closeDialog,
      showType,
    };
  },
};
</script>
<style lang="scss">
  .page {
    height: 100vh;
    overflow: hidden;
  }
  .chat-card {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
  }
</style>
