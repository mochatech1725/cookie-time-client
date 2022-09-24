<template>
    <span>
        <!-- <v-navigation-drawer app v-model="drawer" class="green lighten-4"  disable-resize-watcher>
            <v-list>
                // eslint-disable-next-line vue/no-v-for-template-key
                <v-list-item v-for="(item, index) in items" :key="index" link>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer> -->

        <v-app-bar color="green darken-2">
            <!-- <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon> -->
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-toolbar-title>{{appTitle}}</v-toolbar-title>
            <v-spacer class="hidden-md-and-up"></v-spacer>

            <v-layout justify-end row wrap>
                <v-toolbar-items class="hidden-sm-and-down elevation-2">
                    <v-btn text color="white" :to=" {name: 'products'}">Products</v-btn>
                    <v-btn text color="white"  :to=" {name: 'customers'}">Customers</v-btn>
                    <v-btn text color="white" :to=" {name: 'orders'}">Orders</v-btn>
                    <v-btn text color="white" :to=" {name: 'inventory'}">Inventory</v-btn>
                    <v-btn text color="white"  :to=" {name: 'payments'}">Payments</v-btn>
                    <v-btn text color="white" :to=" {name: 'agents'}">Agents</v-btn>
                </v-toolbar-items>
            </v-layout>

        </v-app-bar>
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
                { title: 'Agents' },
                { title: 'Customers' },
                { title: 'Products' },
                { title: 'Inventory' },
                { title: 'Orders' },
                { title: 'Payments' }
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