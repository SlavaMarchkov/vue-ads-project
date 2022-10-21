<template>
  <v-container>
    <v-row v-if="!loading && myAds.length !== 0">
      <v-col :offset-md="2" :md="8">
        <h1 class="text--secondary mb-5">My Ads</h1>
        <v-card v-for="ad in myAds" :key="ad.id" class="mb-6">
          <v-row dense>
            <v-col :sm="5" class="py-0">
              <v-img :src="ad.imgSrc" height="162px"></v-img>
            </v-col>
            <v-col :sm="7" class="pe-6">
              <v-card-title>
                {{ ad.title }}
              </v-card-title>
              <v-card-subtitle class="desc">
                <div class="text">
                  {{ ad.description }}
                </div>
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="indigo" class="white--text" :to="'/ad/' + ad.id">
                  Open
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else-if="!loading && myAds.length === 0">
      <v-col :offset-md="2" :md="8">
        <h1 class="text--secondary mb-5">You have no ads yet...</h1>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AdsList",
  computed: {
    myAds() {
      return this.$store.getters.myAds;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<style scoped>
.desc {
  max-width: 430px;
}

.text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
