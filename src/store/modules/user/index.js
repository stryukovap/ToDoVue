const state = {
    authUser: JSON.parse(localStorage.getItem("lbUser"))
}
const mutations = {
    authUser(state, payload) {
        state.authUser = payload;
    }
}


export default {
    state,
    mutations
}