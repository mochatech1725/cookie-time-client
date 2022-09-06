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
                      v-if=" key !== 'id' && key !=='category' && key !='dateAdded' && key !=='product' && key !=='user' ">
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
    import actions from "../components/actions";
    
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
                break
                case "customers":
                break
                case "products":
                break
                case "inventory":
                break
                case "orders":
                break
                case "payments":
                break
                case "reports":
                break
            }
        }
     }
    }
    </script>