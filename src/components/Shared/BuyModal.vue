<template>
  <div class="text-center">
    <v-dialog v-model="modal" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="white--text" color="indigo" v-bind="attrs" v-on="on">
          Buy
        </v-btn>
      </template>
      <v-card>
        <v-container>
          <v-row no-gutters>
            <v-col>
              <v-card-title>
                <h2 class="text--primary">Do You Want To Buy It?</h2>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-text-field
                  name="name"
                  label="Your Name"
                  type="text"
                  v-model.trim="name"
                  required
                ></v-text-field>
                <v-text-field
                  name="phone"
                  label="Your Phone"
                  type="text"
                  v-model.trim="phone"
                  required
                ></v-text-field>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="purple"
                  class="white--text"
                  @click="onCancel"
                  :disabled="localLoading"
                >
                  Close
                </v-btn>
                <v-btn
                  color="indigo"
                  class="white--text"
                  @click="onSave"
                  :disabled="localLoading"
                  :loading="localLoading"
                >
                  Buy It!
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "BuyModal",
  props: ["ad"],
  data() {
    return {
      modal: false,
      name: "",
      phone: "",
      localLoading: false,
    };
  },
  methods: {
    onCancel() {
      this.name = "";
      this.phone = "";
      this.modal = false;
    },
    onSave() {
      if (this.name !== "" && this.phone !== "") {
        this.localLoading = true;
        this.$store
          .dispatch("createOrder", {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerId,
          })
          .finally(() => {
            this.name = "";
            this.phone = "";
            this.localLoading = false;
            this.modal = false;
          });
      }
    },
  },
};
</script>
