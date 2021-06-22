<template>
  <router-view class="page">
  </router-view>
  <v-dialog v-show="isShowChatCard">
    <base-chat-card
      class="chat-card"
      @close-chat="closeChat"
    />
  </v-dialog>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import BaseChatCard from 'components/common/BaseChatCard.vue';
import VDialog from 'components/common/Dialog.vue';

export default {
  components: {
    BaseChatCard,
    VDialog,
  },
  setup() {
    const store = useStore();
    const isShowChatCard = computed(() => store.state.friendChatModule.isShowChatCard);
    function closeChat() {
      store.commit('friendChatModule/setIsShowChatCard', false);
    }
    return {
      isShowChatCard,
      closeChat,
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
