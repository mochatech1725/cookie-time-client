<template>
    <v-data-table :headers="headers" :items="rows" sort-by="name" class="elevation-2">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{$route.name.toUpperCase()}}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row v-for="(value, key) in editedItem " v-bind:key="key">
                    <v-col
                      cols="12" sm="6" md="4"
                      v-if=" key !== 'id' && key !=='product' && key !=='agent' ">
                      <v-text-field
                        :type =" key === 'quantity' || key === 'price' ? 'Number' : 'text' "
                        v-model="editedItem[key]"
                        :label="key"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="editedIndex === -1 && $route.name === 'inventory' ">
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.product"
                        :items="options.products"
                        label="products"
                        item-text="name"
                        item-value="id"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row v-else-if="$route.name === 'products'">
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.category"
                        :items="options.categories"
                        label="categories"
                        item-text="name"
                        item-value="id"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row v-else-if="editedIndex === -1 && $route.name === 'orders'">
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.product"
                        :items="options.inventoryItems"
                        label="products"
                        item-text="product.name"
                        item-value="product.id"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.user"
                        :items="options.users"
                        label="users"
                        item-text="username"
                        item-value="id"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </template>

<script>
    import AgentService from '../services/agents.service.js';
    import ProductService from '../services/product.service.js'
    import OrderService from '../services/order.service.js'
    import InventoryService from '../services/inventory.service.js'
    import PaymentService from '../services/payment.service.js'
    import CustomerService from '../services/customer.service.js'
    
    export default {
      name: "Table",
      data: () => ({
        dialog: false,
        headers: [],
        options: {},
        rows: [],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {},
      }),
      computed: {
        formTitle() {
          return this.editedIndex === -1 ? "New Item" : "Edit Item";
        },
      },
      created() {
        this.initialize()
      },
        methods: {
          async initialize() {
              switch (this.$route.name) {
                  case "agents":
                    this.initializeSalesAgent();
                    const agents = await AgentService.getAgents();
                    this.rows = agents;
                  break
                  case "customers":
                    this.initializeCustomers();
                    const csutomers = await CustomerService.getCustomers();
                    this.rows = csutomers;
                  break
                  case "products":
                    this.initializeProducts();
                    const products = await ProductService.getProducts();
                    this.rows = products;
                  break
                  case "inventory":
                    this.initializeInventory();
                    const inventory = await InventoryService.getInventory(undefined);
                    this.rows = inventory;
                  break
                  case "orders":
                    this.rows=[];
                  break
                  case "payments":
                  this.rows=[];
                  break
              }
          },
          initializeSalesAgent() {
            this.headers = [
              { text: "id", value: "id" },
              { text: "agent_id", value: "agent_id" },
              { text: "first_name", value: "first_name" },
              { text: "last_name", value: "last_name" },
              { text: "created_at", value: "created_at" },
              { text: "actions", value: "actions", sortable: false },
            ];
            this.editedItem = { agent_id:"", first_name: "", last_name: "", agent_id: "", created_at: ""}
            this.defaultItem = { agent_id:"", first_name: "", last_name: "", agent_id: "", created_at: ""}
          },
          initializeCustomers() {
            this.headers = [
              { text: "id", value: "id" },
              { text: "customer_id", value: "customer_id" },
              { text: "first_name", value: "first_name" },
              { text: "last_name", value: "last_name" },
              { text: "address", value: "address" },
              { text: "city", value: "city" },
              { text: "state", value: "state" },
              { text: "zipcode", value: "zipcode" },
              { text: "created_at", value: "created_at" },
              { text: "email_address", value: "email_address" },
              { text: "phone_number", value: "phone_number" },
              { text: "actions", value: "actions", sortable: false },
            ];
            this.editedItem = {customer_id: "",first_name: "", last_name: "", phone_number: ""}
            this.defaultItem = {customer_id: "",first_name: "", last_name: "", phone_number: ""}
          },
          initializeProducts() {
            this.headers = [
              { text: "id", value: "id" },
              { text: "product_id", value: "product_id" },
              { text: "product_name", value: "product_name" },
              { text: "product_price", value: "product_price" },
              { text: "year_introduced", value: "year_introduced" },
              { text: "actions", value: "actions", sortable: false },
            ];
            this.editedItem = { product_id:"", product_name: "", product_price: 0}
            this.defaultItem = { product_id:"", product_name: "", product_price: 0}
          },
          editItem(item) {
            this.editedIndex = this.rows.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
          },

          close() {
            this.dialog = false;
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.editedIndex = -1
          });
          },
          async save() {
            if (this.editedIndex > -1) {
              switch (this.$route.name) {
                case "agents":
                  break
                case "customers":
                  break
                case "products":
                  break
                case "inventory":
                  break
                case "orders":
                  break
              }
            } else {
              switch (this.$route.name) {
                case "agents":
                  break
                case "customers":
                  break
                case "products":
                  break
                case "inventory":
                  break
                case "orders":
                  break
              }
            }
            this.close()
          },
          // async deleteItem(item) {
          //   const index = this.rows.indexOf(item)
          //   const message = "Are you sure you want to delete this item?"

          //   switch (this.$route.name) {
          //     case "agents":
          //       confirm(message) && (await actions.deleteUser(item.id)) &&
          //       this.rows.splice(index,1)
          //       break
          //     case "customers":
          //       confirm(message) && (await actions.deleteCategory(item.id)) &&
          //       this.rows.splice(index, 1)
          //       break
          //     case "products":
          //       confirm(message) && (await actions.deleteProduct(item.id)) &&
          //       this.rows.splice(index, 1)
          //       break
          //     case "inventory":
          //       confirm(message) && (await actions.deleteInventoryItem(item.id)) &&
          //       this.rows.splice(index, 1)
          //       break
          //     case "orders":
          //       confirm(message) && (await actions.deleteOrder(item.id)) &&
          //       this.rows.splice(index, 1)
          //       break
          //   }
          // }
      }
    }
    </script>