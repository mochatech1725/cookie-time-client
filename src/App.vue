<template>
  <v-app id="app">
      <app-navigation></app-navigation>

      <v-main fluid color="green">
          <router-view></router-view>
          <v-footer absolute>
            <v-card
                tile
                flat
                width="100%"
                color="green lighten-4" 
                class="d-flex align-center justify-center"
            >
              <template>
                <img :src="require('./assets/cookietimebanner.png')" height="90px">
              </template>
            </v-card>
    </v-footer>  
      </v-main>

  </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation';
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
      AppNavigation
  },
  methods: {
      ...mapActions('campaign', ['getCurrentCampaignId'])
  },
  created: async function () {
    this.getCurrentCampaignId()
  }
};
</script>

<style>
  #app {
  /* display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
  background-color: rgb(224, 241, 224);
  }
</style>
