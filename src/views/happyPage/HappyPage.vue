<template>
  <div class="page-wrapper">
    <like3-d-text class="title1" :content="'happy!'" :class="{show:open}"/>
    <like3-d-text class="title2" :content="'everyday'" :class="{show:open}"/>
    <cat-in-box class="cat-box" @box-open-close="boxHandle" :open="open"/>
    <div class="next-page" @click="$router.push('/friends')">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tiaoguo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import Like3DText from 'components/common/Like3DText.vue';
import CatInBox from 'components/common/CatInBox.vue';
import { ref } from 'vue';

export default {
  components: {
    Like3DText,
    CatInBox,
  },
  setup() {
    const open = ref(false);
    function boxHandle(status) {
      open.value = status;
    }
    return {
      open,
      boxHandle,
    };
  },
};
</script>
<style lang="scss" scoped>
  .page-wrapper {
    background: #e0c9a5;
    position: relative;
    .title1, .title2 {
      opacity: 0;
      transition: all .4s ease-out;
    }
    .title1 {
      margin-top: 100px;
      margin-bottom: 30px;
    }
    .show {
      opacity: 1;
    }
    .cat-box {
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
    }
    .next-page {
      font-size: 20px;
      color: #fff;
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
