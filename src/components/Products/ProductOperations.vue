<template>
<a class="mb-2 text-dark" data-bs-toggle="offcanvas" href="#offcanvasFilters">
  <span class="material-icons">filter_alt</span>
</a>
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasFilters">
<div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filters</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>
<div class="offcanvas-body">
    <strong>Pick a supplier:</strong><br><br>
    <div class="form-check" v-for="s in suppliers" :key="s.supplierId" @change="AddToFilter(s.supplierId)">
        <input class="form-check-input" type="checkbox" :value="s.supplierId" :id="`${s.companyName}${s.supplierId}`">
        <label class="form-check-label" for="flexCheckDefault">
            {{s.companyName}}
        </label>
    </div>
    <div class="d-grid">
        <button data-bs-dismiss="offcanvas" @click="ApplyFilter" class="btn btn-outline-dark mt-5">Filter</button>
    </div> 
</div>
</div>
</template>

<script>
export default {
    data(){
        return{
            filtered: [],
        }
    },
    props:{
        suppliers: Array,
    },
    methods:{
        AddToFilter: function(id){
            let index=this.filtered.indexOf(id);
            if(index<0)
                this.filtered.push(id);
            else
                this.filtered.splice(index,1);
        },
        ApplyFilter(){
            
        }
    }
}
</script>

<style>

</style>