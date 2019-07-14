<template>
    <li class="todo_item">
        <div class="todo_item-wrapper">
            <h3 class="todo_title">
                {{title}}
            </h3>
            <button>Edit</button>
            <button @click.prevent="delToDo(id)">Delete</button>
        </div>
        <p class="todo_description">
            {{description}}
        </p>
    </li>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "TodoItem",
        props: {
            id: String,
            title: String,
            description: String
        },
        methods: {
            delToDo(id) {
                axios.delete(`https://raysael.herokuapp.com/todo/${id}`)
                    .then(response => {
                        // handle success
                        window.console.log(response);
                        this.$store.commit('toDoListDel', id);
                        this.$store.dispatch('ActionGet',this.$store.state.authUser);
                    })
                    .catch(error => {
                        // handle error
                        window.console.log(error);
                    });
            }
        }
    }
</script>

<style scoped lang="scss">
    .todo_item {
        width: 30%;
    }
</style>
