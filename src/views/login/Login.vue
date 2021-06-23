<template>
  <div class="login-wrapper">
    <div class="login-content" @click="changeStatus($event), handleLoginOrSignup($event)">
      <div class="login" :class="{hidden: status !== LOGIN}">
        <div class="login-form">
          <h2 class="login-title"><span>or</span>Login</h2>
          <div class="inputs">
            <input type="text" class="input" placeholder="Account!" v-model="account">
            <input type="password" class="input" placeholder="password!" v-model="password">
          </div>
          <button class="submit submit-login">Login in</button>
        </div>
      </div>
      <div class="register" :class="{hidden: status !== REGISTER}">
        <div class="register-form">
          <h2 class="register-title"><span>or</span>Register</h2>
          <div class="inputs">
            <input type="text" class="input" placeholder="Account!" v-model="account">
            <input type="password" class="input" placeholder="password!" v-model="password">
            <input type="text" class="input" placeholder="user name!" v-model="name">
          </div>
          <button class="submit submit-signup">Register</button>
        </div>
      </div>
    </div>
    <confirm-dialog
      :show-type="showType"
      :success-info="successInfo"
      :fail-info="errorInfo"
      @dialog-close="closeDialog"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ConfirmDialog from 'components/content/confirmDialog/ConfirmDialog.vue';
import dialogFunc from 'components/content/confirmDialog/tool';
import { dialogShowType } from 'assets/js/model/constants';
import { login, register, loginRefresh } from 'api/loginAndSignup';
import storage from 'assets/js/tools/storage';
import initWebSocket from 'api/socket/initSocket';
import changeLoginOrSignup from './tools/changeLoginOrSignup';

export default {
  components: {
    ConfirmDialog,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    // 切换login还是register模块
    const LOGIN = 0;
    const REGISTER = 1;
    const { status, changeStatus } = changeLoginOrSignup();
    // 处理提醒组件
    const { successInfo, errorInfo, showType } = dialogFunc();
    function closeDialog() {
      showType.value = dialogShowType.HIDDEN;
    }
    // 处理登录和注册
    const account = ref('');
    const password = ref('');
    const name = ref('');
    function loginSuccess({
      token,
      groups,
      applyRecords,
      groupNames,
      word,
    }) {
      // 保存登录的用户信息
      console.log(account.value);
      store.dispatch('loginInit', {
        account: account.value,
        password: password.value,
        name: name.value,
        signature: word,
        token,
        groupNames,
      });
      storage.set('user', {
        name: name.value,
        account: account.value,
        token,
      });
      // 保存用户好友信息
      store.dispatch('friendInfoModule/initFriends', {
        applyFirends: applyRecords,
        groups,
      });
      // 连接websocket
      const ws = initWebSocket(account.value);
      store.commit('setSocket', ws);
      router.push({
        name: 'welcome',
      });
    }
    function loginError() {
      errorInfo.value = '账号不存在或者密码错误';
      showType.value = dialogShowType.ERROR;
    }
    function registerError(message) {
      errorInfo.value = message;
      showType.value = dialogShowType.ERROR;
    }
    async function handleLoginOrSignup(event) {
      const target = event.target.closest('.submit');
      if (!target) {
        return;
      }
      // 判断是否填写完整
      if (
        account.value.length === 0
        || password.value.length === 0
        || (status.value === REGISTER && name.value.length === 0)
      ) {
        showType.value = dialogShowType.ERROR;
        errorInfo.value = 'please input all!';
        return;
      }
      // 判断账号是否正确
      if (Number.isNaN(Number(account.value))) {
        showType.value = dialogShowType.ERROR;
        errorInfo.value = '账号只能是数字';
        return;
      }
      // 登录
      if (status.value === LOGIN) {
        try {
          const result = await login(account.value, password.value);
          if (result.loginStatus) {
            name.value = result.name;
            loginSuccess(result);
          } else {
            loginError();
          }
        } catch (err) {
          console.log(err);
          loginError();
        }
      } else { // 注册
        try {
          const result = await register({
            name: name.value,
            password: password.value,
            account: account.value,
          });
          if (result.registerStatus) {
            loginSuccess(result);
          } else {
            registerError('account already exists');
          }
        } catch (err) {
          console.log(err);
          registerError('register error', err);
        }
      }
    }
    // 检测以前是否登陆过，并且登录信息可用
    function checkUserLoginedBefore() {
      const { token } = store.state;
      if (!token) {
        return;
      }
      loginRefresh()
        .then((res) => {
          name.value = res.name;
          account.value = +res.account;
          loginSuccess(res);
        })
        .catch((err) => {
          if (err.message === 'tokenTimeout') {
            errorInfo.value = '登录信息过期，请重新登录';
          } else {
            errorInfo.value = '登录信息验证失败，请重新登录';
          }
          showType.value = dialogShowType.ERROR;
          storage.remove('user');
        });
    }
    onMounted(checkUserLoginedBefore);
    return {
      // 登录组件和注册组件板块
      status,
      changeStatus,
      LOGIN,
      REGISTER,
      // 登录和注册板块
      account,
      password,
      name,
      handleLoginOrSignup,
      // dialog组件相关
      showType,
      closeDialog,
      successInfo,
      errorInfo,
    };
  },
};

</script>
<style lang="scss" scoped>
  @import '~assets/style/mixin.scss';
  .login-wrapper {
    background: linear-gradient(#141e30,#243b55);
    display: flex;
    align-items: center;
    justify-content: center;
    .login-content {
      width: 350px;
      height: 550px;
      border-radius: 15px;
      overflow: hidden;
      background: url('~public/images/login.jpg') no-repeat top center/cover;
      position: relative;
      .login {
        position: absolute;
        top: 20%;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: #ffffff;
        transition: all .3s ease;
        z-index: 2;
        &::before {
          content: '';
          display: block;
          width: 200%;
          height: 250px;
          border-radius: 50%;
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          background: #ffffff;
        }
        .login-form {
          top: 40%;
          .submit {
            background: #6B92A4;
          }
        }
      }
      [class$="-form"] {
        @include juzhong;
        h2 {
          font-size: 26px;
          color: #000;
          text-align: center;
          margin-top: 23px;
          span {
            font-size: 0px;
            margin-right: 5px;
          }
        }
        .inputs {
          margin-top: 50px;
          border-radius: 15px;
          overflow: hidden;
          border: 1px solid #eee;
          > input {
            outline: none;
            line-height: 30px;
            padding: 10px 15px;
            font-size: 12px;
            border: 0px;
            width: 100%;
            border-bottom: 1px solid #eee;
          }
          > input:last-child {
            border-bottom: none;
          }
        }
        .submit {
          width: 100%;
          margin-top: 15px;
          border-radius: 15px;
          display: block;
          color: rgb(255, 255, 255, 0.7);
          font-weight: bold;
          padding: 15px 0px;
          border: none;
          outline: none;
        }
      }
      .hidden {
        &.login {
          top: 90%;
          .login-form {
            transform: translate(-50%, 0);
            top: -15%;
            h2 {
              font-size: 16px;
              span {
                color: rgba(0, 0, 0, 0.4);
                margin-right: 5px;
                font-size: 16px;
              }
            }
          }
        }
        &.register {
          .register-form {
            top: 5%;
            transform: translate(-50%, 0);
            h2 {
              font-size: 16px;
              span {
                font-size: 16px;
                color: #ffffff;
              }
            }
          }
        }
        .inputs {
          opacity: 0;
        }
      }
      .register-form {
        transition: all .3s ease;
        h2 {
          color: #ffffff;
        }
        .submit {
          background-color: rgb(0,0,0,.4);
        }
      }
    }
  }
</style>
