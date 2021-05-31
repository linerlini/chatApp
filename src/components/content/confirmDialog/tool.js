import { ref } from 'vue';
import { dialogShowType } from 'assets/js/model/constants';

function dialogFunc() {
  const successInfo = ref('');
  const errorInfo = ref('');
  const showType = ref(dialogShowType.HIDDEN);
  const selectInfo = ref('');
  return {
    successInfo,
    errorInfo,
    showType,
    selectInfo,
  };
}
export default dialogFunc;
