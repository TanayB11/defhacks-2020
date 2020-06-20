<template>
	<v-layout class="py-8 mt-16">
		<v-container grid-list-xs align-center>
			<v-row>
				<v-col>
					<v-card class="pa-4 mr-6">
						<v-card-title>
							Ingredients
						</v-card-title>
						<v-card-text>
							<v-container grid-list-xs>
								<v-row v-for="(n, i) in $store.state.ingredientsList" :key='i.key' 
								class="text-body-1 justify-between font-weight-light">
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
										<v-icon @click='$store.dispatch("deleteIngredient")'
										color="error" class="mb-1">
											mdi-trash-can-outline
										</v-icon>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col :cols=4>
					<v-card class="pa-4 ml-8">
						<v-card-title class="text-center">
							Add Ingredient
						</v-card-title>
						<v-card-text>
							<v-form @submit.prevent='$store.dispatch("pushIngredients", ingredient)'>
								<div>
									<v-text-field class="pa-0" v-model='ingredient.name' label='Name'/>
									<v-text-field class="pa-0" v-model='ingredient.amount' label='Amount'/>
									<v-text-field class="pa-0" v-model='ingredient.expiry' label='Expiry Date'/>
								</div>
								<v-card-actions class="mx-0 px-0 my-2">
									<v-btn type='submit' color='info'>
										Submit
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
export default {
	data() {
		return {
			ingredient: {
				name: '',
				amount: '',
				expiry: ''
			}
		}
	},
	methods: {

	},
	mounted() {
		this.$store.dispatch('getIngredients')
	}
}
</script>

<style scoped>

</style>