<template>
	<v-layout class="py-8 mt-12">
		<v-container grid-list-xs align-center>
			<v-row>
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
									<v-col class="pa-0">
										{{ $store.state.ingredientsList[i].name }}
									</v-col>
									<v-col class="pa-0">
										{{ $store.state.ingredientsList[i].amount }}
									</v-col>
									<v-col class="pa-0">
										{{ $store.state.ingredientsList[i].expiry }}
									</v-col>
									<v-col class="pa-0" :cols=1>
										<!-- editing doesn't work -->
										<v-icon @click='$store.dispatch("editIngredient", $store.state.ingredientsList[i])'
										color="secondary" class="mb-1 mr-2">
											mdi-pencil
										</v-icon>
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
				<v-col :cols=4>
					<v-card class="pa-4 ml-8">
						<v-card-title class="text-center">
							Add Ingredient
						</v-card-title>
						<v-card-text>
							<v-form @submit.prevent='addIngredient()'>
								<div>
									<v-text-field class="pa-0" v-model='ingredient.name' label='Name'/>
									<v-text-field class="pa-0" v-model='ingredient.amount' :rules="amountRules" label='Amount'/>
									<v-text-field class="pa-0" v-model='ingredient.expiry' label='Expiry Date'/>
								</div>
								<v-card-actions class="mx-0 px-0 my-2">
									<v-btn type='submit' color='info'>
										Submit
									</v-btn>
									<v-spacer/>
									<v-btn color='secondary' fab small>
										<v-icon>mdi-microphone</v-icon>
									</v-btn>
								</v-card-actions>
							</v-form>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-layout>
</template>

<script>
import axios from 'axios'
import spoonacular from '../creds/spoonacular'
const API_KEY = spoonacular.key
export default {
	data() {
		return {
			ingredient: {
				name: '',
				amount: '',
				expiry: ''
			},
			recipes: new Array()
		}
	},
	methods: {
		addIngredient() {
			this.$store.commit('addIngredient', this.ingredient)
			this.$store.dispatch("pushIngredients", this.ingredient)
		}, // rules 
		getRecipes() {
			const BASEURL = 'https://api.spoonacular.com/recipes/findByIngredients'
			const NUM_OF_RECIPES = 3
			let ingredients = ''
			for (let i = 0; i < this.$store.state.ingredientsList.length; i++) {
				if (!ingredients) ingredients+=this.$store.state.ingredientsList[i].name
				else ingredients+=`,+${this.$store.state.ingredientsList[i].name}`
			}
			axios({
				method: 'get',
				url: `${BASEURL}?ingredients=${ingredients}&number=${NUM_OF_RECIPES}&apiKey=${API_KEY}`
			})
				.then(result => this.Array = result)
		}
	},
	computed: {
		amountRules() {
			const rules = []
			rules.push(v => !isNaN(v) || "Input a valid amount") 
			return rules
		}
	},
}
</script>

<style scoped>

</style>
