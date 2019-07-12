<template>
    <form class="todo_item-create">
        <input v-model="todo.title" type="text" class="todo_title">
        <textarea v-model="todo.description" class="todo_description"></textarea>
        <input type="submit" value="Create">
    </form>
</template>

<script>
    export default {
        name: "CreateToDo",
        data(){
            return{
                todo:{
                    title:'',
                    description:''
                }
            }
        }
    }
</script>

<style scoped>

</style>
