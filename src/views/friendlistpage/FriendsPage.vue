<template>
  <div class="friend-page-wrapper">
    <star-space/>
    <div class="planets">
      <planet-with-star-ring class="planet-with-star-ring"/>
      <planet-with-star-ring class="planet-with-star-ring"/>
      <planet-with-star-ring class="planet-with-star-ring"/>
      <planet-with-star-ring class="planet-with-star-ring"/>
      <planet-with-star-ring class="planet-with-star-ring"/>
    </div>
    <current-page
      :show-func-page="showFuncPage"
      :current-func-page="currentFuncPage"
      @hidden-func-page="hiddenFuncPage"
    ></current-page>
    <button-switch class="func-buttons" @button-click="changeFuncPageShow"/>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import StarSpace from 'components/common/StarSpace.vue';
import PlanetWithStarRing from 'components/common/planet/PlantWithStarRing.vue';
import ButtonSwitch from 'components/common/ButtonSwitch.vue';
import { funcName } from 'assets/js/model/constants';
import CurrentPage from './children/CurrentPage.vue';

export default {
  components: {
    StarSpace,
    PlanetWithStarRing,
    ButtonSwitch,
    CurrentPage,
  },
  setup() {
    const store = useStore();
    const currentFuncPage = ref(funcName.ALL_FRIEND_PAGE);
    const showFuncPage = ref(false);

    function changeFuncPageShow(pageName) {
      showFuncPage.value = true;
      currentFuncPage.value = pageName;
    }
    function hiddenFuncPage() {
      showFuncPage.value = false;
    }
    // 聊天相关
    let temPoraryClose = false;
    watch(() => store.state.friendChatModule.isShowChatCard, (value) => {
      if (value) {
        temPoraryClose = showFuncPage.value;
        hiddenFuncPage();
        return;
      }
      if (temPoraryClose) {
        showFuncPage.value = true;
      }
    });
    return {
      showFuncPage,
      currentFuncPage,
      changeFuncPageShow,
      hiddenFuncPage,
    };
  },
};
</script>
<style lang="scss" scoped>
  .friend-page-wrapper {
    background: linear-gradient(to bottom, #2c5364,#203a43,#002142);
    position: relative;
    .planet-with-star-ring {
      position: absolute;
      transform: scale(0.8);
      &:nth-child(1) {
        top: 7%;
        left: 53%;
      }
      &:nth-child(2) {
        top: 70%;
        left: 11%;
      }
      &:nth-child(3) {
        top: 49%;
        left: 67%;
      }
      &:nth-child(4) {
        top: 30%;
        left: 20%;
      }
      &:nth-child(5) {
        top: 76%;
        left: 57%;
      }
    }
    .func-buttons {
      position: fixed;
      right: 10px;
      bottom: 10px;
    }
  }
</style>
