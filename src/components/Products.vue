<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-data-table
      :headers="headers"
      :items="rows"
      sort-by="product_name"
      class="elevation-1 mytable"
    >
      <template v-slot:top >
        <v-toolbar flat >
          <v-toolbar-title>Products</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
           <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px" >
            
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" > New Product </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.product_name" label="Product Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.product_price" label="Price" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.year_introduced" label="Year" ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close" > Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="save" > Save </v-btn>
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
      <template v-slot:[`item.product_image`]="{ item }">
          <img :src="require('../assets/product-images/' + item.product_image)" style="width: 50px; height: 50px">
      </template>
               
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" > mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)" > mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize" > No Products </v-btn>
      </template>
    </v-data-table>
  </template>
  
  <script>

    import { ProductService } from '../services/product.service.js';

      export default {
        data: () => ({
          dialog: false,
          dialogDelete: false,
          headers: [
                { text: "Icon", width:"15%", value:"product_image", sortable: false},
                { text: "Product Name", value: "product_name", width:"20%" },
                { text: "Price", value: "product_price", width:"5%" },
                { text: "Year", value: "year_introduced", width:"5%" },
                { text: "Actions", value: "actions", sortable: false, width:"5%"},
          ],
          rows: [],
          editedIndex: -1,
          editedItem: {
            product_name: '',
            product_price: 6,
          },
          defaultItem: {
            product_name: '',
            product_price: 6,
          },
        }),
        computed: {
          formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
          }
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
          this.initialize()
        },
    
        methods: {
          async initialize () {
              this.rows =  await ProductService.getProducts();
          },
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
              await ProductService.updateCustomer(this.editedItem);

            } else {
              const data = await ProductService.updateProduct(this.editedItem);
              console.log(data)
              this.rows.push(this.editedItem)
            }
            this.close();
            await this.initialize();
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

