<template>
  <div v-if="!loading">
    <v-container fluid v-if="promoAds.length">
      <v-carousel>
        <v-carousel-item v-for="ad in promoAds" :key="ad.id" :src="ad.imgSrc">
          <div class="car-link">
            <v-btn class="error" :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-container>
    <v-container v-if="ads.length">
      <v-row>
        <v-col v-for="ad of ads" :key="ad.id" :sm="6" :md="6" :lg="4">
          <v-card>
            <v-img
              class="white--text align-end"
              height="200px"
              :src="ad.imgSrc"
            >
            </v-img>
            <v-card-title>{{ ad.title }}</v-card-title>
            <v-card-text class="text--primary">
              {{ ad.description }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange" text :to="'/ad/' + ad.id"> Open </v-btn>
              <app-buy-modal :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-col class="pt-10 text-center">
          <h3 class="text-secondary">Объявлений пока нет...</h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-row>
        <v-col class="pt-10 text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AppHome",
  computed: {
    promoAds() {
      return this.$store.getters.promoAds;
    },
    ads() {
      return this.$store.getters.ads;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<style scoped>
.car-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, 0.3);
  transform: translate(-50%, 0);
  padding: 10px 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
