<template>
	<v-layout class="py-8 mt-12">
		<v-container grid-list-xs align-center>
			<v-row>
				<IngredientsList/>
				<NewIngredient/>
			</v-row>
			<v-row>
				<RecipeList/>
			</v-row>
		</v-container>
	</v-layout>
</template>

<script>
import IngredientsList from '../components/IngredientsList'
import NewIngredient from '../components/NewIngredient'
import RecipeList from '../components/RecipeList'
export default {
	components: {
		IngredientsList,
		NewIngredient,
		RecipeList
	},
	data() {
		return {
		}
	}
}
</script>

<style scoped>

</style>