<template>
	<v-col>
		<v-card v-if='$store.state.recipes.length'>
			<v-card-title>
				Recipes
			</v-card-title>
			<v-card-text>
				<v-container grid-list-xs class="text-body-1 justify-between my-1">
					<v-row class="font-weight-light my-1"
					v-for="(n, i) in $store.state.recipes" :key='i.key'>
						<div v-if="!$store.state.recipes[i].missedIngredientCount"
						class="pa-0">
						<!-- TODO: text color -->
							<router-link :to='{ path: `/recipe/${$store.state.recipes[i].title}` }'>
								{{ $store.state.recipes[i].title }}
							</router-link>
						</div>
					</v-row>
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