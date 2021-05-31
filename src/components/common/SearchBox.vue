<template>
  <div class="search-wrapper" :class="{active:searchBoxActive}">
    <button class="search-btn" @click="btnClickHandle"></button>
    <input
      type="text"
      class="input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const searchBoxActive = ref(false);
    function btnClickHandle() {
      if (props.modelValue) {
        context.emit('update:modelValue', '');
        return;
      }
      searchBoxActive.value = !searchBoxActive.value;
    }
    return {
      searchBoxActive,
      btnClickHandle,
    };
  },
  emits: ['update:modelValue'],
};
</script>
<style lang="scss" scoped>
  $input-height: 30px;
  $input-width: 250px;
  $input-border-width: 4px;
  .search-wrapper {
    position: relative;
    width: $input-width;
    input {
      width: $input-height;
      height: $input-height;
      border: $input-border-width solid #BBC6CE;
      border-radius: 50%;
      background: transparent;
      transform-origin: right;
      outline: none;
      transition: transform 0.4s ease-in-out, border-radius .8s ease-in-out, width .4s ease-in-out,
        padding .4s ease-in-out;
      transition-delay: 250ms;
      transform: translateX($input-width - $input-height);
      font-size: 14px;
      color: #5D9CEC;
    }
    button {
      width: $input-height;
      height: $input-height;
      outline: none;
      border: none;
      background: transparent;
      position: absolute;
      z-index: 1;
      right: 0px;
      top: 0px;
      &::before, &::after {
        width: 15px;
        height: $input-border-width;
        background: #BBC6CE;
        content: '';
        transform-origin: center center;
        transition: 0.25s ease-in-out, border-radius 0.8s ease-in-out;
        position: absolute;
        left: calc(50% - 7px);
        top: calc(50% - 2px);
      }
      &::before {
        transform: rotate(45deg) translateX(24px);
      }
      &::after {
        transform: rotate(-45deg);
        opacity: 0;
      }
    }
    &.active {
      button {
        &::before {
          transform: rotate(45deg) translateX(0);
        }
        &::after {
          opacity: 1;
        }
      }
      input {
        border-radius: 5px;
        width: 250px;
        padding: 0 $input-height 0 10px;
        transform: translateX(0);
      }
    }
  }
</style>
