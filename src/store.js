import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authUser: JSON.parse(localStorage.getItem("lbUser")),
        toDoList: []
    },
    mutations: {
        toDoList(state, payload) {
            state.toDoList = payload;
        },
        authUser(state, payload) {
            state.authUser = payload;
        },
        toDoListAdd(state, payload) {
            state.toDoList.push(payload);
            return state.toDoList;
        },
        toDoListDel(state, payload) {
            state.toDoList.map((item, index) => {
                if (item._id === payload) {
                    state.toDoList.splice(index, 1);
                }
            });
            return state.toDoList;
        }
    },
    actions: {
        async ActionGet(context,user) {
            await axios.get(`https://raysael.herokuapp.com/todo?author=${user}`)
                .then(response => {
                    // handle success
                    window.console.log(response);
                    context.commit('toDoList', response.data)
                })
                .catch(error => {
                    // handle error
                    window.console.log(error);
                });
        }
    }
})
