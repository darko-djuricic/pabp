<template>
<div class="row justify-content-between mb-2 border-bottom">
    <div class="col">
        <a class="mb-2 text-dark" data-bs-toggle="offcanvas" href="#offcanvasFilters">
            <span class="material-icons">filter_alt</span>
        </a>
        
    </div>
    <div class="col text-end pe-4">
        <a href="#" v-show="resetShow" @click="ResetFilters" class="text-danger">Reset</a>
    </div>
</div>
<p><small>* Click on a product to change it</small></p>
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasFilters">
<div class="offcanvas-header border-bottom">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filters</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>
<div class="offcanvas-body">
    <div id="priceFilter">
        <label for="unitPrice" class="form-label"><strong>Products up to the selected value:</strong></label>
        <input v-model="selectedRange" type="range" class="form-range" :min="minRange" :max="maxRange" step="0.1" id="unitPrice">
        <p>Unit price: <i class="text-primary">{{selectedRange}}</i></p>
    </div> 
    <div ref="filterSuppliers"  class="mt-4">
        <strong>Pick a supplier:</strong><br><br>
        <small v-show="listSuppliers.length==0">*No available suppliers</small>
        <div class="form-check" v-for="s in listSuppliers" :key="s.supplierId" @change="AddToFilter(s.supplierId)">
            <input class="form-check-input" type="checkbox" :value="s.supplierId" :id="supplierId(s)">
            <label class="form-check-label" :for="supplierId(s)">
                {{s.companyName}} 
            </label>
        </div>
    </div>
    <div id="showDiscontinued" class="mt-4">
        <strong>Show discontinued:</strong>
        <div class="form-check mt-3">
            <input v-model="discontinued" class="form-check-input" checked type="checkbox" id="discontinued">
            <label class="form-check-label" :for="discontinued">Discontinued</label>
        </div>

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
            filteredSuppliers: [],
            resetShow: false,
            discontinued: false,
            minRange: Math.min.apply(null, this.unitPrices),
            maxRange: Math.ceil(Math.max.apply(null, this.unitPrices)),
            selectedRange: Math.max.apply(null, this.unitPrices)
        }
    },
    props:{
        suppliers: Array,
        unitPrices: Array
    },
    emits: ['ApplyFilterEvent'],
    methods:{
        AddToFilter: function(id){
            let index=this.filteredSuppliers.indexOf(id);
            if(index<0)
                this.filteredSuppliers.push(id);
            else
                this.filteredSuppliers.splice(index,1);
        },
        ApplyFilter(){
            this.resetShow=this.filteredSuppliers.length>0 || this.discontinued || this.selectedRange < this.maxRange;
            this.$emit('ApplyFilterEvent', {suppliers: this.filteredSuppliers, discontinued: this.discontinued, range: this.selectedRange})
        },
        ResetFilters(){
            this.filteredSuppliers=[];
            this.selectedRange= this.maxRange;
            this.discontinued=false;
            this.resetShow=false;
            //Uncheck all the checboxes of suppliers
            this.$refs.filterSuppliers.querySelectorAll('.form-check-input').forEach(el=>el.checked=false);
            this.$emit('ApplyFilterEvent', {suppliers: this.filteredSuppliers, discontinued: this.discontinued, range: this.selectedRange})
        }
    },
    computed:{
        supplierId(){
            return function(supp){
                return `${supp.companyName.replace(' ','')}${supp.supplierId}`
            };
        },
    },
    mounted(){
        
    }
}
</script>

