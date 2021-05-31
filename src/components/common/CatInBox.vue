<template>
  <div class="box-wrapper" @click="openOrClose">
    <div class="box" ref="box">
      <div class="box-left-lid lid"></div>
      <div class="box-right-lid lid"></div>
      <div class="box-icon"></div>
    </div>
    <div class="cat" ref="cat">
      <div class="cat-head">
        <div class="cat-head-low"></div>
      </div>
      <div class="cat-face">
        <div class="eye eye-left"></div>
        <div class="eye eye-right"></div>
        <div class="nose"></div>
        <div class="huzi huzi-left"></div>
        <div class="huzi huzi-right"></div>
        <div class="ear ear-left"></div>
        <div class="ear ear-right"></div>
      </div>
      <div class="cat-body"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  components: {},
  props: {},
  data() {
    return {
    };
  },
  emits: ['box-open-close'],
  setup(props, context) {
    const box = ref(null);
    const cat = ref(null);
    let open = false;
    let timeId = null;
    const ANIMATION_TIME = 400;
    function openOrClose() {
      open = !open;
      if (open) {
        if (timeId) {
          clearInterval(timeId);
          timeId = null;
        }
        box.value.classList.add('open');
        cat.value.classList.add('open');
        context.emit('box-open-close', open);
        return;
      }
      if (timeId) {
        clearInterval(timeId);
      }
      cat.value.classList.remove('open');
      timeId = setTimeout(() => box.value.classList.remove('open'), ANIMATION_TIME);
      context.emit('box-open-close', open);
    }
    onMounted(() => {
      if (!open) {
        setTimeout(() => {
          if (!open) {
            openOrClose();
          }
        }, 300);
      }
    });
    return {
      openOrClose,
      box,
      cat,
    };
  },
};
</script>
<style lang="scss" scoped>
  $box-color: #c59c5a;
  $cat-float-top: -103px;
  $cat-hide-top: 3px;
  $box-lid-open-left-angle: -135deg;
  $box-lid-open-right-angle: 135deg;
  .box {
    width: 160px;
    height: 119px;
    background: $box-color;
    position: relative;
    z-index: 2;
    .lid {
      position: absolute;
      top: 0px;
      width: 50%;
      height: 8px;
      background: $box-color;
      transition: transform .45s ease-in-out;
      &.box-left-lid {
        transform-origin: 1px center;
        left: 0px;
      }
      &.box-right-lid {
        transform-origin: 98% center;
        right: 0px;
      }
    }
    .box-icon {
      width: 32px;
      height: 16px;
      background: #b68940;
      position: absolute;
      left: 20%;
      bottom: 10%;
      &::before {
        display: block;
        content: '';
        width: 0px;
        height: 0px;
        position: absolute;
        top: 0%;
        transform: translate(-16%, -100%);
        border: {
          bottom: 16px solid #b68940;
          left: 24px solid transparent;
          top: 16px solid transparent;
          right: 24px solid transparent;
        }
      }
    }
    &.open {
      .box-left-lid {
        transform: rotate($box-lid-open-left-angle);
      }
      .box-right-lid {
        transform: rotate($box-lid-open-right-angle);
      }
    }
  }
  .cat {
    position: absolute;
    width: 112px;
    height: 96px;
    top: 0px;
    transform: translateY($cat-hide-top);
    left: 37px;
    z-index: 1;
    transition: .4s ease-out .1s;
    .cat-head {
      width: 100%;
      height: 100%;
      background-color: #625a6a;
      overflow: hidden;
      position: relative;
      z-index: 1;
      border: {
        top-left-radius: 50% 21px;
        top-right-radius: 50% 21px;
        bottom-left-radius: 50% 32px;
        bottom-right-radius: 50% 32px;
      }
      .cat-head-low {
        background: #fff;
        width: 100%;
        height: 55%;
        position: absolute;
        bottom: 0px;
        left: 0px;
        &::after, &::before {
          content: '';
          position: absolute;
          background: #625A6A;
          width: 100%;
          height: 150%;
          top: -50px;
        }
        &::before {
          border-bottom-right-radius: 40%;
          left: -53%;
        }
        &::after {
          border-bottom-left-radius: 40%;
          right: -53%;
        }
      }
    }
    .cat-face {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      z-index: 2;
      .eye {
        width: 14px;
        height: 12px;
        background: #acde62;
        border-radius: 50%;
        position: absolute;
        top: 48px;
        animation: zhayan infinite 3s;
      }
      .eye-left {
        left: 16px;
      }
      .eye-right {
        right: 16px;
      }
      @keyframes zhayan {
        40% {
          transform: scaleY(1);
        }
        45% {
          transform: scaleY(.1);
        }
        50% {
          transform: scaleY(1);
        }
      }
      .nose {
        width: 16px;
        height: 8px;
        background: #ee8ba4;
        position: absolute;
        left: 50%;
        top: 60px;
        transform: translateX(-50%);
        border-radius: 999px;
        &::after {
          content: '';
          display: block;
          position: absolute;
          width: 8px;
          height: 12px;
          background: #ee8ba4;
          left: 50%;
          transform: translateX(-50%);
          top: 0px;
          border-radius: 999px;
        }
      }
      .huzi {
        width: 40px;
        position: absolute;
        top: 72px;
        &::before, &::after {
          position: absolute;
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          background: #fff;
          box-shadow: 0 1px 0 rgb(98 90 106 / 40%);
        }
        &.huzi-left {
          left: -10px;
          &::before, &::after {
            transform-origin: 98% center;
          }
          &::before {
            transform: rotate(-10deg);
          }
          &::after {
            transform: translateY(3px) rotate(-20deg);
          }
        }
        &.huzi-right {
          right: -10px;
          &::before, &::after {
            transform-origin: 2% center;
          }
          &::before {
            transform: rotate(10deg);
          }
          &::after {
            transform: translateY(3px) rotate(20deg);
          }
        }
      }
      .ear {
        width: 40px;
        height: 64px;
        background: #625a6a;
        position: absolute;
        border-radius: 999px;
        top: 0px;
        z-index: -1;
      }
      .ear-left {
        transform: skewY(20deg);
        left: 0px;
      }
      .ear-right {
        transform: skewY(-20deg);
        right: 0px;
      }
    }
    .cat-body {
      position: absolute;
      z-index: 0;
      width: 152px;
      height: 48px;
      background: #625a6a;
      border-top-left-radius: 50% 100%;
      border-top-right-radius: 20% 100%;
      right: -4px;
      bottom: -20px;
    }
    &.open {
      transform: translateY($cat-float-top);
    }
  }
</style>
