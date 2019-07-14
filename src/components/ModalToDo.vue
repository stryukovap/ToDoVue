<template>
    <div class="popup">
        <form class="todo__item" @submit.prevent='saveGroup(action)'>
            <label for="todo_title">Title</label>
            <input id="todo_title" v-model="current_title" type="text" class="todo__title">
            <label for="todo_description">Description</label>
            <textarea id="todo_description" v-model="current_description" class="todo__description" rows="7" wrap="hard"></textarea>
            <input class="todo__submit" type="submit" value="Submit">
            <button class="popup__exit" v-on="$listeners"></button>
        </form>
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

<style scoped lang="scss">
    .popup {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100vw;
        height: 100vh;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 2;
        overflow: hidden;
        transition: 0.64s ease-in-out;

        &__exit {
            margin-top: 55px;
            background-color: transparent;
            border: none;
            align-self: center;
            width: 50px;
            height: 50px;
            background-size: 40px 40px;
            background-repeat: no-repeat;
            background-position: center;
            transform: rotate(45deg);
            background-image: url(data:image/png;base64,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);

            &:hover {
                cursor: pointer;
            }
        }
    }

    .todo {
        label {
            margin: 30px 0 10px 0;
        }

        &__submit {
            margin-top: 15px;
            background-color: transparent;
            border: 1px solid #333333;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 16px;
            align-self: center;

            &:hover {
                background-color: #215b82;
                cursor: pointer;
                color: #ffffff;
            }
        }

        &__item {
            padding: 100px 20px 0 20px;
            flex-direction: column;
            position: absolute;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            max-width: 50vw;
            max-height: 100vh;
            height: 100%;
            width: 35%;
            left: 0;
            top: 0;
            background-color: #fff;
            transition: 0.64s ease-in-out;
            overflow-y: auto;
            z-index: 5;
            @media(max-width: 769px){
                width: 80%;
            }
        }

        &__title, &__description {
            width: 100%;
            box-sizing: border-box;
            font-family: Roboto,sans-serif;
        }

        &__description {
            resize: none;
        }
    }
</style>
