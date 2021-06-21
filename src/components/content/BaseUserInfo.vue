<template>
  <transition name="guodu" :duration="{ enter: 1000, leave: 400 }">
    <div class="user-info-wrapper" v-show="show" @click.stop="buttonClickHandle">
      <div class="bg-cover"></div>
      <div class="info">
        <div class="content">
          <h1 class="user-name">{{userInfo.name}}</h1>
          <p class="user-signature">{{userInfo.signature}}</p>
        </div>
        <div class="button"><button>{{buttonText}}</button></div>
      </div>
      <div class="icon"></div>
    </div>
  </transition>
</template>

<script>
import Friend from 'assets/js/model/friendInfo';

export default {
  components: {
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: Object,
      default() {
        return Friend.createNewFriend();
      },
    },
    buttonText: {
      type: String,
      default: 'ADD',
    },
  },
  emits: ['button-click'],
  setup(props, context) {
    const buttonClickHandle = function clickHandle(event) {
      const target = event.target.closest('.button');
      if (!target) {
        return;
      }
      context.emit('button-click');
    };
    return {
      buttonClickHandle,
    };
  },
};
</script>
<style lang="scss" scoped>
  @import '~assets/style/mixin.scss';
  .user-info-wrapper {
    width: 290px;
    height: 375px;
    position: relative;
    background: #fff;
    overflow: hidden;
    transform-origin: center center;
    transition: 800ms ease-in-out;
    .icon {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 5px solid #fff;
      position: absolute;
      top: calc(40% - 50px);
      left: calc(50% - 50px);
      overflow: hidden;
      z-index: 2;
      background: url('~public/images/usericon.jpg') no-repeat center center/cover;
      transition: 500ms ease-in-out;
      transition-delay: 200ms;
      transform: translateY(0px);
    }
    .info {
      width: 100%;
      height: 60%;
      background: #fff;
      position: absolute;
      z-index: 1;
      bottom: 0px;
      text-align: center;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .content {
        flex: 0 0 65%;
        padding-top: 70px;
      }
      [class^='user'] {
        transition: 700ms ease-in-out;
        padding: 0 10px;
      }
      .user-name {
        font-size: 26px;
        font-weight: bold;
        transition-delay: 350ms;
        margin-bottom: 10px;
        @include no-wrap;
      }
      .user-signature {
        font-size: 16px;
        color: #999;
        transition-delay: 450ms;
        @include no-wrap;
      }
    }
    .button {
      border-top: 1px solid #EAEAEA;
      padding-top: 15px;
      transform-origin: top center;
      transition: 800ms ease-in-out;
      transition-delay: 600ms;
      button {
        width: 70%;
        height: 40px;
        outline: none;
        border: none;
        border-radius: 5px;
        background: #E73D4B;
        color: #fff;
      }
    }
    .bg-cover {
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: url('~public/images/login.jpg') center center/cover no-repeat;
      left: calc(50% - 250px);
      position: absolute;
      transform: translateY(-100px);
      transition: .8s ease-in-out;
      transition-delay: 200ms;
      transform-origin: center center;
    }
  }
  .guodu-enter-from {
    transform: scaleY(0);
    .bg-cover {
      transform: translateY(60px) scale(0);
      opacity: 0;
    }
    .icon {
      transform: translateY(500px);
      opacity: 0;
    }
    .info {
      [class^='user'] {
        opacity: 0;
        transform: translateY(100px);
      }
      .button {
        transform: scaleX(0);
      }
    }
  }
  .guodu-leave-to {
    transform: scaleY(0);
  }
  .guodu-leave-active {
    transition: 400ms all ease-in-out;
  }
</style>
