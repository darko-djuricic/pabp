<template>
<form class="border p-3 mb-5 shadow">
    <div class="mb-3 col-12 position-relative">
        <label for="productName" class="form-label"><span class="text-danger">* </span>Product name:</label>
        <input @keyup="Validation" v-model.trim="product.productName" type="text" class="form-control form-control-lg " id="productName">
    </div>
    <div class="mb-3">
        <label for="categoryInput" class="form-label"><span class="text-danger">* </span>Category:</label>
        <input type="text" class="form-control form-control-lg" :value="category.categoryName" id="categoryInput" readonly>
    </div>
    <div class="mb-3">
        <label for="supplier" class="form-label"><span class="text-danger">* </span>Supplier:</label>
        <select @change="Validation" v-model="product.supplierId" class="form-select form-control-lg">
            <option value="" class="fw-lighter">--- Select supplier for the product ---</option>
            <option v-for="s in suppliers" :key="s.supplierId" :value="s.supplierId">{{s.companyName}}</option>
        </select>
    </div>
    <div class="mb-3 row">
        <div class="col">
            <label for="productQuantityPerUnit" class="form-label">Quantity per unit:</label>
            <input v-model.trim="product.quantityPerUnit" type="text" placeholder='e.g. "500 ml"'  class="form-control form-control-lg" id="productQuantityPerUnit">
        </div>
        <div class="col">
            <label for="productReorderLevel" class="form-label">Reorder level:</label>
            <input v-model.number="product.reorderLevel" type="number" min="0" class="form-control form-control-lg" id="productReorderLevel">
        </div>
    </div>
    <div class="mb-3 row">
        <div class="col">
            <label for="productUnitPrice" class="form-label">Unit price:</label>
            <input v-model.number="product.unitPrice" type="number" min="0" class="form-control form-control-lg" id="productUnitPrice">
        </div>
        <div class="col">
            <label for="productUnitsInStock" class="form-label">Units in stock:</label>
            <input v-model.number="product.unitsInStock" type="number" min="0" class="form-control form-control-lg" id="productUnitsInStock">
        </div>
        <div class="col">
            <label for="productUnitsOnOrder" class="form-label">Units on order:</label>
            <input v-model.number="product.unitsOnOrder" type="number" min="0" class="form-control form-control-lg" id="productUnitsOnOrder">
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="col">
            <div class="form-check form-switch">
                <input v-model="product.discontinued" class="form-check-input" type="checkbox" id="productDiscontinued">
                <label class="form-check-label" for="productDiscontinued">Discontinued</label>
            </div>
        </div>
        <div class="col text-end">
            <button type="button" class="btn btn-dark" @click="SubmitForm">{{buttonText}}</button>
        </div> 
    </div>
</form>
</template>

<script>
export default {
    data(){
        let obj= {
            categoryId: this.category.categoryId,
            supplierId: '',
            discontinued: false,
            reorderLevel:0,
            unitPrice:0,
            unitsInStock:0,
            unitsOnOrder:0,
        };
        return{
            product: this.selected_product?this.selected_product:obj,
            buttonText: this.selected_product?'Save changes':'Add',
        }
    },
    emits: ['submitFormEvent'],
    props:{
        category: Object,
        suppliers: Array,
        selected_product: Object,
    },
    methods:{
        SubmitForm: function(){
            //Product name validation check
            if(!this.product.productName){
                this.$vueSimpleAlert.alert('Product name is required!', 'Validation', 'warning', {
                    timer: 3000,
                })
                return;
            }
            //Product supplier validation check
            if(this.product.supplierId<0){
                this.$vueSimpleAlert.alert('You must pick supplier for this product!', 'Validation', 'warning', {
                    timer: 3000,
                })
                return;
            }
            //Product numeric fields validation check
            let tmpArray=[this.product.unitPrice, this.product.unitsInStock, this.product.unitsOnOrder, this.product.reorderLevel];
            if(tmpArray.map(el=>el || el===0).includes(false)){
                this.$vueSimpleAlert.alert('Numeric inputs must not contain non-numeric characters', 'Validation', 'warning', {
                    timer: 3000,
                })
                return;
            }
            this.$emit('submitFormEvent', {product: this.product, isNew: this.selected_product?false:true})
        },
        Validation(input){
            let obj=input.target;
            console.log(obj.value);
            obj.classList.remove('valid','novalid')
            obj.classList.add(obj.value?'valid':'novalid')
            // obj.classList.add(obj.value?'border-success':'border-danger')
        }
    }
}
</script>

<style scoped>
    *{
        font-size: 17px;
    }
    .valid{
        border-color: green;
    }
    .novalid{
        border-color: red;
        background-color: rgb(255, 202, 202,0.5);
    }
</style>