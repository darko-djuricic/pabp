<template>
    <tr>
        <td>{{order.discount*100}}%</td>
    </tr>
</template>

<script>
export default {
    props:{
        order: Object
    }
}
</script>

<style>

</style>