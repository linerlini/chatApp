<template>
  <p class="text">
    <span
      v-for="(item, index) in textArr"
      :key="index"
      :style="{animationDelay: `${index / 10}s`}"
    >{{item}}</span>
  </p>
</template>

<script>
import { computed } from 'vue';

export default {
  components: {},
  props: {
    content: {
      type: String,
      default: 'Hello',
    },
  },
  data() {
    return {
    };
  },
  setup(props) {
    const textArr = computed(() => props.content.split(''));
    return {
      textArr,
    };
  },
};
</script>
<style lang="scss" scoped>
  @function float-text-3d($shadow-color: #bbb, $depth: 10, $floating: false) {
    $shadow: ();
    @for $i from 1 to $depth {
      @if ($floating == false and $i > $depth / 2) {
        $shadow-color: transparent;
      }
      $shadow: append($shadow, 0 ($i * 1px) $shadow-color, comma);
    }
    @if ($floating == false) {
      $shadow: append($shadow, 0 10px 10px rgba(0, 0, 0, 0.4), comma);
    } @else {
      $shadow: append($shadow, 0 50px 25px rgba(0, 0, 0, 0.2), comma);
    }
    @return $shadow;
  }
  p {
    font-size: 80px;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    span {
      text-shadow: float-text-3d();
      animation: floating 0.3s infinite alternate ease;
      transform: translateY(20px);
      display: inline-block;
    }
  }
  @keyframes floating {
    to {
      transform: translateY(-20px);
      text-shadow: float-text-3d($floating: true);
    }
  }
</style>
