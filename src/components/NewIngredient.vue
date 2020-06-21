<template>
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
</template>

<script>
export default {
	name: 'NewIngredient',
	props: {

	},
	data() {
		return {
			ingredient: {
				name: '',
				amount: '',
				expiry: ''
			}
		}
	},
	computed: {
		amountRules() {
			const rules = []
			rules.push(v => !isNaN(v) || "Input a valid amount") 
			return rules
		}
	},
	methods: {
		addIngredient() {
			this.$store.commit('addIngredient', this.ingredient)
			this.$store.dispatch("pushIngredients", this.ingredient)
				.then(this.ingredient = {
					name: '',
					amount: '',
					expiry: ''
				})
		}, // rules 
	}
}
</script>

<style>

</style>