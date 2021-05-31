<template>
  <div class="planet-wrapper">
    <div class="planet"></div>
    <div class="star-ring-before"></div>
    <div class="star-ring-before-large"></div>
    <div class="star-ring-after"></div>
    <div class="star-ring-after-large"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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
  .planet-wrapper {
    position: relative;
    .planet {
      width: 120px;
      height: 120px;
      background: #72f9c1;
      position: relative;
      border-radius:50%;
      overflow: hidden;
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0%;
        top: 0%;
        height: 100%;
        width: 400%;
        background:radial-gradient(circle at 50% 0%,
          transparent 25%, #5193ff 65%) repeat-x top left/50% 100%;
        animation: like-rotate 4s linear infinite alternate;
        mask: url('~public/images/mask.png');
      }
    }
    [class^='star-ring'] {
      position: absolute;
      border: 3px solid #FBAE7C;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform:  translate(-50%, -50%) rotate(-45deg);
    }
    .star-ring-before {
      width: 140px;
      height: 40px;
      clip-path: inset(27% 50% 0 0);
    }
    .star-ring-before-large {
      width: 170px;
      height: 70px;
      clip-path: inset(14% 50% 0 0);
    }
    .star-ring-after {
      width: 140px;
      height: 40px;
      clip-path: inset(27% 0 0 50%)
    }
    .star-ring-after-large {
      width: 170px;
      height: 70px;
      clip-path: inset(14% 0 0 50%)
    }
    @keyframes like-rotate {
      0% {
        transform: translatex(0);
      }
      100% {
        transform: translatex(-70%);
      }
    }
  }
</style>
