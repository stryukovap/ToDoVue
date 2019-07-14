<template>
    <div class="home">
        <header-app/>
        <ul class="todo-list">
            <TodoItem v-for="(todo,index) in toDoList"
                      v-bind:key="index"
                      v-bind:title="todo.title"
                      v-bind:description="todo.description"
                      v-bind:id="todo._id"
            />
        </ul>
        <button @click.prevent="showModal" class="todo_plus">Add</button>
        <ModalToDo @click.prevent="closeModal" v-bind:action="'POST'" v-if="modalShow"/>

    </div>
</template>

<script>

    import HeaderApp from "../components/HeaderApp";
    import TodoItem from "../components/TodoItem";
    import ModalToDo from '../components/ModalToDo';
    import axios from 'axios';
    import {mapActions, mapState} from 'vuex';

    export default {
        name: 'home',
        data: function () {
            return {
                modalShow: false
            }
        },
        components: {
            ModalToDo,
            HeaderApp,
            TodoItem
        },
        computed:
            mapState([
                'authUser',
                'toDoList'
            ]),
        mounted() {
            this.ActionGet(this.authUser);
            // this.gettodo()
        },
        methods: {
            ...mapActions(['ActionGet']),
            // gettodo() {
            //     axios.get(`https://raysael.herokuapp.com/todo?author=${this.authUser}`)
            //         .then(response => {
            //             // handle success
            //             window.console.log(response);
            //             this.$store.commit('toDoList', response.data)
            //         })
            //         .catch(error => {
            //             // handle error
            //             window.console.log(error);
            //         });
            // }
            // ,
            closeModal() {
                this.modalShow = false;
            },
            showModal() {
                this.modalShow = true;
            }
        }
    }
</script>
<style lang="scss">
    .todo-list {
        display: flex;
        flex-wrap: wrap;
    }
</style>
