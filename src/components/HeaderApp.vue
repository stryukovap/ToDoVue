<template>
    <div class="header">
        <div class="container">
            <div class="header__wrapper">
                <span class="header__user">{{this.$store.state.authUser}}</span>
                <button class="header__btn" @click="userLogOut">LogOut</button>
            </div>
        </div>
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
    .header {
        padding: 15px;
        border-bottom: 1px solid #333333;
        &__wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 16px;
        }

        &__btn {
            background-color: transparent;
            border: 1px solid #333333;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 16px;

            &:hover {
                background-color: #215b82;
                cursor: pointer;
                color: #ffffff;
            }
        }
    }

</style>
