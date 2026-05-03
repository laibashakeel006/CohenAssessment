import { createApp } from "vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router";
import api from "./services/api";
import "@/index.css";

library.add(faSearch);

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.component("font-awesome-icon", FontAwesomeIcon);
app.config.globalProperties.$api = api;

app.mount("#app");
