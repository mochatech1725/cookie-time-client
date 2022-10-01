<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-data-table
      :headers="headers"
      :items="rows"
      sort-by="order_id"
      class="elevation-1 mytable"
    >
      <template v-slot:top>
        <v-toolbar flat >
          <v-toolbar-title>Customer Orders</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
           <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px" >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" > New Order </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.campaign_id" label="Campaign Id" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.customer_id" label="Customer Id" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.order_id" label="Order Id" ></v-text-field>
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
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.payment_id" label="Payment Id" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.order_source" label="Order Source" ></v-text-field>
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
  </template>
  
  <script> 
    import { OrderService } from '../services/order.service.js';
    import { mapActions, mapState } from 'vuex'
  
      export default {
        data: () => ({
          dialog: false,
          dialogDelete: false,
          headers: [
                { text: "Campaign", value: "campaign_id" },
                { text: "Order Date", value: "order_date" },
                { text: "Order Id", value: "order_id" },
                { text: "Customer Id", value: "customer_id" },
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
                { text: "Payment Id", value: "payment_id" },
                { text: "Source", value: "order_source" }       ,  
                { text: "Actions", value: "actions", sortable: false }
               ],
          rows: [],
          editedIndex: -1,
          editedItem: {
            order_source: '',
          },
          defaultItem: {
            order_source: '',
          },
        }),
    
        computed: {
          ...mapState({
            orders: state=>state.order.orders
          }),
          formTitle () {
            return this.editedIndex === -1 ? 'New Order' : 'Edit Order'
          }
        },
    
        watch: {
          dialog (val) {
            val || this.close()
          },
          dialogDelete (val) {
            val || this.closeDelete()
          },
          orders(val) {
            this.rows = val
          }
        },
    
        created: async function () {
          this.getOrders("631901e870fff299a91bc25a")
        },
    
        methods: {
          ...mapActions('order', ['getOrders']),
    
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
    
          async deleteItemConfirm () {
            const data = await OrderService.deleteCustomerOrder(this.editedItem.order_id, this.editedItem.customer_id);
            console.log(data);
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
              Object.assign(this.rows[this.editedIndex], this.editedItem)
              await OrderService.updateCustomerOrder(this.editedItem)
            } else {
              await OrderService.createCustomerOrder(this.editedItem)
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
