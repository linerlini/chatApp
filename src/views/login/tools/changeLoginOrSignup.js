import { ref } from 'vue';

const LOGIN = 0;
const REGISTER = 1;
export default function changeLoginOrSignup() {
  const status = ref(LOGIN);

  function changeStatus(event) {
    const target = event.target.closest('h2');
    if (!target) {
      return;
    }
    const expectStatu = target.classList.contains('login-title') ? LOGIN : REGISTER;
    status.value = expectStatu;
  }

  return {
    status,
    changeStatus,
  };
}
