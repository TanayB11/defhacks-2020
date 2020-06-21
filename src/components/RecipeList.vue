<template>
	<v-col>
		<v-card class="mt-4 pa-4">
			<v-card-title>
				Recipes
			</v-card-title>
			<v-card-text v-if='$store.state.recipes.results'>
				<v-container grid-list-xs class="text-body-1 justify-between my-1">
					<v-row class="mb-3 text-h6 font-weight-light white--text">
						<v-col class="pa-0 mx-8 col-2">Name</v-col>
						<v-col class="pa-0 mx-8">Ingredients</v-col>
						<v-col class="pa-0 mx-8">Calories</v-col>
						<v-col class="pa-0 mx-8">Protein</v-col>
						<v-col class="pa-0 mx-8">Rating</v-col>
					</v-row>
					<div v-for="(n, i) in $store.state.recipes.results" :key='i.key'> 
						<v-row class="font-weight-light my-4">
								<v-col
								class="pa-0 mx-8 col-2">
									<router-link :to='{ path: `/recipe/${$store.state.recipes.results[i].title}` }' class="text-decoration-none blue--text">{{ $store.state.recipes.results[i].title.trim() }}</router-link>
								</v-col>
								<v-col class="pa-0 mx-8">
									<p v-if="$store.state.recipes.results[i].nutrition.ingredients.length == 1">1 ingredient</p>
									<p v-else>{{ $store.state.recipes.results[i].nutrition.ingredients.length }} ingredients</p>
								</v-col>
								<v-col class="pa-0 mx-8">
									<p>{{ $store.state.recipes.results[i].nutrition.nutrients[0].amount }} cal</p>
								</v-col>
								<v-col class="pa-0 mx-8">
									<p>{{ $store.state.recipes.results[i].nutrition.nutrients[9].amount }}g</p>
								</v-col>
								<v-col class="pa-0 mx-8">
									<p v-if="$store.state.recipes.results[i].aggregateLikes == 1">1 like</p>
									<p v-else>{{ $store.state.recipes.results[i].aggregateLikes }} likes</p>
								</v-col>
						</v-row>
					</div>
				</v-container>
			</v-card-text>
			<v-card-text v-else class="my-1 text-body-1 font-weight-light">
				None yet! Click the "Get Recipes" button to display recipes.
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script>
export default {
	name: 'RecipeList',
	updated() {
		console.log(this.$store.state.recipes.results)
	}
}
</script>

<style>

</style>