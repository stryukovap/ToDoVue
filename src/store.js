import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authUser: JSON.parse(localStorage.getItem("lbUser")),
        toDoList: [{
            title: 'title1',
            description: 'description1'

        },
            {
                title: 'title2',
                description: 'description2'
            },
            {
                title: 'title3',
                description: 'description3'
            }]
    },
    mutations: {
        toDoList(state, payload) {
            state.toDoList = payload;
        },
        authUser(state, payload) {
            state.authUser = payload;
        }
    },
    actions: {
        getToDos(context) {
            axios.get(`https://raysael.herokuapp.com/todo?author=${this.authUser}`)
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
