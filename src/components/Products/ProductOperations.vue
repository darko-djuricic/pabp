<template>
<div class="row justify-content-between mb-2">
    <div class="col">
        <a class="mb-2 text-dark" data-bs-toggle="offcanvas" href="#offcanvasFilters">
            <span class="material-icons">filter_alt</span>
        </a>
    </div>
    <div class="col text-end pe-4">
        <a href="#" class="text-danger">Reset</a>
    </div>
</div>

<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasFilters">
<div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filters</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>
<div class="offcanvas-body">
    <strong>Pick a supplier:</strong><br><br>
    <div class="form-check" v-for="s in listSuppliers" :key="s.supplierId" @change="AddToFilter(s.supplierId)">
        <input class="form-check-input" type="checkbox" :value="s.supplierId" :id="`${s.companyName}${s.supplierId}`">
        <label class="form-check-label" for="flexCheckDefault">
            {{s.companyName}}
        </label>
    </div>
    <div class="d-grid mt-5">
        <button data-bs-dismiss="offcanvas" @click="ApplyFilter" class="btn btn-dark">Save changes</button>
    </div> 
</div>
</div>
</template>

<script>
export default {
    data(){
        return{
            listSuppliers: this.suppliers,
            filtered: [],
        }
    },
    props:{
        suppliers: Array,
    },
    emits: ['ApplyFilterEvent'],
    methods:{
        AddToFilter: function(id){
            let index=this.filtered.indexOf(id);
            if(index<0)
                this.filtered.push(id);
            else
                this.filtered.splice(index,1);
        },
        ApplyFilter(){
            this.$emit('ApplyFilterEvent', this.filtered)
        }
    }
}
</script>

<style>

</style>