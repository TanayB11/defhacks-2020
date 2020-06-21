<template>
	<v-layout column>
		<v-card>
			<v-card-title>
				{{ name }}
			</v-card-title>
		</v-card>
	</v-layout>
</template>

<script>
export default {
	props: {
		name: String
	},
	mounted() {
		console.log(recipeName)
	}
}
</script>

<style scoped>

</style>