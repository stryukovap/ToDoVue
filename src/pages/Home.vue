<template>
    <div class="home">
        <header-app/>
        <ul>
            <TodoItem class="todo-list"
                      v-for="(todo,index) in toDoList"
                      v-bind:key="index"
                      v-bind:title="todo.title"
                      v-bind:description="todo.description"
            />
        </ul>
    </div>
</template>

<script>

    import HeaderApp from "../components/HeaderApp";
    import TodoItem from "../components/TodoItem";
    import {mapState} from 'vuex';
    import axios from 'axios';

    export default {
        name: 'home',
        data: function () {
            return {
                // arrayToDo: [],
            }
        },
        components: {
            HeaderApp, TodoItem
        },
        computed:
            mapState([
                'authUser',
                'toDoList'
            ])
        ,
        mounted() {
            const CRUD = axios.create({
                baseURL:'https://raysael.herokuapp.com',
                params:this.authUser
            });
            CRUD.get('https://raysael.herokuapp.com')
                .then(response => {
                    // handle success
                    window.console.log(response);
                })
                .catch(error => {
                    // handle error
                    window.console.log(error);
                })


        },
        methods: {}
    }
</script>
<style lang="scss">
    * {
        font-family: Roboto, sans-serif;
    }
</style>
