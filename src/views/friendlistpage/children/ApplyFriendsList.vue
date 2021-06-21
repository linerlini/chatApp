<template>
  <div class="friends-list-wrapper">
    <base-user-item
      v-for="(value, key) in friendHandleing"
      :key="key"
      :item-type="userItemType.USER_APPLY"
      :user-info="value"
      @handle-friendship="acceptOrReject"
    />
    <base-user-item
      v-for="(value, key) in friendHandleRecord"
      :key="key"
      :item-type="userItemType.USER_APPLY"
      :user-info="value"
      @handle-friendship="acceptOrReject"
    />
    <div
      v-show="friendHandleing.length === 0 &&friendHandleRecord.length === 0"
      class="hint"
    >The friend request list is empty！</div>
  </div>
</template>

<script>
import BaseUserItem from 'components/content/BaseUserItem.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { userItemType } from 'assets/js/model/constants';

export default {
  components: {
    BaseUserItem,
  },
  emits: ['handle-friendship'],
  setup(props, context) {
    const store = useStore();
    const friendHandleing = computed(() => store.state.friendInfoModule.friendHandleing);
    const friendHandleRecord = computed(() => store.state.friendInfoModule.friendHandleRecord);
    function acceptOrReject(obj) {
      context.emit('handle-friendship', obj);
    }
    return {
      friendHandleing,
      friendHandleRecord,
      userItemType,
      acceptOrReject,
    };
  },
};
</script>
<style lang="scss" scoped>
  .friends-list-wrapper {
    height: 100%;
    .hint {
      text-align: center;
      margin-top: 50%;
    }
  }
</style>
