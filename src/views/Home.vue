<template>
  <v-layout column>
    <v-container class="d-flex flex-column" :align="center" :justify="center" id="banner">
      <v-row class="align-end justify-center">
        <v-col class="text-center">
          <div class="text-h2 font-weight-500"> Find recipes for your food. </div>
        </v-col>
      </v-row>
      <v-row class="align-start justify-center">
        <router-link to="/dashboard" class="mt-8">
          <v-btn color="primary" large>Get started</v-btn>
        </router-link>
      </v-row>
      <v-icon class="mt-auto mx-auto justify-center align-end scroll" @click="scrollDown" :large="true">
        mdi-chevron-down
      </v-icon>
    </v-container>
    <v-container id="info">
      <v-row class="align-end justify-center">
        <v-col class="text-center">
          <v-text class="text-h5">Get targeted recipes based on expiry dates.</v-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              Solving Food Waste
            </v-card-title>
            <v-card-text>
              Every year, "roughly 1.3 billion tons of food, worth nearly $1 trillion, spoils or is thrown away"
              <a class="text-decoration-none blue--text"
              href="https://www.pri.org/stories/2020-05-28/food-waste-increases-during-pandemic-compounding-existing-problem">
                (Wernick, PRI).
              </a>
              At the same time, "11.1 percent (14.3 million) households experience food shortages at some time during a year"
              <a class="text-decoration-none blue--text"
              href="https://www.ers.usda.gov/topics/food-nutrition-assistance/food-security-in-the-us/key-statistics-graphics.aspx">
                (USDA).
              </a>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>
              The Project
            </v-card-title>
            <v-card-text>
              Saucer is a solution to food waste by recommending users suitable recipes based on the items they already have. 
              <br/> <br/>
              By eliminating food waste, we can provide food to people who need it the most and simultaneously help the environment in the process by conserving natural resources.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>
              Material Design
            </v-card-title>
            <v-card-text>
              By incorporating a beautiful Material Design, we can ensure that users enjoy using Saucer to find the recipe for their next meal
              and continue to fight food waste. 
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    scrollDown() {
      document.querySelector('#info').scrollIntoView({ 
        behavior: 'smooth',
      })
    }
  }
}
</script>

<style scoped>
  #banner {
    height: 100vh;
  }
</style>
