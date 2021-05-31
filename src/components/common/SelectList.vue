<template>
  <div class="list-wrapper" @click="selectItem($event), submit($event)">
    <h1 class="title">{{title}}</h1>
    <scroll :click="true" :dataArr="list" class="list">
      <li class="list-item" v-for="(item, index) in list" :key="index" :data-index="index">
        <i class="check"></i>
        <p class="content">{{item}}</p>
      </li>
    </scroll>
    <button class="submit" >Submit</button>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll.vue';

export default {
  components: {
    Scroll,
  },
  props: {
    title: {
      type: String,
      default: 'select List',
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    selectType: {
      type: Number,
      default: 0, // 0单选, 1多选
    },
  },
  emits: ['submit'],
  setup(props, context) {
    const selectedItems = new Set();
    // 当是单选的时候，记录上一个选中的节点
    let preNode = null;

    function selectItem(event) {
      const target = event.target.closest('.list-item');
      if (!target) {
        return;
      }
      const { index } = target.dataset;
      if (target.classList.contains('selected')) {
        target.classList.remove('selected');
        selectedItems.delete(index);
        preNode = null;
      } else {
        if (preNode && props.selectType === 0) {
          preNode.classList.remove('selected');
          selectedItems.clear();
        }
        target.classList.add('selected');
        selectedItems.add(index);
        preNode = target;
      }
    }
    function submit(event) {
      const target = event.target.closest('.submit');
      if (!target) {
        return;
      }
      context.emit('submit', Array.from(selectedItems));
    }
    return {
      submit,
      selectItem,
    };
  },
};
</script>
<style lang="scss" scoped>
  @import '~assets/style/mixin.scss';
  .list-wrapper {
    width: 70%;
    height: 60%;
    background: #162740;
    border-radius: 5px;
    padding: 20px 30px;
    position: relative;
    .title {
      font-size: 16px;
      color: white;
      line-height: 20px;
      position: absolute;
      left: 10px;
      top: 0px;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.4);
      padding: 3px;
    }
    .list {
      height: 90%;
      .list-item {
        font-size: 20px;
        color: white;
        display: flex;
        align-items: center;
        line-height: 25px;
        margin-top: 20px;
        i {
          width: 25px;
          height: 25px;
          border: 2px solid white;
          transition: 250ms all ease-in-out;
          box-sizing: border-box;
        }
        p {
          flex: 1;
          @include no-wrap;
          color: #585b57;
          transition: 300ms all ease-in-out;
          margin-left: 10px;
        }
        &.selected {
          i {
            height: 13px;
            border-top-color: transparent;
            border-right-color: transparent;
            transform: rotate(-45deg)
          }
          p {
            color: white;
          }
        }
      }
    }
    .submit {
      height: 10%;
      width: 40%;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: white;
      margin: 0 auto;
      margin-top: 10px;
      display: block;
    }
  }
</style>
