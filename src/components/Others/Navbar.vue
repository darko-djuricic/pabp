<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark mb-5">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Products</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><h5 class="dropdown-header">All categories</h5></li>
            <li v-for="c in categories" :key="c.categoryId"><a class="dropdown-item" href="#" @click="GetCategoryProducts(c.categoryId)">{{c.categoryName}}</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-light" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
</template>

<script>

export default {
  data(){
    return{
      
    }
  },
  props:{
    categories: Array,
  },
  emits: ['selectCategoryEvent'],
  methods:{
      GetCategoryProducts: function(id){
        this.$emit('selectCategoryEvent', id)
      }
  }
}
</script>

<style>

</style>