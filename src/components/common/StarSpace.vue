<template>
  <canvas
    ref="canvas"
    class="huabu"
    @mousemove="mouseMoveHandle"
    @touchmove.prevent="touchMoveHandle"
    @touchend="mouseLeaveHandle"
  ></canvas>
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
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
  setup() {
    const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;
    const STAR_SIZE = 3;
    const STAR_MIN_SCALE = 0.2;
    const OVERFLOW_THRESHOLD = 50;
    const canvas = ref(null);
    let context = null;
    let deviceScale = 1;
    let canvasWidth;
    let canvasHeight;
    const stars = [];
    let pointerX;
    let pointerY;
    const velocity = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      z: 0.001,
    };
    let touchInput = false;

    function generate() {
      for (let i = 0; i < STAR_COUNT; i += 1) {
        stars.push({
          x: 0,
          y: 0,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
      }
    }
    function placeStar(starObj) {
      const star = starObj;
      star.x = Math.random() * canvasWidth;
      star.y = Math.random() * canvasHeight;
    }
    function resize() {
      deviceScale = window.devicePixelRatio || 1;
      canvasWidth = window.innerWidth * deviceScale;
      canvasHeight = window.innerHeight * deviceScale;
      canvas.value.width = canvasWidth;
      canvas.value.height = canvasHeight;
      stars.forEach(placeStar);
    }
    function recycleStar(starObj) {
      const star = starObj;
      let direction = 'z';
      const vx = Math.abs(velocity.x);
      const vy = Math.abs(velocity.y);
      if (vx > 1 || vy > 1) {
        let axis;
        if (vx > vy) {
          axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
        } else {
          axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
        }
        if (axis === 'h') {
          direction = velocity.x > 0 ? 'l' : 'r';
        } else {
          direction = velocity.y > 0 ? 't' : 'b';
        }
      }
      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
      if (direction === 'z') {
        star.z = 0.1;
        star.x = Math.random() * canvasWidth;
        star.y = Math.random() * canvasHeight;
      } else
      if (direction === 'l') {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = canvasHeight * Math.random();
      } else
      if (direction === 'r') {
        star.x = canvasWidth + OVERFLOW_THRESHOLD;
        star.y = canvasHeight * Math.random();
      } else
      if (direction === 't') {
        star.x = canvasWidth * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
      } else
      if (direction === 'b') {
        star.x = canvasWidth * Math.random();
        star.y = canvasHeight + OVERFLOW_THRESHOLD;
      }
    }
    function update() {
      velocity.tx *= 0.96;
      velocity.ty *= 0.96;
      velocity.x += (velocity.tx - velocity.x) * 0.8;
      velocity.y += (velocity.ty - velocity.y) * 0.8;
      stars.forEach((starItem) => {
        const star = starItem;
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;
        star.x += (star.x - canvasWidth / 2) * velocity.z * star.z;
        star.y += (star.y - canvasHeight / 2) * velocity.z * star.z;
        star.z += velocity.z;
        // recycle when out of bounds
        if (
          star.x < -OVERFLOW_THRESHOLD
          || star.x > canvasWidth + OVERFLOW_THRESHOLD
          || star.y < -OVERFLOW_THRESHOLD
          || star.y > canvasHeight + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      });
    }
    function render() {
      stars.forEach((star) => {
        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth = STAR_SIZE * star.z * deviceScale;
        context.strokeStyle = `rgba(255,255,255,${0.5 + 0.5 * Math.random()})`;
        context.moveTo(star.x, star.y);
        let tailX = velocity.x * 2;
        let tailY = velocity.y * 2;
        // stroke() wont work on an invisible line
        if (Math.abs(tailX) < 0.1) {
          tailX = 0.5;
        }
        if (Math.abs(tailY) < 0.1) {
          tailY = 0.5;
        }
        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
      });
    }
    function step() {
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      update();
      render();
      requestAnimationFrame(step);
    }
    function movePointer(x, y) {
      if (typeof pointerX === 'number' && typeof pointerY === 'number') {
        const ox = x - pointerX;
        const oy = y - pointerY;
        velocity.tx += (ox / 8) * deviceScale * (touchInput ? 1 : -1);
        velocity.ty += (oy / 8) * deviceScale * (touchInput ? 1 : -1);
      }
      pointerX = x;
      pointerY = y;
    }
    function mouseMoveHandle(event) {
      touchInput = false;
      movePointer(event.clientX, event.clientY);
    }
    function touchMoveHandle(event) {
      touchInput = true;
      movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
    }
    function mouseLeaveHandle() {
      pointerX = null;
      pointerY = null;
    }
    onMounted(() => {
      context = canvas.value.getContext('2d');
      generate();
      resize();
      step();
      window.onresize = resize;
    });
    return {
      canvas,
      mouseMoveHandle,
      mouseLeaveHandle,
      touchMoveHandle,
    };
  },
};
</script>
<style lang="scss" scoped>
  .huabu {
    width: 100%;
    height: 100%;
  }
</style>
