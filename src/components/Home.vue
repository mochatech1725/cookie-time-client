<template>
    <v-container fluid fill-height class="home-hero" style="max-height: 100vh;" >
        <v-card class="mx-auto" color="green lighten-4">

      <v-container fluid >
        <v-card-text style="font-size:30px">Meet the Cookies</v-card-text>
        <v-row align="center" justify-center>
          <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
          >
            <v-card 
            class="mx-auto my-10"
            width="270" align="center" height="360"
            >
            <v-card-title v-text="card.title"></v-card-title>
              <template>
                  <v-img
                    :src="card.img"
                    class="white--text"
                    height="170px"
                    width="170px" >
                  </v-img>
              </template>
              <v-divider class="mx-4"></v-divider>
              <div class="my-2 pa-4" > {{card.description}} </div>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    </v-container>
  </template>

  <script>

/* eslint-disable vue/multi-word-component-names*/
  export default {
    name: 'Home',
    data() {
        return {
          publicPath: process.env.BASE_URL,
            cards: [
                { title: 'Thin Mints',  img: require('../../static/cookie_thinmint.jpg'), flex: 4,
               description: 'Crispy wafers covered in chocolate coating made with natural oil of peppermint.'},
                { title: 'Samoas', flex: 4, img: require('../../static/cookie_samoa.jpg'),
               description: 'Crispy cookies coated in caramel, sprinkled with toasted coconut and striped with dark chocolate.'  },
                { title: 'Tagalongs', flex: 4, img: require('../../static/cookie_tagalong.jpg'), 
              description: 'Crispy cookies layered with peanut butter and covered with a chocolate. ' },
                { title: 'Dosidos', flex: 4, img: require('../../static/cookie_dosido.jpg'),
              description: 'Crunchy oatmeal sandwich cookies with creamy peanut butter filling. '  },
                { title: 'Trefoils', flex: 4 , img: require('../../static/cookie_trefoil.jpg'),
              description: 'Delicate-tasting shortbread' },
                { title: 'Adventureful', flex: 4 , img: require('../../static/cookie_adventureful.jpg'),
              description: 'Indulgent brownie-inspired cookie with caramel-flavored crème and hint of sea salt.'},
                { title: 'Lemon Ups', flex: 6 , img: require('../../static/cookie_lemonup.jpg'), 
                   description: 'Crispy, lemon cookies baked with lemon glaze and motivational messages.' },
                { title: 'Toffee-tastic', flex: 4 , img: require('../../static/cookie_toffeetastic.jpg'),
              description: 'GLUTEN FREE Rich, buttery cookies with sweet crunchy toffee bits.' },
                { title: 'S\'mores', flex: 6 , img: require('../../static/cookie_smore.jpg'),
              description: 'Crunchy graham sandwich cookies with creamy chocolate and marshmallow filling. ' },
                { title: 'Raspberry Rally', flex: 4, img: require('../../static/cookie_raspberry_rally.jpg'),
              description:'Thin, crispy cookie infused with raspberry flavor and dipped in chocolaty coating'  },
            ]
        };
    }
  }
  </script>
  
  <style scoped>
  /* .home-hero {
    background: url('../assets/rasprallybg.jpeg');
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
  } */
  </style>