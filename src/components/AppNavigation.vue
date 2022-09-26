// eslint-disable-next-line vue/no-v-for-template-key
<template>
    <span>
        <v-app-bar color="green darken-2"
         >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
        <v-avatar :tile="true">
            <img :src="require('../../static/girl-scout-logo.jpeg')" alt="logo">
        </v-avatar>
        <v-toolbar-title class="ml-6" >{{appTitle}}</v-toolbar-title>
        <v-spacer ></v-spacer>
        <v-toolbar-items class="elevation-2 hidden-sm-and-down" >
            <v-btn text color="white" :to=" {name: 'home'}">Home</v-btn>
            <v-btn text color="white" :to=" {name: 'products'}">Products</v-btn>
            <v-btn text color="white"  :to=" {name: 'customers'}">Customers</v-btn>
            <v-btn text color="white" :to=" {name: 'orders'}">Orders</v-btn>
            <v-btn text color="white" :to=" {name: 'inventory'}">Inventory</v-btn>
            <v-btn text color="white"  :to=" {name: 'payments'}">Payments</v-btn>
            <v-btn text color="white" :to=" {name: 'agents'}">Agents</v-btn>
        </v-toolbar-items>
        </v-app-bar>


        <v-navigation-drawer app v-model="drawer" class="green lighten-4"  disable-resize-watcher>
            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" link @click="$router.push({ path: item.route }) ">
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer> 

        
    </span>
</template>

<script>
export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: 'Cookie Sales Manager',
            drawer: false,
            items: [
                { title: 'Home', route: "home" },
                { title: 'Products', route: "products" },
                { title: 'Customers', route: "customers" },
                { title: 'Orders', route: "orders" },
                { title: 'Inventory', route: "inventory" },
                { title: 'Payments', route: "payments" },
                { title: 'Agents', route: "agents" }
            ]
        };
    }
};
</script>

<style scoped>
    .toolbar__items {
        flex-wrap: wrap;
    }

    a {
        color: white;
        text-decoration: none;
    }
</style>