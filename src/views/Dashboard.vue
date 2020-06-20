<template>
	<v-layout justify-center>
		<v-flex xs12 sm8 md6>
			<v-card class="py-8">
				<v-card-title>
					Form
				</v-card-title>
				<v-card-text>
					<v-form @submit.prevent='$store.dispatch("addIngredient", ingredient)'>
						<div class="ml-2">
							<v-text-field v-model='ingredient.name' label='Name'/>
							<v-text-field v-model='ingredient.amount' label='Amount'/>
							<v-text-field v-model='ingredient.expiry' label='Expiry Date'/>
						</div>
						<v-divider/>
						<v-card-actions>
							<v-btn type='submit' color='info' class="mt-4">
								Submit
							</v-btn>
						</v-card-actions>
					</v-form>
				</v-card-text>
			</v-card>
		</v-flex>
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

	}
}
</script>

<style scoped>

</style>