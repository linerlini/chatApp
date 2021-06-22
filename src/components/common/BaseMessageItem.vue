<template>
  <div class="message">
    <div class="message-avatar">
      <img src="~public/images/usericon.jpg" alt="">
    </div>
    <div class="message-content">
      <div class="title">
        <strong>{{name}}</strong>
        <span>{{formatTimeStr(message.createTime)}}</span>
      </div>
      <div class="message-text">{{message.message}}</div>
    </div>
  </div>
</template>

<script>
import { formatTimeStr } from 'assets/js/tools/timeTool';

export default {
  props: {
    message: {
      type: Object,
      default() {
        return {
          message: 'hello world',
          createTime: new Date(),
        };
      },
    },
    name: {
      type: String,
      default: 'hello',
    },
    // icon: {
    //   type: String,
    //   default: 'public/images/usericon.jpg',
    // },
  },
  setup() {
    return {
      formatTimeStr,
    };
  },
};
</script>

<style lang="scss" scoped>
  .message {
    padding: 6px 16px;
    display: flex;
    .message-avatar {
      margin-right: 8px;
      flex: 0;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
    }
    .message-content {
      flex: 1;
      .title {
        line-height: 18px;
        > strong {
          font-size: 15px;
          color: rgb(51, 51, 51);
          margin-right: 4px;
        }
        > span {
          font-size: 13px;
          color: rgb(204, 204, 204);
        }
      }
      .message-text {
        font-size: 15px;
        color: rgb(51, 51, 51);
        line-height: 22px;
        font-weight: 400;
      }
    }
  }
</style>
