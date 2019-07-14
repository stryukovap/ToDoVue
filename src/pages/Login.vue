<template>
    <form class="user" @submit.prevent="userLogin" novalidate>
        <svg class="user__photo" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512">
            <path fill="currentColor" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2
             304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400
             464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4
             86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1
             96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path>
        </svg>
        <label class="user__label" for="umail">Enter email</label>
        <input class="user__input" id="umail" type="email" v-model="userEmail" name="email">
        <input class="user__btn" type="submit" value="Submit">
        <div v-if="regexEmail" class="user__error">Error email</div>
    </form>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                userEmail: '',
                regexEmail: false
            }
        },
        methods: {
            userLogin: function () {
                const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                this.regexEmail = false;
                if (emailRegExp.test(this.userEmail)) {
                    // alert('sodergit');
                    localStorage.setItem(
                        "lbUser",
                        JSON.stringify(this.userEmail));
                    this.$store.commit('authUser', this.userEmail);
                    // console.log(this.$route);
                    this.$router.push("/");
                } else {
                    // alert('nesodergit');
                    this.regexEmail = true;
                }

            }
        }
    }
</script>

<style scoped lang="scss">
    .user {
        margin-top: 150px;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 16px;

        &__photo {
            width: 50px;
            height: auto;
        }

        &__label {
            margin-top: 30px;
        }

        &__input {
            margin-top: 10px;
            background-color: transparent;
            border: 1px solid #333333;
            padding: 5px 10px;
            border-radius: 5px;
            font-family: Roboto, sans-serif;
            font-size: 16px;
        }

        &__btn {
            margin-top: 15px;
            background-color: transparent;
            border: 1px solid #333333;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 16px;
            &:hover{
                background-color: #215b82;
                cursor: pointer;
                color: #ffffff;
            }
        }
        &__error{
            margin-top: 10px;
            background-color: #f0142d;
            padding: 5px 10px;
        }
    }
</style>
