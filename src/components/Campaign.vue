<template>
    <v-container fluid pt-10 class="d-flex align-center justify-center">
      <v-card  fluid width="700px" min-width="700px">
        <v-data-table :headers="headers" :items="rows" sort-by="last_name" class="elevation-1 mytable" >
          <template v-slot:top>
            <v-toolbar flat >
              <v-toolbar-title>Campaigns</v-toolbar-title>
              <v-divider class="mx-4" inset vertical ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px" >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" >
                    New Campaign
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
  
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4" >
                          <v-text-field outlined v-model="editedItem.first_name" label="First Name" ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" >
                          <v-text-field outlined v-model="editedItem.last_name" label="Last Name" ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
  
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close" >
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save" >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)" >
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)" >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card> 
  
  </v-container>
  
  </template>
  
  <script> 
    import { CampaignService } from '../services/campaign.service.js'
    import { mapActions, mapState } from 'vuex'
    // import { store } from '../_store'

    export default {
        data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
              { text: "Campaign Id", value: "campaign_id", width:"20%" },
              { text: "First Name", value: "campaign_name", width:"70%" },
              { text: "Campaign Year", value: "campaign_year", width:"10%" },
              { text: "Actions", value: "actions", sortable: false },
        ],
        rows: [],
        editedIndex: -1,
        editedItem: {
            campaign_name: '',
        },
        defaultItem: {
            campaign_name: '',
        },
      }),

        computed: {
            ...mapState({
            campaigns: state=>state.campaign.campaigns
          }),
          formTitle () {
            return this.editedIndex === -1 ? 'New Campaign' : 'Edit Campaign'
          }
        },

        watch: {
            dialog (val) {
            val || this.close()
          },
          dialogDelete (val) {
            val || this.closeDelete()
          },
            campaigns(val) {
                this.rows = val
            }
        },

        mounted: async function() {
            this.getCampaigns()
        },

        methods: {
          ...mapActions('campaign', ['getCampaigns']),
          editItem (item) {
            this.editedIndex = this.rows.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
          },
    
          deleteItem (item) {
            this.editedIndex = this.rows.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
          },
    
          deleteItemConfirm () {
            this.rows.splice(this.editedIndex, 1)
            this.closeDelete()
          },
    
          close () {
            this.dialog = false
            this.$nextTick(() => {
              this.editedItem = Object.assign({}, this.defaultItem)
              this.editedIndex = -1
            })
          },
    
          closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
              this.editedItem = Object.assign({}, this.defaultItem)
              this.editedIndex = -1
            })
          },
    
          async save () {
            if (this.editedIndex > -1) {
              Object.assign(this.rows[this.editedIndex], this.editedItem);
              await CampaignService.updateCampgain(this.editedItem);
            } else {
              await CampaignService.addCampaign(this.editedItem);
              this.rows.push(this.editedItem)
            }
            this.close();
            this.$parent.refresh();
          },
        },
    }
</script>
  
<style >
</style>
  