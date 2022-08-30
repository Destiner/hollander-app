import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import App from './App.vue';
import Home from './pages/Home.vue';
import NewAuction from './pages/NewAuction.vue';

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/auction/new', name: 'auction-new', component: NewAuction },
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');

export { routerHistory, router };
