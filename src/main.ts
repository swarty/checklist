import { createApp } from 'vue';
import App from './App.vue';

// some translation hack
import en from './translation/en';

const app = createApp(App);

app.provide('$t', en);
app.mount('#app');
