<template>
    <h1 class="header" >
        <slot></slot>
    </h1>
</template>

<script>
export default {
    name: "Header",
    props: [""]
}
</script>

<style scoped>
    .header{
        font-size: 25px;
        margin-bottom: 20px;
       
    }
</style>