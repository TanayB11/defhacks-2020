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
              Lorem ipsum dolor sit amet, adpliscing elit
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>
              Title
            </v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet, adpliscing elit
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>
              Beautiful Design
            </v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet, adpliscing elit
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
