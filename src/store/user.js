import firebase from "firebase/app";
import "firebase/auth";

class User {
  constructor(id) {
    this.id = id;
  }
}

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit("clearError"); // очищаем все ошибки
      commit("setLoading", true); // показываем лоадер на время взаимодействия с сервером
      try {
        const data = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        commit("setUser", new User(data.user.uid));
        commit("setLoading", false); // скрываем лоадер
      } catch (err) {
        commit("setLoading", false); // скрываем лоадер
        commit("setError", err.message); // показываем ошибку
        throw err;
      }
    },
    async loginUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const data = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        commit("setUser", new User(data.user.uid));
        commit("setLoading", false);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.message);
        throw err;
      }
    },
    autoLoginUser({ commit }, payload) {
      commit("setUser", new User(payload.uid));
    },
    logoutUser({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    isUserLoggedIn(state) {
      return state.user !== null;
    },
  },
};
