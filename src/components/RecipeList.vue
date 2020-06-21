<template>
	<v-col>
		<v-card v-if='$store.state.recipes.length' class="mt-4">
			<v-card-title>
				Recipes
			</v-card-title>
			<v-card-text>
				<v-container grid-list-xs class="text-body-1 justify-between my-1">
					<v-row class="mb-3 text-h6 font-weight-light white--text">
						<v-col class="pa-0 mx-8">Name</v-col>
						<v-col class="pa-0 mx-8">Rating</v-col>
						<v-col class="pa-0 mx-8">Rating</v-col>
						<v-col class="pa-0 mx-8">Ingredient Count</v-col>
					</v-row>
					<div v-for="(n, i) in $store.state.recipes" :key='i.key'> 
						<v-row class="font-weight-light my-4" v-if="!$store.state.recipes[i].missedIngredientCount">
								<v-col
								class="pa-0 mx-8">
								<!-- TODO: text color -->
									<router-link :to='{ path: `/recipe/${$store.state.recipes[i].title}` }' class="text-decoration-none orange--text">
										{{ $store.state.recipes[i].title }}
									</router-link>
								</v-col>
								<v-col class="pa-0 mx-8">
									<p v-if="$store.state.recipes[i].likes == 1">1 like</p>
									<p v-else>{{ $store.state.recipes[i].likes }} likes</p>
								</v-col>
								<v-col class="pa-0 mx-8">
									<p v-if="$store.state.recipes[i].calories == 1">1 carb</p>
									<p v-else>{{ $store.state.recipes[i].carbs }} carb</p>
								</v-col>
								<v-col class="pa-0 mx-8">
									<p v-if="$store.state.recipes[i].usedIngredientCount == 1">1 ingredient</p>
									<p v-else>{{ $store.state.recipes[i].usedIngredientCount }} ingredients</p>
								</v-col>
						</v-row>
					</div>
				</v-container>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script>
export default {
	name: 'RecipeList'
}
</script>

<style>

</style>