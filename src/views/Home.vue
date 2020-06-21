<template>

  <v-layout column>
    <v-container class="d-flex" align-center justify-center id="banner">
      
      <v-row :align="center" :justify="center">
        <v-col class="text-center">
          <div class="text-h2 font-weight-500"> Find recipes for your food. </div>
        </v-col>
      </v-row>

      <v-row :align="center" :justify="center">
        <router-link to="/dashboard" class="mt-8">
          <v-btn color="primary"  >Get started</v-btn>
        </router-link>
      </v-row> 

    </v-container>

    
    <v-container>
      <v-card>
        <v-card-title>
          Title
        </v-card-title>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
  #banner {
    height: 100vh;
  }
</style>
