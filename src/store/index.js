import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import credentials from '../firebase/credentials'
import 'firebase/firestore'
firebase.initializeApp(credentials.firebaseConfig)
const db = firebase.firestore()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: 'FJLOKIrktT0oko7n2JTZ', // Temp UID
    // ingredientsList: []
    ingredientsList: [ // TODO: Dummy text, delete later
      {
        name: 'Butter',
        amount: '2tbsp',
        expiry: '06/28/20'
      },
      {
        name: 'Broccoli',
        amount: '2lb',
        expiry: '07/04/20'
      },
      {
        name: 'Tofu',
        amount: '8 cups',
        expiry: '07/13/20'
      }
    ]
  },
  mutations: {
    pushIngredients(state, ingredient) {
      if (!state.ingredientsList) {
        state.ingredientsList = [ingredient]
      } else {
        state.ingredientsList.push(ingredient)
      }
    },
    loadIngredients(state, ingredients) {
      state.ingredientsList = ingredients
    },
    deleteIngredient(state, ingredient) {
      let index = state.ingredientsList.find(obj => {
        return obj.name = ingredient.name
      })
      state.ingredientsList.splice(index, 1)
    }
  },
  actions: {
    pushIngredients({ state, commit }, ingredient) {
      let docRef = db.collection('users').doc(state.uid)
      commit('pushIngredients', ingredient)
      docRef.set({
        ingredientsList: state.ingredientsList
      }, { merge: true })
        .catch(error => console.log(error))
    },
    getIngredients({ state, commit }) {
      let docRef = db.collection('users').doc(state.uid)
      // TODO: Uncomment (saving db reads)
      // docRef.get()
      //   .then(doc => {
      //     if (doc.exists) commit('loadIngredients', doc.data().ingredientsList)
      //   })
      //   .catch(error => console.log(error))
    },
    deleteIngredient({ state, commit, dispatch }, ingredient) {
      let docRef = db.collection('users').doc(state.uid)
      commit('deleteIngredient', ingredient)
    }
  },
  modules: {
  }
})
