<template>
    <li class="todo_item">
        <div class="todo_item-wrapper">
            <h3 class="todo_title">
                {{title}}
            </h3>
            <button>Edit</button>
            <button>Delete</button>
        </div>
        <p class="todo_description">
            {{description}}
        </p>
    </li>
</template>

<script>
    export default {
        name: "TodoItem",
        props: {
            title: String,
            description: String
        }
    }
</script>

<style scoped lang="scss">

</style>