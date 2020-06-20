<template>
  <v-app dark>
		<v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" :width=250 app>
			<v-list>
				<v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar :clipped-left="clipped" app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title v-text="title" />
			<v-spacer />
		</v-app-bar>
    <!-- Main view -->
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
  return {
			clipped: false,
			drawer: false,
			fixed: false,
			items: [ // Sidebar routes
				{
					icon: "mdi-apps",
					title: "Welcome",
					to: "/"
				},
				{
					icon: "mdi-chart-line-variant",
					title: "Dashboard",
					to: "/dashboard"
				}
			],
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: "recipe-finder"
		}
  },
  created() {
    this.$vuetify.theme.dark = true
  }
}
</script>

<style scoped>

</style>
