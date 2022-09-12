<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-data-table
    :headers="headers"
    :items="rows"
    sort-by="last_name"
    class="elevation-1 mytable"
  >
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>Agents</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
         <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" >
              New Agent
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
                    <v-text-field v-model="editedItem._id" label="Id" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" >
                    <v-text-field v-model="editedItem.first_name" label="First Name" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" >
                    <v-text-field v-model="editedItem.last_name" label="Last Name" ></v-text-field>
                  </v-col>
 
                  <v-col cols="12" sm="6" md="4" >
                    <v-text-field v-model="editedItem.agent_id" label="Agent Id" ></v-text-field>
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
    import { AgentService } from '../services/agent.service.js';

    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
              { text: "Id", value: "_id", width:"10%"},
              { text: "Agent Id", value: "agent_id", width:"10%" },
              { text: "First Name", value: "first_name", width:"40%" },
              { text: "Last Name", value: "last_name", width:"40%" },
              { text: "Actions", value: "actions", sortable: false },
        ],
        rows: [],
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
          return this.editedIndex === -1 ? 'New Agent' : 'Edit Agent'
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
        async initialize () {
            this.rows =  await AgentService.getAgents();
            // console.log('Agent rows=', this.rows);
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
            Object.assign(this.rows[this.editedIndex], this.editedItem);
            console.log(this.editedItem);
            await AgentService.addAgent(this.editedItem.first_name, this.editedItem.last_name);

          } else {
            this.rows.push(this.editedItem)
          }
          this.close()
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