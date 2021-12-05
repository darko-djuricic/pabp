<template>
  <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#" @click="Home">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <slot />
          </li>
        </ol>
    </nav>
</template>

<script>
export default {
    emits: ['homeEvent'],
    methods: {
        Home: function(){
            this.$emit('homeEvent')
        }
    }
}
</script>

<style>

</style>