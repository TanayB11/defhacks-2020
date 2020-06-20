<template>
  <v-app dark>
    <!-- <v-app-bar dark/> -->
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {

    }
  },
  created() {
    this.$vuetify.theme.dark = true
  }
}
</script>

<style scoped>

</style>
