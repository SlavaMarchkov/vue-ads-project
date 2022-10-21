<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="link in links" :key="link.title" :to="link.url">
            <v-list-item-icon>
              <v-icon v-text="link.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="link.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="onLogout" v-if="isUserLoggedIn">
            <v-list-item-icon>
              <v-icon v-text="'mdi-logout'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'Logout'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark color="indigo" app>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" custom v-slot="{ navigate }">
          <span
            @click="navigate"
            @keypress.enter="navigate"
            role="link"
            class="pointer"
            >Classified Ads</span
          >
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-for="link in links" :key="link.url" :to="link.url">
          <v-icon left>
            {{ link.icon }}
          </v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn text @click="onLogout" v-if="isUserLoggedIn">
          <v-icon left> mdi-logout </v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <template v-if="error">
      <v-snackbar
        centered
        elevation="10"
        :timeout="5000"
        :multi-line="true"
        :value="true"
        @input="closeError"
      >
        {{ error }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="closeError">
            Закрыть
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          {
            title: "Orders",
            icon: "mdi-basket",
            url: "/orders",
          },
          {
            title: "New ad",
            icon: "mdi-file-plus",
            url: "/new",
          },
          {
            title: "My ads",
            icon: "mdi-view-list",
            url: "/list",
          },
        ];
      } else {
        return [
          {
            title: "Login",
            icon: "mdi-login",
            url: "/login",
          },
          {
            title: "Registration",
            icon: "mdi-account-plus",
            url: "/registration",
          },
        ];
      }
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
