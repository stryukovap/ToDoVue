<template>
    <div class="header-logged">
        <span class="user_name">{{this.$store.state.authUser}}</span>
        <button @click="userLogOut">LogOut</button>
    </div>
</template>
<script>
    export default {
        name: 'header-app',
        data() {
            return {}
        },
        methods: {
            userLogOut: function () {
                localStorage.removeItem("lbUser");
                this.$store.commit('authUser', '');
                this.$store.commit('toDoList', []);
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
