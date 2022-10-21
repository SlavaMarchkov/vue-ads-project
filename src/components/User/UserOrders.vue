<template>
  <v-container>
    <v-row v-if="loading">
      <v-col class="pt-10 text-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else-if="!loading && orders.length !== 0">
      <v-col :offset-sm="3" :sm="6">
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list two-line flat>
          <v-list-item-group v-for="order in orders" :key="order.id">
            <v-list-item>
              <template>
                <v-list-item-action>
                  <v-checkbox
                    :input-value="order.done"
                    :readonly="order.done"
                    color="indigo"
                    @change="markDone(order)"
                  ></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ order.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-btn :to="'/ad/' + order.adId" class="indigo white--text"
                  >Open</v-btn
                >
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col :offset-sm="3" :sm="6">
        <h1 class="text--secondary mb-3">You Have No Orders Yet...</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserOrders",
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    orders() {
      return this.$store.getters.orders;
    },
  },
  methods: {
    markDone(order) {
      this.$store
        .dispatch("markOrderDone", order.id)
        .then(() => {
          order.done = true;
        })
        .catch(() => {});
    },
  },
  created() {
    this.$store.dispatch("fetchOrders");
  },
};
</script>

<style scoped></style>
