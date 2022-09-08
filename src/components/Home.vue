<template>
    <v-container fluid fill-height class="home-hero" style="max-height: 100vh;">
        <v-layout justify-center align-center column pa-5>
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
    background: url('../assets/cookie_images.png');
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
  }
  </style>