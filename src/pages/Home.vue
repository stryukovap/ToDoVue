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
        <CreateToDo @click.prevent="closeModal" v-if="modalShow" />

    </div>
</template>

<script>

    import HeaderApp from "../components/HeaderApp";
    import TodoItem from "../components/TodoItem";
    import CreateToDo from '../components/CreateToDo';
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
            HeaderApp, TodoItem, CreateToDo
        },
        computed:
            mapState([
                'authUser',
                'toDoList'
            ]),
        mounted() {
            // this.getToDos()
            this.gettodo()
        },
        methods: {
            ...mapActions([

            ]),
        gettodo(){
            axios.get(`https://raysael.herokuapp.com/todo?author=${this.authUser}`)
                .then(response => {
                    // handle success
                    window.console.log(response);
                    this.$store.commit('toDoList', response.data)
                })
                .catch(error => {
                    // handle error
                    window.console.log(error);
                });
        }
        ,
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
    .todo-list{
        display: flex;
        flex-wrap: wrap;
    }
</style>
