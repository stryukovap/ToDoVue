<template>
    <li class="todo_item">
        <div class="todo_item-wrapper">
            <h3 class="todo_title">
                {{title}}
            </h3>
            <button @click.prevent="editToDo(id)" v-bind:action="'PATCH'">Edit</button>
            <button @click.prevent="delToDo(id)">Delete</button>
        </div>
        <p class="todo_description">
            {{description}}
        </p>
        <CreateToDo @click.prevent="closeModal" v-if="modalShow"
                    v-bind:id="id"
                    v-bind:title="title"
                    v-bind:description="description"/>
    </li>
</template>

<script>
    import axios from 'axios';
    import CreateToDo from './ModalToDo';

    export default {
        name: "TodoItem",
        components: {
            CreateToDo
        },
        data() {
            return {
                modalShow: false
            }
        },
        props: {
            id: String,
            title: String,
            description: String
        },
        methods: {
            closeModal() {
                this.modalShow = false;
            },
            editToDo(id) {
                this.modalShow = true;
            },
            delToDo(id) {
                axios.delete(`https://raysael.herokuapp.com/todo/${id}`)
                    .then(response => {
                        // handle success
                        window.console.log(response);
                        this.$store.commit('toDoListDel', id);
                        this.$store.dispatch('ActionGet', this.$store.state.authUser);
                    })
                    .catch(error => {
                        // handle error
                        window.console.log(error);
                    });
                this.modalShow = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    .todo_item {
        width: 30%;
    }
</style>
