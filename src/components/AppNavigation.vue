<template>
    <span>
        <v-navigation-drawer app v-model="drawer" class="geen lighten-2" dark disable-resize-watcher>
            <v-list>
                <template v-for="(item, index) in items" :key="index">
                    <v-list-tile >
                        <v-list-tile-content>
                            {{item.title}}
                        </v-list-tile-content>
                    </v-list-tile>
                    <!-- <v-divider :key="`divider-${index}`"></v-divider> -->
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="green darken-4" dark>
            <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-toolbar-title>{{appTitle}}</v-toolbar-title>
            <v-btn flat class="hidden-sm-and-down">Agents</v-btn>
            <v-btn flat class="hidden-sm-and-down">Customers</v-btn>
            <v-btn flat class="hidden-sm-and-down">Products</v-btn>
            <v-btn flat class="hidden-sm-and-down">Inventory</v-btn>
            <v-btn flat class="hidden-sm-and-down">Orders</v-btn>
            <v-btn flat class="hidden-sm-and-down">Payments</v-btn>
        </v-toolbar>
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
</style>