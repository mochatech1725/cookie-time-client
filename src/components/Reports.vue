<template>
  <v-container fluid pt-10 class="d-flex align-center justify-center">
      <v-card fluid width="400px" >
        <h1 align="center" style="color:green">Current Sales Totals</h1>
        <v-simple-table class="mytable" fixed-header >
          <template v-slot:default>
            <thead >
              <tr>
                <th class="text-left"> Product </th>
                <th class="text-right"> Total Sold </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in sales_totals.product_totals"
                :key="item.productName"
              >
                <td >{{ item.productName }}</td>
                <td align="right">{{ item.qty }}</td>
              </tr>
              <tr>
                <td >TOTAL</td>
                <td align="right">{{ sales_totals.total_sold}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>

  </v-container>

</template>

<script> 
    import { ReportsService } from '../services/reports.service.js';
  
      export default {
        data: () => ({
            headers: [
                {name:"Product"},
                {name:"Qty"}
            ],
            sales_totals: {
              product_totals: [
                  { productName: "Thin Mint", qty: 200 },
                  { productName: "Trefoil", qty: 150  },
                  { productName: "Samoa", qty: 100  },
                  { productName: "Dosido", qty: 200  },
                  { productName: "Tagalong", qty: 50  },
                  { productName: "Lemonup", qty: 100  },
                  { productName: "Toffee Tastic", qty: 50 },
                  { productName: "S'mores", qty: 40  },
                  { productName: "Adventureful", qty: 60  },
                  { productName: "Raspberry Rally", qty: 10  },
              ],
              total_sold: 960
            }
        }),
    
        computed: {
        },
    
        watch: {
        },
    
        created () {
            console.log('***DEBUG created')
          //this.initialize()
        },
    
        methods: {
          async initialize () {
            this.rows =  await ReportsService.generateCurrentSalesReport("631901e870fff299a91bc25a");
          },
        },
      }
    </script>

<style >
    .mytable table tr {
      background-color: rgb(214, 233, 218);
  }

  tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
  }
</style>
