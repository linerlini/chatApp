<template>
  <transition name="in-out">
    <div class="toast-wrapper" v-show="showMessageToast">
      <img src="~public/images/usericon.jpg" alt="">
      <p>{{toastMessage}}</p>
    </div>
  </transition>
</template>

<script>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    toastShowTime: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    const store = useStore();
    const showMessageToast = computed(() => store.state.friendChatModule.showMessageToast);
    const toastType = computed(() => store.state.friendChatModule.toastType);
    const toastMessage = computed(() => store.state.friendChatModule.toastMessage);
    // 关闭toast
    let closeTimeId = null;
    watch(() => store.state.friendChatModule.toastTime, (value, preValue) => {
      if (value === preValue) {
        return;
      }
      if (showMessageToast.value) {
        clearTimeout(closeTimeId);
      } else {
        store.commit('friendChatModule/setShowMessageToast', true);
      }
      closeTimeId = setTimeout(() => store.commit('friendChatModule/setShowMessageToast', false), props.toastShowTime);
    });
    return {
      toastMessage,
      toastType,
      showMessageToast,
    };
  },
};
</script>

<style lang="scss" scoped>
  @import '~assets/style/mixin.scss';
  .in-out-enter-from {
    transform: translateX(-100%);
    opacity: 0;
  }
  .in-out-enter-active {
    transition: 0.25s all ease-out;
  }
  .in-out-leave-active {
    transition: 0.25s all ease-in;
  }
  .in-out-leave-to {
    opacity: 0;
  }
  .toast-wrapper {
    position: fixed;
    z-index: 1100;
    top: 30px;
    left: 30px;
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
      max-width: 200px;
      @include no-wrap;
    }
  }
</style>
