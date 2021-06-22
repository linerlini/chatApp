<template>
  <div class="wrapper">
    <base-chat-card/>
  </div>
</template>

<script>
import BaseChatCard from 'components/common/BaseChatCard.vue';

export default {
  components: {
    BaseChatCard,
  },
};
</script>

<style lang="scss" scoped>
  .wrapper {
    background: #333;
  }
</style>
