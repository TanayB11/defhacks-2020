<template>
  <v-layout class="py-8 mt-12">
    <v-container class="mt-64">
      <v-card class="px-8 py-4">
        <v-card-title>
          {{ name }}
        </v-card-title>
        <v-card-text>
          
          <v-container grid-list-xs class="text-body-1 justify-between my-1">
            <v-row>
              <v-col class="col-4 font-weight-light pa-0">
                <div class="mb-1">
                  {{ recipe.nutrition.ingredients.length }} ingredients
                </div>
                <div class="mb-1">
                  {{ Math.round(recipe.nutrition.nutrients[0].amount) }} calories
                </div>
                <div class="mb-1">
                  {{ recipe.cookingMinutes }} min cook time
                </div>
                <div class="mb-1" v-if="recipe.servings == 1"> 1 serving </div>
                <div class="mb-1" v-else>
                  {{ recipe.servings }} servings
                </div>
                <div class="mb-1">
                  {{ recipe.aggregateLikes }} likes
                </div>
              </v-col>
              <v-col class="py-0 d-flex justify-center  ">
                <img :src="recipe.image" height="150">
              </v-col>
            </v-row>
            <v-row>
              <v-col class="col-4">
                <v-row class="mb-3 text-h4 font-weight-light white--text">
                  <v-col class="pa-0">Ingredients</v-col>
                </v-row>
                <v-row class="text-body-1 font-weight-light my-1"
                v-for="(n, i) in recipe.nutrition.ingredients" :key='i.key'>
                  <v-col class="pa-0">
                    {{ `${i+1}.  ${recipe.nutrition.ingredients[i].amount} ${recipe.nutrition.ingredients[i].unit} ${recipe.nutrition.ingredients[i].name}` }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <v-row class="ml-5 mb-3 text-h4 font-weight-light white--text">
                  <v-col class="pa-0">Steps</v-col>
                </v-row>
                <div v-if="instructions">
                  <v-row class="ml-5 text-body-1 font-weight-light my-1"
                  v-for="(n, i) in instructions.steps" :key='i.key'>
                    <v-col class="pa-0 my-1">
                      {{ `${i+1}. ${instructions.steps[i].step}` }}
                    </v-col>
                  </v-row>
                </div>
                <div v-else class="ml-5 text-body-1 font-weight-light my-1">
                  <p class="pa-0 my-1">
                    Recipe instructions incoming!
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import axios from 'axios'
import spoonacular from '../creds/spoonacular'
const API_KEY = spoonacular.key
export default {
  name: 'Recipe',
  data() {
    return {
      recipe: new Object(),
      instructions: null
    }
  },
	props: {
		name: String
  },
  methods: {
    loadRecipe() {
      this.recipe = this.$store.state.recipes.results.find(obj => {
        return obj.title == this.name
      })
    },
    getInstructions() {
      const BASEURL = `https://api.spoonacular.com/recipes/${this.recipe.id}/analyzedInstructions`
      // const BASEURL = `https://api.spoonacular.com/recipes/4632/analyzedInstructions`
			axios({
				method: 'get',
				url: `${BASEURL}?apiKey=${API_KEY}`
			})
				.then(result => {
          this.instructions = result.data[0]
				})
    }
  },
  mounted() {
    console.clear()
    this.loadRecipe()
    if (!this.instructions) this.getInstructions()
  }
}
</script>

<style scoped>

</style>