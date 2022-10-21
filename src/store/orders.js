import firebase from "firebase";
import "firebase/database";

class Order {
  constructor(name, phone, adId, done = false, id = null) {
    this.name = name;
    this.phone = phone;
    this.adId = adId;
    this.done = done;
    this.id = id;
  }
}
export default {
  state: {
    orders: [],
  },
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload;
    },
  },
  actions: {
    async createOrder({ commit }, { name, phone, adId, ownerId }) {
      const order = new Order(name, phone, adId);
      commit("clearError");
      try {
        await firebase.database().ref(`/users/${ownerId}/orders`).push(order);
      } catch (err) {
        commit("setError", err.message);
        throw err;
      }
    },
    async fetchOrders({ commit, getters }) {
      commit("clearError");
      commit("setLoading", true);

      const resultOrders = [];

      try {
        const orders = await (
          await firebase
            .database()
            .ref(`/users/${getters.user.id}/orders`)
            .once("value")
        ).val();
        Object.keys(orders).forEach((key) => {
          const order = orders[key];
          resultOrders.push(
            new Order(order.name, order.phone, order.adId, order.done, key)
          );
        });
        commit("loadOrders", resultOrders);
        commit("setLoading", false);
      } catch (err) {
        commit("setError", err.message);
        commit("setLoading", false);
        throw err;
      }
    },
    async markOrderDone({ commit, getters }, payload) {
      commit("clearError");
      try {
        await firebase
          .database()
          .ref(`/users/${getters.user.id}/orders`)
          .child(payload)
          .update({
            done: true,
          });
      } catch (err) {
        commit("setError", err.message);
        throw err;
      }
    },
  },
  getters: {
    newOrders(state) {
      return state.orders.filter((o) => !o.done);
    },
    doneOrders(state) {
      return state.orders.filter((o) => o.done);
    },
    orders(state, getters) {
      return getters.newOrders.concat(getters.doneOrders);
    },
  },
};
