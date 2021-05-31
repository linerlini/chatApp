<template>
  <div class="dialog-wrapper">
    <div class="bg-cover" @click.stop="$emit('bg-cover-click')"></div>
    <div class="dialog-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
  emits: ['bg-cover-click'],
};
</script>

<style lang="scss" scoped>
  .dialog-wrapper {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 997;
    .bg-cover {
      width: 100%;
      height: 100%;
      background: rgb(0, 0, 0, .7);
    }
  }
</style>
