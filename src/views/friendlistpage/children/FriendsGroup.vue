<template>
  <v-dialog @bg-cover-click="close">
    <select-list :title="'Select Group'" :list="groups" @submit="submit" class="list"/>
  </v-dialog>
</template>

<script>
import SelectList from 'components/common/SelectList.vue';
import VDialog from 'components/common/Dialog.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  components: {
    SelectList,
    VDialog,
  },
  emits: ['close', 'submit'],
  setup(props, context) {
    const store = useStore();
    const groups = computed(() => store.state.groupNames);

    function close() {
      context.emit('close');
    }
    function submit(list) {
      context.emit('submit', list);
    }
    return {
      groups,
      close,
      submit,
    };
  },
};
</script>
<style lang="scss" scoped>
  .list {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
