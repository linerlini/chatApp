<template>
  <div class="wrapper" ref="wrapper" :class="{x: scrollX, y: scrollY}">
    <div class="content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import Pullup from '@better-scroll/pull-up';

BScroll.use(Pullup);
BScroll.use(Slide);
export default {
  props: {
    scrollDirection: {
      type: Number,
      default: 0,
    },
    probeType: {
      type: Number,
      default: 1,
    },
    click: {
      type: Boolean,
      default: false,
    },
    isListenScroll: {
      type: Boolean,
      default: false,
    },
    slide: {
      type: Boolean,
      default: false,
    },
    slideOptions: {
      type: [Object, Boolean],
      default() {
        return true;
      },
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    dataArr: {
      type: [Array, Object],
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  computed: {
    scrollX() {
      return this.scrollDirection === 1;
    },
    scrollY() {
      return this.scrollDirection === 0;
    },
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
      this.$emit('mounted');
    }, 20);
  },
  methods: {
    refresh() {
      this.$nextTick(() => {
        if (this.scroll) {
          this.scroll.refresh();
        }
      });
    },
    pausePlay() {
      return (this.scroll && this.slide) && this.scroll.pausePlay();
    },
    startPlay() {
      return (this.scroll && this.slide) && this.scroll.startPlay();
    },
    scrollToElement(...rest) {
      return this.scroll && this.scroll.scrollToElement.call(this.scroll, ...rest);
    },
    finishPullUp() {
      return this.scroll && this.scroll.finishPullUp();
    },
    _initScroll() {
      let scrollOptions = {
        scrollX: this.scrollX,
        scrollY: this.scrollY,
        probeType: this.probeType,
        click: this.click,
      };
      // 添加轮播图所需配置
      if (this.slide) {
        scrollOptions = Object.assign(scrollOptions, {
          slide: this.slideOptions,
          bounce: false,
        });
      }
      if (this.pullUpLoad) {
        scrollOptions = Object.assign(scrollOptions, {
          pullUpLoad: this.pullUpLoad,
        });
      }
      this.scroll = new BScroll(this.$refs.wrapper, scrollOptions);
      // 添加轮播图功能
      if (this.slide) {
        this.scroll.on('slideWillChange', (page) => {
          this.$emit('slide-will-change', page);
        });
      }
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp');
        });
      }
      // 处理滚动
      if (this.isListenScroll) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position);
        });
      }
    },
  },
  watch: {
    dataArr() {
      this.refresh();
    },
  },
  emits: ['mounted', 'slideWillChange', 'scroll', 'pullingUp'],
};
</script>
<style lang="scss" scoped>
  .wrapper {
    overflow: hidden;
    position: relative;
    &.x {
      white-space: nowrap;
      > .content {
        display: inline-block;
      }
    }
  }
</style>
