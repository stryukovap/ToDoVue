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
    import {mapActions, mapState} from 'vuex';

    export default {
        name: 'home',
        data: function () {
            return {}
        },
        components: {
            HeaderApp, TodoItem
        },
        computed:
            mapState([
                'authUser',
                'toDoList'
            ]),
        mounted() {
            this.getToDos()
        },
        methods: {
            ...mapActions([
                'getToDos'
            ])
        }
    }
</script>
<style lang="scss">
    * {
        font-family: Roboto, sans-serif;
    }
</style>
