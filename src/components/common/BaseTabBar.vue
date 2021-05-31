<template>
  <div class="tabbar-wrapper" @click.stop="changeCurrentIndex($event)">
    <div class="border-bottom" :style="{transform: borderOffset, width: borderWidth}"></div>
    <div class="tabbar-item"
      v-for="(item, index) in tabArr"
      :key="item"
      :data-index="index"
    >
      <slot :name="item"></slot>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  components: {},
  props: {
    tabArr: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props, context) {
    const currentIndex = ref(0);
    const borderWidth = computed(() => `${100 / props.tabArr.length}%`);
    const borderOffset = computed(() => `translateX(${currentIndex.value * 100}%)`);
    function changeCurrentIndex(event) {
      const target = event.target.closest('.tabbar-item');
      if (!target) {
        return;
      }
      const { index } = target.dataset;
      currentIndex.value = Number(index);
      context.emit('current-tab-change', props.tabArr[index]);
    }
    return {
      borderOffset,
      borderWidth,
      changeCurrentIndex,
    };
  },
  emits: ['current-tab-change'],
};
</script>
<style lang="scss" scoped>
  .tabbar-wrapper {
    background: #FFFFFF;
    display: flex;
    height: 70px;
    position: relative;
    .tabbar-item {
      flex: 1;
    }
    .border-bottom {
      height: 3px;
      position: absolute;
      bottom: 0px;
      left: 0px;
      background: #5D9CEC;
      transition: 250ms all ease-out;
    }
  }
</style>
