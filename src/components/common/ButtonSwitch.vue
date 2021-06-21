<template>
  <div class="more-wrapper inActive">
    <div class="funcs" @click="clickHandle($event)">
      <div class="more-icon func-item" data-func="more">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo"></use>
        </svg>
      </div>
      <div class="find-icon func-item" data-func="find" :class="{visiable: active}">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-find"></use>
        </svg>
      </div>
      <div class="friends-icon func-item" data-func="friend" :class="{visiable: active}">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-friend"></use>
        </svg>
      </div>
      <div class="user-info-icon func-item" data-func="user" :class="{visiable: active}">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-find1"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { funcName } from '@/config';

export default {
  emit: ['button-click'],
  setup(props, context) {
    const active = ref(false);
    function clickHandle(event) {
      const target = event.target.closest('.func-item');
      if (!target) {
        return;
      }
      const pageName = target.dataset.func;
      switch (pageName) {
        case 'more':
          active.value = !active.value;
          break;
        case 'find':
          context.emit('button-click', funcName.ADD_FRIEND_PAGE);
          break;
        case 'friend':
          context.emit('button-click', funcName.ALL_FRIEND_PAGE);
          break;
        default:
          console.log('user');
      }
    }
    return {
      active,
      clickHandle,
    };
  },
};
</script>
<style lang="scss" scoped>
  .more-wrapper {
    position: relative;
    border-radius: 50%;
    .funcs {
      > [class*='icon'] {
        width: 30px;
        height: 30px;
        background:
          linear-gradient(-45deg, #183850 0, #183850 25%, #192C46 50%, #22254C 75%, #22254C 100%);
        border-radius: 50%;
        line-height: 30px;
        text-align: center;
        color: #CFEBF7;
        font-size: 16px;
        opacity: .6;
      }
      .more-icon ~ div {
        position: absolute;
        transition: .4s ease-in-out all;
        opacity: 0;
        left: 0px;
        top: 0px;
        transform: scale(.1);
        z-index: -1;
      }
      div.visiable {
        opacity: .6;
        z-index: 1;
        &.find-icon {
          transform: translate(-120%,0px);
        }
        &.friends-icon {
          transform: translate(-110%, -110%);
        }
        &.user-info-icon {
          transform: translate(0px,-120%);
        }
      }
    }
  }
</style>
