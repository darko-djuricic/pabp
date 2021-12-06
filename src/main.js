import { createApp } from 'vue'
import VueSimpleAlert from "vue3-simple-alert";
import axios from 'axios'
import App from './App.vue'



let app=createApp(App)
app.config.globalProperties.$vueSimpleAlert = VueSimpleAlert;
app.config.globalProperties.$axios = axios;
app.mount('#app')

