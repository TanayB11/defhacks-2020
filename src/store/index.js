import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import credentials from '../creds/firebase'
import 'firebase/firestore'
firebase.initializeApp(credentials.firebaseConfig)
const db = firebase.firestore()

import moment from 'moment'

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
    },
    sortExpiry(state) {
      state.ingredientsList.sort((a, b) => {
        return moment(a.expiry, "MM/DD/YY").diff(moment(), 'days') - moment(b.expiry, "MM/DD/YY").diff(moment(), 'days')
      })
    }
  },
  actions: {
    pushIngredients({ state }) {
      let docRef = db.collection('users').doc(state.uid)
      docRef.set({
        ingredientsList: state.ingredientsList
      }, { merge: true })
        .then(() => {
          new Promise((resolve) => {
            this.commit('sortExpiry')
            resolve()
          })
        })
        .catch(error => console.log(error))
    },
    getIngredients({ state, commit }) {
      let docRef = db.collection('users').doc(state.uid)
      docRef.get()
        .then(doc => {
          new Promise((resolve) => {
            if (doc.exists) this.commit('loadIngredients', doc.data().ingredientsList)
            this.commit('sortExpiry')
            resolve()
          })
        })
        .catch(error => console.log(error))
    },
    deleteIngredient({ commit, dispatch }, ingredient) {
      this.commit('deleteIngredient', ingredient)
      this.commit('sortExpiry')
      this.dispatch('pushIngredients')
    }
  },
  modules: {
  }
})
