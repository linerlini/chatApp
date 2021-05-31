import { createApp } from 'vue';
import 'normalize.css';
import 'assets/style/index.scss';
import 'public/fonts/iconfont';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).mount('#app');
