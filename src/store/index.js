import Vue from 'vue';
import Vuex from 'vuex';
import UserStore from './modules/user/index'
import toDoStore from './modules/todos/index'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        UserStore,
        toDoStore
    }
})
