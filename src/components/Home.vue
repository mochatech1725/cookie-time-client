<template>
    <v-container fluid fill-height class="home-hero" style="max-height: 100vh;">
        <v-layout justify-center align-center column pa-5>
            <div class="display-4 font-weight-black white--text text-xs-center">Girl Scout Cookie Sales</div>
            <v-btn fab class="mt-5 green darken-4">
            <v-icon large color="white">expand_more</v-icon>
            </v-btn>
        </v-layout>
    </v-container>
  </template>

  <script>

/* eslint-disable vue/multi-word-component-names*/
  export default {
    name: 'Home'
  };
  </script>
  
  <style scoped>
  .home-hero {
    background: url('http://source.unsplash.com/0BhSKStVtdM');
    background-size: cover;
    width: 100%;
    height: 100%;
  }
  </style>