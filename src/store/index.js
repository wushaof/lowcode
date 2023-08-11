import Vuex from 'vuex'
import Vue from 'vue'
import formDesign from './modules/formDesign'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    formDesign,
  },
})

export default store