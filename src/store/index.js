import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import credentials from '../creds/firebase'
import 'firebase/firestore'
firebase.initializeApp(credentials.firebaseConfig)
const db = firebase.firestore()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: 'FJLOKIrktT0oko7n2JTZ', // Temp UID
    ingredientsList: [],
    recipes: []
  },
  mutations: {
    addIngredient(state, ingredient) {
      !state.ingredientsList ? state.ingredientsList = [ingredient] : state.ingredientsList.push(ingredient)
    },
    loadIngredients(state, ingredients) {
      state.ingredientsList = ingredients
    },
    deleteIngredient(state, ingredient) {
      let index = state.ingredientsList.indexOf(ingredient)
      state.ingredientsList.splice(index, 1)
    },
    updateRecipes(state, recipes) {
      state.recipes = recipes
    }
  },
  actions: {
    pushIngredients({ state }) {
      let docRef = db.collection('users').doc(state.uid)
      docRef.set({
        ingredientsList: state.ingredientsList
      }, { merge: true })
        .catch(error => console.log(error))
    },
    getIngredients({ state, commit }) {
      let docRef = db.collection('users').doc(state.uid)
      docRef.get()
        .then(doc => {
          if (doc.exists) commit('loadIngredients', doc.data().ingredientsList)
        })
        .catch(error => console.log(error))
    },
    deleteIngredient({ commit, dispatch }, ingredient) {
      commit('deleteIngredient', ingredient)
      dispatch('pushIngredients')
    }
  },
  modules: {
  }
})
