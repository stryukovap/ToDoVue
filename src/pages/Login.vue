<template>
    <form class="user" @submit.prevent="userLogin" novalidate>
        <img src="" alt="user_photo" class="user_photo">
        <input type="email" v-model="userEmail" name="email" placeholder="Enter email">
        <input type="submit" value="Submit" >
        <div v-if="regexEmail" class="error">Error email</div>
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
                    console.log(this.$route);
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
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
