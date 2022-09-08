<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-data-table
    :headers="headers"
    :items="rows"
    sort-by="last_name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>Girl Scout Cookie Manager</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
         <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" >
              New Item
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
                    <v-text-field v-model="editedItem.last_name" label="Last Name" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" >
                    <v-text-field v-model="editedItem.first_name" label="First Name" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" >
                    <v-text-field v-model="editedItem.agent_id" label="Agent Id" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" >
                    <v-text-field v-model="editedItem.id" label="Id" ></v-text-field>
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
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize" >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
    // import { AgentService } from '../services/agent.service.js';

    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: "id", value: "id" },
              { text: "agent_id", value: "agent_id" },
              { text: "first_name", value: "first_name" },
              { text: "last_name", value: "last_name" },
              { text: "actions", value: "actions", sortable: false },
        ],
        rows: [
          {
              "id": "123",
              "agent_id": "456",
              "first_name": "Barrack",
              "last_name": "Obama"
          },
          {
              "id": "4888",
              "agent_id": "9999",
              "first_name": "Michelle",
              "last_name": "Obama"
          }
        ],
        editedIndex: -1,
        editedItem: {
          first_name: '',
          last_name: ''
        },
        defaultItem: {
          first_name: '',
          last_name: ''
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
        this.initialize()
      },
  
      methods: {
        onNew: function () {
          alert("New Item")
        },
        async initialize () {
            console.log(this.rows);
            // this.rows =  await AgentService.getAgents();
        },
  
        editItem (item) {
          this.editedIndex = this.rows.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.rwos.indexOf(item)
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
  
        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.rows[this.editedIndex], this.editedItem)
          } else {
            this.rows.push(this.editedItem)
          }
          this.close()
        },
      },
    }
  </script>