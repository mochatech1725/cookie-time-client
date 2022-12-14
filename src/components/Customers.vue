<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container fluid pt-10 d-flex align-center justify-center >
    <v-card >
      <v-data-table :headers="headers" :items="rows" sort-by="first_name" class="elevation-1 mytable" >
      <template v-slot:top>
        <v-toolbar flat >
          <v-toolbar-title>Customers</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
           <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px" >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" > New Customer </v-btn>
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
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.address" label="Address" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.city" label="City" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.state" label="State" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.zipcode" label="Zipcode" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.email_address" label="Email" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field outlined v-model="editedItem.phone_number" label="Phone" ></v-text-field>
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
      import { CustomerService } from '../services/customer.service.js';
      import { mapActions, mapState } from 'vuex'
      import { store } from '../_store'

      export default {
        data: () => ({
          dialog: false,
          dialogDelete: false,
          headers: [
                { text: "Customer Id", value: "customer_id", width:"3%" },
                { text: "First Name", value: "first_name", width:"12%" },
                { text: "Last Name", value: "last_name", width:"16%" },
                { text: "Address", value: "address", width:"23%" },
                { text: "City", value: "city", width:"8%" },
                { text: "State", value: "state", width:"1%" },
                { text: "Zipcode", value: "zipcode", width:"1%" },
                { text: "Email", value: "email_address", width:"10%" },
                { text: "Phone", value: "phone_number", width:"16%" },
                { text: "Actions", value: "actions", sortable: false },
          ],
          rows: [],
          editedIndex: -1,
          editedItem: {
            first_name: '',
            last_name: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            email_address: '',
            phone_number: '',
          },
          defaultItem: {
            first_name: '',
            last_name: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            email_address: '',
            phone_number: '',
          },
        }),
    
        computed: {
          ...mapState({
            customers: state=>state.customer.customers
          }),
          formTitle () {
            return this.editedIndex === -1 ? 'New Customer' : 'Edit Customer'
          },
        },
    
        watch: {
          dialog (val) {
            val || this.close()
          },
          dialogDelete (val) {
            val || this.closeDelete()
          },
          customers(val) {
            this.rows = val
          }
        },
    
        created: async function() {
          await this.getCustomers()
        },
    
        methods: {
          ...mapActions('customer', ['getCustomers']),
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
            const data = await CustomerService.deleteCustomer(this.editedItem.customer_id);
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
              await CustomerService.updateCustomer(this.editedItem);

            } else {
              const data = await CustomerService.addCustomer(this.editedItem);
              console.log(data);
              this.rows.push(this.editedItem);
            }
            this.close();
            store.dispatch('customer/getCustomers')
            this.$parent.refresh();
          },
        }
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