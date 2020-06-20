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
    ingredientsList: []
  },
  mutations: {
    addIngredient(state, ingredient) {
      state.ingredientsList.push(ingredient)
    }
  },
  actions: {
    addIngredient({ state, commit }, ingredient) {
      let docRef = db.collection('users').doc(state.uid)
      commit('addIngredient', ingredient)
      docRef.set({ ingredientsList: state.ingredientsList }, { merge: true })
    }
  },
  modules: {
  }
})
