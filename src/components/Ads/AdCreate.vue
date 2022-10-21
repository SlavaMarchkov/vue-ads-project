<template>
  <v-container>
    <v-row>
      <v-col :offset-sm="3" :sm="6">
        <h1 class="text--secondary mb-3">Create New Ad</h1>
        <v-form ref="form" v-model="valid" validation>
          <v-text-field
            name="title"
            label="Ad Title"
            type="text"
            v-model="title"
            :rules="[(v) => !!v || 'Title is required']"
            required
          ></v-text-field>
          <v-textarea
            name="description"
            label="Ad Description"
            type="text"
            v-model="description"
            :rules="[(v) => !!v || 'Description is required']"
            required
          ></v-textarea>
        </v-form>
      </v-col>
    </v-row>
    <v-row class="mb-3">
      <v-col :offset-sm="3" :sm="6">
        <v-btn class="warning" @click="triggerUpload">
          Upload
          <v-icon right dark> mdi-cloud-upload </v-icon>
        </v-btn>
        <input
          ref="fileInput"
          type="file"
          style="display: none"
          accept="image/*"
          @change="onFileChange"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col :offset-sm="3" :sm="6">
        <img :src="imgSrc" width="200" alt="" v-if="imgSrc" />
      </v-col>
    </v-row>
    <v-row>
      <v-col :offset-sm="3" :sm="6">
        <v-switch v-model="promo" label="Add to Promo?"></v-switch>
      </v-col>
    </v-row>
    <v-row>
      <v-col :offset-sm="3" :sm="6">
        <v-btn
          color="indigo"
          class="white--text float-end"
          large
          :loading="loading"
          @click="createAd"
          :disabled="!valid || !image || loading"
          >Create Ad</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AdCreate",
  data() {
    return {
      title: "",
      description: "",
      promo: false,
      valid: false,
      image: null,
      imgSrc: "",
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image,
        };
        this.$store
          .dispatch("createAd", ad)
          .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {});
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(evt) {
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    },
  },
};
</script>

<style scoped></style>
