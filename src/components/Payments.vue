<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container fluid pt-10 class="justify-top" >
    <v-data-table
      :headers="headers"
      :items="rows"
      sort-by="payment_id"
      class="elevation-1 mytable"
    >
      <template v-slot:top>
        <v-toolbar flat >
          <v-toolbar-title>Payments</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
           <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px" >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" >
                New Payment
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
                      <v-text-field outlined v-model="editedItem.payment_date" label="Payment Date" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.customer_id" label="Customer Id" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.payment_id" label="Payment Id" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.payment_amount" label="Amount" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.payment_type" label="Payment Type" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.payment_method" label="Method" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.campaign_id" label="Campaign ID" ></v-text-field>
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
        //import { PaymentService } from '../services/payment.service.js';
  
      export default {
        data: () => ({
          dialog: false,
          dialogDelete: false,
          headers: [
                { text: "Payment Date", value: "payment_date" },
                { text: "Customer Id", value: "customer_id" },
                { text: "Payment Id", value: "payment_id" },
                { text: "Payment Amount", value: "payment_amount" },
                { text: "Payment Type", value: "payment_type" },
                { text: "Payment Method", value: "payment_method" },
                { text: "Actions", value: "actions", sortable: false },
          ],
          rows: [],
          editedIndex: -1,
          editedItem: {
            payment_amount: '',
            payment_type: '',
            payment_method: '',
            payment_date: ''
          },
          defaultItem: {
            payment_amount: '',
            payment_type: '',
            payment_method: '',
            payment_date: ''
          },
        }),
    
        computed: {
          formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
          },
        },
    
        watch: {
          dialog (val) {
            val || this.close()
          },
          dialogDelete (val) {
            val || this.closeDelete()
          },
        },
    
        created () {
        },
    
        methods: {
    
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
              Object.assign(this.rows[this.editedIndex], this.editedItem)
            } else {
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
