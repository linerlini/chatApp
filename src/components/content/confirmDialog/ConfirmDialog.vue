<template>
  <dialogs v-show="showType" @bg-cover-click="closeDialog(true)">
    <div class="success-box box" v-show="showType === 1" @click="closeDialog($event)">
      <div class="face">
        <div class="eye-left"></div>
        <div class="eye-right"></div>
        <div class="mouth happy"></div>
      </div>
      <div class="face-shadow"></div>
      <h1>SUCCESS!</h1>
      <p>{{successInfo}}</p>
      <button class="submit">CONTINUE</button>
    </div>
    <div class="error-box box" v-show="showType === 2" @click="closeDialog($event)">
      <div class="face">
        <div class="eye-left"></div>
        <div class="eye-right"></div>
        <div class="mouth sad"></div>
      </div>
      <div class="face-shadow"></div>
      <h1>ERROR!</h1>
      <p>{{failInfo}}</p>
      <button class="submit">TRY AGAIN</button>
    </div>
    <div class="select-box box" v-show="showType === 3" @click="closeDialog($event)">
      <div class="face">
        <div class="eye-left"></div>
        <div class="eye-right"></div>
        <div class="mouth sad"></div>
      </div>
      <div class="face-shadow"></div>
      <h1>SELECT!</h1>
      <p>{{selectInfo}}</p>
      <button class="submit yes">YES</button>
      <button class="submit no">NO</button>
    </div>
  </dialogs>
</template>

<script>
import Dialogs from '../../common/Dialog.vue';

export default {
  components: {
    Dialogs,
  },
  props: {
    successInfo: {
      type: String,
      default: 'thank!',
    },
    failInfo: {
      type: String,
      default: 'sorry',
    },
    selectInfo: {
      type: String,
      default: 'are you sure?',
    },
    showType: {
      type: Number,
      default: 0, // 0不显示组件， 1显示成功提醒， 2显示错误提醒, 3显示选择，
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
  emits: ['dialog-close', 'submit-yes', 'submit-no'],
  setup(props, context) {
    // 控制dialog的关闭和打开
    function closeDialog(event) {
      if (event === true) {
        context.emit('dialog-close');
        return;
      }
      const target = event.target.closest('.submit');
      if (!target) {
        return;
      }
      // 如果是选择框，则触发接受或者拒绝事件
      if (props.showType === 3) {
        if (target.classList.contains('yes')) {
          context.emit('submit-yes');
        } else {
          context.emit('submit-no');
        }
      }
      context.emit('dialog-close');
    }
    return { closeDialog };
  },
};
</script>
<style lang="scss" scoped>
  @import '~assets/style/mixin.scss';
  .box {
    width: 245px;
    height: 250px;
    border-radius: 20px;
    overflow: hidden;
    @include juzhong;
    .face {
      width: 22%;
      height: 22%;
      border-radius: 50%;
      background: #FCFCFC;
      border: 1px solid #777777;
      margin: 40px auto;
      margin-bottom: 0px;
      position: relative;
      [class^='eye'] {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #777777;
        top: 40%;
        position: absolute;
      }
      .eye-left {
        left: 20%;
      }
      .eye-right {
        left: 68%;
      }
      .mouth {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        border: 2px solid;
        top: 43%;
        left: 41%;
        position: absolute;
        transform: rotate(45deg);
        &.happy {
          border-color: transparent #777777 #777777 transparent;
        }
        &.sad {
          border-color: #777777 transparent transparent #777777;
          top: 49%;
        }
      }
    }
    .face-shadow {
      width: 21%;
      height: 3%;
      border-radius: 50%;
      background: #777777;
      opacity: .5;
      margin: 0 auto;
      position: relative;
      z-index: -1;
      top: -3px;
    }
    h1 {
      color: #fff;
      font-size: 16px;
      letter-spacing: 5px;
      font-weight: 700;
      margin: 20px 0 10px 0;
      text-align: center;
    }
    p {
      font-size: 14px;
      color: #5e5e5e;
      text-align: center;
      margin-bottom: 10px;
    }
    .submit {
      width: 50%;
      height: 15%;
      background: #FCFCFC;
      border-radius: 999px;
      box-shadow: 2px 2px 10px rgb(119 119 119 / 50%);
      outline: none;
      border: none;
      display: block;
      margin: 0 auto;
    }
    &.success-box {
      background: linear-gradient(to bottom right, #B0DB7D 40%, #99DBB4 100%);
      .submit {
        color: #4ec07d;
      }
      .face {
        animation: jump-face 1s ease-in infinite;
      }
      .face-shadow {
        animation: face-shadow-scale 1s ease-in infinite;
      }
    }
    &.error-box {
      background: linear-gradient(to bottom left, #EF8D9C 40%, #FFC39E 100%);
      .submit {
        color: #e96075;
      }
      .face {
        animation: roll 3s ease-in-out infinite;
      }
      .face-shadow {
        animation: move 3s ease-in-out infinite;
      }
    }
    &.select-box {
      background: linear-gradient(to bottom right, #B0DB7D 40%, #99DBB4 100%);
      text-align: center;
      .submit {
        color: #4ec07d;
        width: 30%;
        display: inline-block;
        margin: 0 10px;
      }
      .face {
        animation: jump-face 1s ease-in infinite;
      }
      .face-shadow {
        animation: face-shadow-scale 1s ease-in infinite;
      }
    }
    @keyframes jump-face {
      50% {
        transform: translateY(-10px);
      }
    }
    @keyframes face-shadow-scale {
      50% {
        transform: scale(0.9)
      }
    }
    @keyframes roll {
      0% {
        transform: translateX(-40px) rotate(0deg);
      }
      50% {
        transform: translateX(40px) rotate(168deg);
      }
      100% {
        transform: translateX(-40px) rotate(0deg);
      }
    }
    @keyframes move {
      0% {
        transform: translateX(-40px);
      }
      50% {
        transform: translateX(40px);
      }
      100% {
        transform: translateX(-40px);
      }
    }
  }
</style>
