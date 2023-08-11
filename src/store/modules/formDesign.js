
const state = {
  formData: {},
}

const actions = {
  updateFormData({ commit }, data) {
    commit('UPDATE_FORMDATA', data)
  }
}

const mutations = {
  UPDATE_FORMDATA(state, data) {
    state.formData = data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
