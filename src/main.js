import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "firebase/auth";
import vuetify from "./plugins/vuetify";
import BuyModalComponent from "./components/Shared/BuyModal.vue";

Vue.component("app-buy-modal", BuyModalComponent);
Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADoZnAxdOSXHVHtjZbTvT0DjDkkrVIJEw",
  authDomain: "vue-ads-project-adcb8.firebaseapp.com",
  databaseURL:
    "https://vue-ads-project-adcb8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-ads-project-adcb8",
  storageBucket: "vue-ads-project-adcb8.appspot.com",
  messagingSenderId: "358327740476",
  appId: "1:358327740476:web:33c534677993466ba27b39",
};

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user);
      }
    });
    this.$store.dispatch("fetchAds");
  },
}).$mount("#app");
