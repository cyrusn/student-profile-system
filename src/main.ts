import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { apolloClient } from "./apollo";
import { DefaultApolloClient } from "@vue/apollo-composable";
import "./assets/main.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faFile, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import dotenv from "dotenv";
process.env.NODE_ENV === "production"
  ? dotenv.config({ path: ".env.production" })
  : dotenv.config();

library.add(faUser, faFile, faEdit);

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});
app
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount("#app");
