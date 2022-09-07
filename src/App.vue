<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense v-for="route in routes" :key="route.title">
        <v-list-item link @click="navigateTo(route.path)">
          <v-list-item-action>
            <v-icon>{{route.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{route.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col>
            <router-view :key="$route.fullPath"></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: "App",
    data: () => ({
      drawer: null,
      routes: [
        { path: "home", title: "Dashboard", icon: "mdi-view-dashboard" },
        { path: "agents", title: "Agents", icon: "mdi-cog" },
        { path: "customers", title: "Customers", icon: "mdi-cog" },
        { path: "products", title: "Products", icon: "mdi-cog" },
        { path: "inventory", title: "Inventory", icon: "mdi-cog" },
        { path: "orders", title: "Orders", icon: "mdi-cog" },
        { path: "payments", title: "Payments", icon: "mdi-cog" },
      ],
    }),
    created() {
      this.$vuetify.theme.light = true;
    },  
    methods: {
    navigateTo(route) {
      if (this.$route.name !== route) {
        this.$router.push({ name: route }).catch((error) => {
          console.log(error)
        });
      }
    },
  },
  }
  </script>
  
