<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 16 : 2" :style="hover? 'cursor: pointer': '' ">
            <v-card-text @click="navigateTo(card.title.toLowerCase())">
              <h2 style="color:black" class="text-center">{{card.title}}</h2>
              <h2
                style="color:black; margin-top:20px; height: 50px"
                class="text-center"
              >{{card.quantity}}</h2>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import actions from "../components/actions"
  
  export default {
    name: "Home",
    data: () => ({
      cards: [],
    }),
    created() {
      this.initialize();
    },
    methods: {
      async initialize() {
        let customers = await actions.getCustomers();
        let agents = await actions.getAgents();
        let products = await actions.getProducts();
        let inventoryItems = await actions.getInventoryItems();
        let orders = await actions.getOrders();
        let payments = await actions.getPayments();
        this.cards = [
          { title: "Products", quantity: products.length, flex: 4 },
          { title: "Customers", quantity: customers.length, flex: 4 },
          { title: "Inventory", quantity: inventoryItems.length, flex: 4 },
          { title: "Agents", quantity: agents.length, flex: 4 },
          { title: "Orders", quantity: orders.length, flex: 4 },
          { title: "Payments", quantity: payments.length, flex: 4 },
        ]
      },
      navigateTo(route) {
      if (this.$route.name !== route) {
        this.$router.push({ name: route }).catch((error) => {
          console.log(error);
        })
      }
    },
  }
}
  </script> 