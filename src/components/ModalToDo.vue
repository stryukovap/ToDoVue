<template>
    <div>
        <form class="todo_item-create" @submit.prevent='saveGroup(action)'>
            <label>
                Title
                <input v-model="current_title" type="text" class="todo_title">
            </label>
            <label>
                Description
                <textarea v-model="current_description" class="todo_description"></textarea>
            </label>
            <input type="submit" value="Submit">
        </form>
        <button class="popup__exit" v-on="$listeners">X</button>
    </div>

</template>
<script>
    import {mapState} from 'vuex';
    import axios from 'axios'

    export default {
        name: "ModalToDo",
        props: {
            id: String,
            title: String,
            description: String,
            action: String
        },
        data() {
            return {
                current_title: this.title,
                current_description: this.description,
            }
        },
        computed:
            mapState([
                'authUser',
                'toDoList',

            ]),
        methods: {
            saveGroup: function (action) {
                // console.log(action);
                if (action === 'POST') {
                    axios.post(`https://raysael.herokuapp.com/todo`,
                        {
                            "author": this.authUser,
                            "title": this.current_title,
                            "description": this.current_description
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
                                title: this.current_title,
                                description: this.current_description
                            });
                            this.$store.dispatch('ActionGet', this.$store.state.authUser);
                        })
                        .catch(error => {
                            // handle error
                            window.console.log(error);
                        });
                } else {
                    axios.patch(`https://raysael.herokuapp.com/todo/${this.id}`,
                        {
                            "title": this.current_title,
                            "description": this.current_description
                        }, {
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            }
                        })
                        .then(response => {
                            // handle success
                            window.console.log(response);
                            this.$store.dispatch('ActionGet', this.$store.state.authUser);
                        })
                        .catch(error => {
                            // handle error
                            window.console.log(error);
                        });
                }

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
