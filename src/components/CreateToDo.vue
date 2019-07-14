<template>
    <div>
        <form class="todo_item-create" @click.prevent='saveGroup'>
            <label>
                Title
                <input v-model="todo.title" type="text" class="todo_title">
            </label>
            <label>
                Description
                <textarea v-model="todo.description" class="todo_description"></textarea>
            </label>
            <input type="submit" value="Create">
        </form>
        <button class="popup__exit" v-on="$listeners">X</button>
    </div>

</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import axios from 'axios'

    export default {
        name: "CreateToDo",
        data() {
            return {
                todo: {
                    title: '',
                    description: ''
                }
            }
        },
        computed:
            mapState([
                'authUser',
                'toDoList',

            ]),
        methods: {
            saveGroup: function () {
                // console.log(this.authUser);
                axios.post(`https://raysael.herokuapp.com/todo`,
                    {
                        "author": this.authUser,
                        "title": this.todo.title,
                        "description": this.todo.description
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    })
                    .then(response => {
                        // handle success
                        window.console.log(response);
                        this.$store.commit('toDoListAdd', {
                            author: this.authUser,
                            title: this.todo.title,
                            description: this.todo.description
                        })
                    })
                    .catch(error => {
                        // handle error
                        window.console.log(error);
                    });
                this.$emit("clicked");
            }
        }
    }
</script>

<style scoped>
    .todo_item-create {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
