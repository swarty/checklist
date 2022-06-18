import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// some translation hack
import en from './translation/en';

const store = createPinia();
const app = createApp(App);

app.provide('$t', en);
app.use(store);
app.mount('#app');
