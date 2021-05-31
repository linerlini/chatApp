<template>
  <div class="load-wrapper" :style="{width: `${size}px`}">
    <div class="load-content">
      <div class="load"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    size: {
      type: Number,
      default: 48,
    },
  },
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
  .load-wrapper {
    width: 48px;
  }
  .load-content {
    height: 0px;
    padding-top: 100%;
    position: relative;
  }
  .load {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    border: 3px solid white;
    border-radius: 50%;
    border-bottom-color: transparent;
    animation: rotate 1s infinite linear;
  }
  .load::before {
    content: '';
    display: block;
    position: absolute;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    border: 3px solid #FF3D00;
    border-top-color: transparent;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
  }
  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
</style>
