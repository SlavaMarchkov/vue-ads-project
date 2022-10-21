<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card v-if="!loading">
          <v-img :src="ad.imgSrc" height="400px"> </v-img>
          <v-card-title>
            <h1 class="text--secondary">{{ ad.title }}</h1>
          </v-card-title>
          <v-card-text class="text--primary">
            {{ ad.description }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-edit-ad-modal :ad="ad" v-if="isOwner"></app-edit-ad-modal>
            <app-buy-modal :ad="ad" v-if="!isOwner"></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div class="pt-10 text-center" v-else>
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditAdModal from "./EditAdModal.vue";

export default {
  name: "AdView",
  props: ["id"],
  computed: {
    ad() {
      const id = this.id;
      return this.$store.getters.adById(id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isOwner() {
      return this.$store.getters.isUserLoggedIn
        ? this.ad.ownerId === this.$store.getters.user.id
        : false;
    },
  },
  components: {
    AppEditAdModal: EditAdModal,
  },
};
</script>

<style scoped></style>
