<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container fluid pt-10 class="justify-top" >
    <v-data-table disable-sort :headers="headers" :items="rows" class="elevation-1 mytable" >
      <template v-slot:top>
        <v-toolbar flat >
          <v-toolbar-title>Product Inventory</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
           <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px" >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" > New Inventory </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.campaign_id" label="Campaign Id"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.thinmint" label="tm" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.trefoil" label="tf" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.samoa" label="sa" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.dosido" label="dd" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.tagalong" label="ta" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.lemonup" label="lu" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.toffee_tastic" label="tt" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.smores" label="sm" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.adventureful" label="ad" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.raspberry_rally" label="rr" ></v-text-field>
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
  </v-container>  

  </template>
  
  <script> 
     import { ProductInventoryService } from '../services/product_inventory.service.js';
     import { mapActions, mapState } from 'vuex'

      export default {
        data: () => ({
          currentCampaignId:'',
          dialog: false,
          dialogDelete: false,
          headers: [
                { text: "Campaign", value: "campaign_id" },
                { text: "TM", value: "thinmint" },
                { text: "TF", value: "trefoil" },
                { text: "SA", value: "samoa" },
                { text: "DD", value: "dosido" },
                { text: "TA", value: "tagalong" },
                { text: "LU", value: "lemonup" },
                { text: "TT", value: "toffee_tastic" },
                { text: "SM", value: "smores" },
                { text: "AD", value: "adventureful" },
                { text: "RR", value: "raspberry_rally" },
                { text: "Actions", value: "actions", sortable: false },
          ],
          rows: [],
          editedIndex: -1,
          editedItem: {
            order_date: '',
          },
          defaultItem: {
            order_date: '',
          },
        }),
    
        computed: {
          ...mapState({
            product_inventory: state=>state.inventory.product_inventory
          }),
          formTitle () {
            return this.editedIndex === -1 ? 'New Inventory' : 'Edit Inventory'
          }
        },
    
        watch: {
          dialog (val) {
            val || this.close()
          },
          dialogDelete (val) {
            val || this.closeDelete()
          },
          product_inventory(val) {
            this.rows = val
          }
        },
    
        created: async function () {
          this.currentCampaignId = await this.getCurrentCampaignId();
          await this.getInventory(this.currentCampaignId)
        },
    
        methods: {
          ...mapActions('inventory', ['getInventory']),
          ...mapActions('campaign', ['getCurrentCampaignId']),
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
              await ProductInventoryService.updateInventoryOrder(this.editedItem);
            } else {
              await ProductInventoryService.createInventoryOrder(this.editedItem);
              this.rows.push(this.editedItem)
            }
            this.close();
            this.$parent.refresh();
          },
        },
      }
    </script>

<style>
  .mytable table tr {
      background-color: rgb(214, 233, 218);
  }

  tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
  }

</style>
