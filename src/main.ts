import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';
import i18n from './plugins/i18n';

loadFonts();

createApp(App)
  .use(i18n)
  .use(vuetify)
  .use(router)
  .mount('#app');
