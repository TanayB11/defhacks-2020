<template>
  <v-layout column align-center justify-center>
    <div class="text-h2 font-weight-thin"> Find recipes for your food. </div>
    <router-link to="/dashboard" class="mt-8">
      <v-btn depressed color="primary">Get started</v-btn>
    </router-link>
  </v-layout>
</template>

<script>
export default {
  name: 'Home'
}
</script>
