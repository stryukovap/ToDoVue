import axios from 'axios'

const BASE_URL = 'https://raysael.herokuapp.com/todo';

const state = {
    toDoList: []
}

const mutations = {
    toDoList(state, payload) {
        state.toDoList = payload;
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
}

const actions = {
    async ActionDel(context, {id, authUser}) {
        await axios.delete(`${BASE_URL}/${id}`)
            .then(response => {
                // handle success
                window.console.log(response);
                context.commit('toDoListDel', id);
                context.dispatch('ActionGet', authUser);
            })
            .catch(error => {
                // handle error
                window.console.log(error);
            });
    },
    async ActionGet(context, authUser) {
        await axios.get(`${BASE_URL}?author=${authUser}`)
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
    async ActionPost(context, {authUser, id, title, description}) {
        await axios.post(`${BASE_URL}`,
            {
                "author": authUser,
                "title": title,
                "description": description
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
                    "author": authUser,
                    "title": title,
                    "description": description
                });
                context.dispatch('ActionGet', authUser);
            })
            .catch(error => {
                // handle error
                window.console.log(error);
            });
    },
    async ActionPatch(context, {authUser, id, title, description}) {
        await axios.patch(`${BASE_URL}/${id}`,
            {
                "title": title,
                "description": description
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(response => {
                // handle success
                window.console.log(response);
                context.dispatch('ActionGet', authUser);
            })
            .catch(error => {
                // handle error
                window.console.log(error);
            });
    },
    ActionSave(context, {authUser, id, action, title, description}) {
        // console.log(payload);
        if (action === 'POST') {
            context.dispatch('ActionPost', {authUser, id, title, description})
        } else {
            context.dispatch('ActionPatch', {authUser, id, title, description})
        }
    }
}

export default {
    state,
    actions,
    mutations
}