<template>
    <span>
        <v-navigation-drawer app v-model="drawer" class="geen lighten-4"  disable-resize-watcher>
            <v-list>
                // eslint-disable-next-line vue/no-v-for-template-key
                <v-list-item v-for="(item, index) in items" :key="index" link>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar color="green darken-2">
            <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-toolbar-title>{{appTitle}}</v-toolbar-title>
            <v-btn text class="hidden-sm-and-down" :to=" {name: 'agents'}">Agents</v-btn>
            <v-btn text class="hidden-sm-and-down">Customers</v-btn>
            <v-btn text class="hidden-sm-and-down">Products</v-btn>
            <v-btn text class="hidden-sm-and-down">Inventory</v-btn>
            <v-btn text class="hidden-sm-and-down">Orders</v-btn>
            <v-btn text class="hidden-sm-and-down">Payments</v-btn>
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
    a {
        color: white;
        text-decoration: none;
    }
</style>