<template>
  <div class="text-center">
    <v-dialog v-model="modal" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="warning me-3" v-bind="attrs" v-on="on"> Edit </v-btn>
      </template>
      <v-card>
        <v-container>
          <v-row no-gutters>
            <v-col>
              <v-card-title>
                <h2 class="text--primary">Edit Ad</h2>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-text-field
                  name="title"
                  label="Ad Title"
                  type="text"
                  v-model.trim="editedTitle"
                  required
                ></v-text-field>
                <v-textarea
                  name="description"
                  label="Ad Description"
                  type="text"
                  v-model.trim="editedDescription"
                  required
                ></v-textarea>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="purple" class="white--text" @click="onCancel">
                  Cancel
                </v-btn>
                <v-btn color="indigo" class="white--text" @click="onSave">
                  Save
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
  name: "EditAdModal",
  props: ["ad"],
  data() {
    return {
      modal: false,
      editedTitle: this.ad.title,
      editedDescription: this.ad.description,
    };
  },
  methods: {
    onCancel() {
      this.editedTitle = this.ad.title;
      this.editedDescription = this.ad.description;
      this.modal = false;
    },
    onSave() {
      if (this.editedTitle !== "" && this.editedDescription !== "") {
        this.$store.dispatch("updateAd", {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id,
        });
        this.modal = false;
      }
    },
  },
};
</script>
