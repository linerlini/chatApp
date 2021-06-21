<template>
  <transition name="animation">
    <v-dialog v-show="showFuncPage" @bg-cover-click="hiddenFuncPage">
      <keep-alive>
        <component :is="funcPageComponentName" class="func-page"></component>
      </keep-alive>
    </v-dialog>
  </transition>
</template>

<script>
import VDialog from 'components/common/Dialog.vue';
import { computed } from 'vue';
import { funcName } from 'assets/js/model/constants';
import AddFriendPage from './AddFriend.vue';
import MainChat from './MainChat.vue';

export default {
  components: {
    VDialog,
    AddFriendPage,
    MainChat,
  },
  props: {
    showFuncPage: {
      type: Boolean,
      default: false,
    },
    currentFuncPage: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    function hiddenFuncPage() {
      context.emit('hidden-func-page');
    }
    const funcPageComponentName = computed(() => {
      switch (props.currentFuncPage) {
        case funcName.ALL_FRIEND_PAGE:
          return 'MainChat';
        case funcName.ADD_FRIEND_PAGE:
          return 'AddFriendPage';
        default:
          return 'MainChat';
      }
    });
    return {
      hiddenFuncPage,
      funcPageComponentName,
    };
  },
  emits: ['hidden-func-page'],
};
</script>
<style lang="scss" scoped>
  .animation-enter-active, .animation-leave-active {
    transition: 250ms all ease-out;
  }
  .animation-enter-from, .animation-leave-to {
    opacity: 0;
    .func-page {
      transform: scale(0);
    }
  }
</style>
