import { ref } from 'vue';

function funcCart(tabArr) {
  // 切换好友和信息
  const currentPage = ref(tabArr[0]);
  function changeCurrentPage(event) {
    currentPage.value = event;
  }
  return {
    changeCurrentPage,
    currentPage,
  };
}

export default funcCart;
