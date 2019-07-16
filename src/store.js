import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const BASE_URL = 'https://raysael.herokuapp.com/todo';

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
        async ActionDel(context, payload) {
            await axios.delete(`${BASE_URL}/${payload}`)
                .then(response => {
                    // handle success
                    window.console.log(response);
                    context.commit('toDoListDel', payload);
                    context.dispatch('ActionGet', context.state.authUser);
                })
                .catch(error => {
                    // handle error
                    window.console.log(error);
                });
        },
        async ActionGet(context) {
            await axios.get(`${BASE_URL}?author=${context.state.authUser}`)
                .then(response => {
                    // handle success
                    window.console.log(response);
                    context.commit('toDoList', response.data);
                })
                .catch(error => {
                    // handle error
                    window.console.log(error);
                });
        },
        async ActionSave(context, payload) {
            console.log(payload);
            if (payload.action === 'POST') {
                await axios.post(`${BASE_URL}`,
                    {
                        "author": context.state.authUser,
                        "title": payload.title,
                        "description": payload.description
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    })
                    .then(response => {
                        // handle success
                        window.console.log(response);
                        context.commit('toDoListAdd', {
                            "author": context.state.authUser,
                            "title": payload.title,
                            "description": payload.description
                        });
                        context.dispatch('ActionGet', context.state.authUser);
                    })
                    .catch(error => {
                        // handle error
                        window.console.log(error);
                    });
            } else {
                await axios.patch(`${BASE_URL}/${payload.id}`,
                    {
                        "title": payload.title,
                        "description": payload.description
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    })
                    .then(response => {
                        // handle success
                        window.console.log(response);
                        context.dispatch('ActionGet', context.state.authUser);
                    })
                    .catch(error => {
                        // handle error
                        window.console.log(error);
                    });
            }
        }
    }
})
