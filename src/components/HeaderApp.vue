<template>
    <div class="header-logged">
        <span class="user_name">{{userEmail}}</span>
        <button @click="userLogOut">LogOut</button>
    </div>
</template>
<script>
    export default {
        name: 'header-app',
        data() {
            return {
                userEmail: this.$store.state.authUser,
            }
        },
        methods: {
            userLogOut: function () {
                localStorage.removeItem("lbUser");
                this.$store.commit('authUser', '');
                this.$router.push("/login");
                // alert('messageLogOut');
            },

        },
        computed: {}
    }
</script>
<style scoped lang="scss">
    .header-logged {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
