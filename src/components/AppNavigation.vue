// eslint-disable-next-line vue/no-v-for-template-key
<template>
    <span>
        <v-app-bar color="green darken-2" shaped >
        <v-app-bar-nav-icon @click="drawer = true" > </v-app-bar-nav-icon>
        <v-avatar :tile="true">
            <img :src="require('../../static/girl-scout-logo.jpeg')" alt="logo">
        </v-avatar>
        <v-toolbar-title class="ml-6" style="color:white">{{appTitle}}</v-toolbar-title>
        <v-spacer ></v-spacer>
        <v-toolbar-items class="elevation-2 hidden-sm-and-down" >
            <v-btn text color="white" rounded :to=" {name: 'products'}">Products</v-btn>
            <v-btn text color="white" rounded  :to=" {name: 'customers'}">Customers</v-btn>
            <v-btn text color="white" rounded :to=" {name: 'orders'}">Orders</v-btn>
            <v-btn text color="white" rounded :to=" {name: 'reports'}">Reports</v-btn>
            <v-btn text color="white" rounded :to=" {name: 'inventory'}">Inventory</v-btn>
            <v-btn text color="white" rounded :to=" {name: 'payments'}">Payments</v-btn>
            <v-btn text color="white" rounded :to=" {name: 'agents'}">Agents</v-btn>
            <v-btn text color="white" rounded :to=" {name: 'campaigns'}">Campaigns</v-btn>
        </v-toolbar-items>
        </v-app-bar>

        <v-navigation-drawer app 
            v-model="drawer"
            fixed 
            class="green lighten-4" 
            expand-on-hover
            absolute 
            temporary
        >
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
            appTitle: 'Cookie Time Manager',
            drawer: false,
            items: [
                { title: 'Products', route: "products" },
                { title: 'Customers', route: "customers" },
                { title: 'Orders', route: "orders" },
                { title: 'Reports', route: "reports" },
                { title: 'Inventory', route: "inventory" },
                { title: 'Payments', route: "payments" },
                { title: 'Agents', route: "agents" },
                { title: 'Campaigns', route: "campaigns" },
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