<template>
	<v-col>
		<v-card class="pa-4 mr-6">
			<v-card-title>
				Ingredients
			</v-card-title>
			<v-card-text>
				<v-container grid-list-xs class="text-body-1 justify-between my-1">
					<v-row class="mb-3 text-h6 font-weight-light white--text">
						<v-col class="pa-0">Name</v-col>
						<v-col class="pa-0">Amount</v-col>
						<v-col class="pa-0">Expiry Date</v-col>
						<v-col :cols='1'/>
					</v-row>
					<v-row class="font-weight-light my-1"
					v-for="(n, i) in $store.state.ingredientsList" :key='i.key'>
						<v-col class="pl-0 py-0 pr-1" contenteditable=true spellcheck="false">
							{{ $store.state.ingredientsList[i].name }}
						</v-col>
						<v-col class="pl-0 py-0 pr-1" contenteditable=true spellcheck="false">
							{{ $store.state.ingredientsList[i].amount }}
						</v-col>
						<v-col class="pl-0 py-0 pr-1" contenteditable=true spellcheck="false">
							{{ $store.state.ingredientsList[i].expiry }}
						</v-col>
						<v-col class="pa-0" :cols=1>
							<v-icon @click='$store.dispatch("deleteIngredient", $store.state.ingredientsList[i])'
							color="error" class="mb-1">
								mdi-trash-can-outline
							</v-icon>
						</v-col>
					</v-row>
				</v-container>
				<v-card-actions class="mx-0 px-0 my-2">
					<v-btn @click="getRecipes()"
						color='success'>
						Get Recipes
					</v-btn>
					<v-spacer/>
				</v-card-actions>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script>
import axios from 'axios'
import spoonacular from '../creds/spoonacular'
const API_KEY = spoonacular.key
export default {
	name: 'IngredientsList',
	methods: {
		getRecipes() {
			const BASEURL = 'https://api.spoonacular.com/recipes/complexSearch'
			const NUM_OF_RECIPES = 3
			let ingredients = ''
			for (let i = 0; i < Math.min(4, this.$store.state.ingredientsList.length); i++) {
				if (ingredients) ingredients+=',+'
				ingredients+=this.$store.state.ingredientsList[i].name
			}
			let options = `&number=${NUM_OF_RECIPES}&instructionsRequired=true&ignorePantry=true&addRecipeNutrition=true&sort=max-used-ingredients&ranking=2`
			ingredients = ingredients.replace(/ /g, '+')
			axios({
				method: 'get',
				url: `${BASEURL}?query=${ingredients}${options}&apiKey=${API_KEY}`
			})
			.then(result => {
				this.$store.commit('updateRecipes', result.data)
			})
		},
	},
	created() {
		this.$store.dispatch('getIngredients')
	}
}
</script>

<style>

</style>