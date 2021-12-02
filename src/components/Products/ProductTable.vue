<template>
    <div v-show="showAlert" ref="alert1" :class="{'alert-danger': !success, 'alert-success': success}" class="alert fade show" role="alert">
    </div>
    <!-- Table of products -->
    <product-operations @ApplyFilterEvent="OnApplyFilters" :suppliers="suppliers"/>
    <table class="table table-hover text-center table-bordered">
    <thead class="align-top bg-light">
        <tr>
        <th scope="col">ID</th>
        <th scope="col">Product name</th>
        <th scope="col">Supplier</th>
        <th scope="col">Unit price</th>
        <th scope="col">Units in stock</th>
        <th scope="col">Total value</th>
        <th class="ps-0 pe-0 text-danger" scope="col">Delete</th>
        </tr>
    </thead>
    <tbody>
        <product-row @productDeleteEvent="OnProductDelete" v-for="p in listProducts" :key="p.productId" :product="p" />
    </tbody>
    </table>
    <p><small>* Click on a product to change it</small></p>

    <modal-yes-no :args="id_product" :Operation="DeleteProduct" id="modalYesNo">
        <template #title>Delete product</template>
        <template #body>Are you sure you want to delete this product?</template>
    </modal-yes-no>
</template>

<script>
import ModalYesNo from '../Modals/ModalYesNo.vue';
import ProductRow from './ProductRow.vue';
import axios from 'axios'
import ProductOperations from './ProductOperations.vue';
export default {
    components: { ProductRow, ModalYesNo, ProductOperations },
    data(){
        return{
            listProducts: this.products,
            id_product: 0,
            showAlert: false,
            success: false,
        }
    },
    props: {
        products: Array,
    },
    computed:{
        suppliers(){
            return [...new Set(this.listProducts.map(el=>el.supplier))];
        }
    },
    methods:{
        DeleteProduct: function(id){
            axios.delete(`http://94.156.189.137:8000/api/Products/${id}`)
            .then(()=>{
                this.listProducts=this.listProducts.filter(p=>p.productId!==id);
                this.ShowAlert("You have successfully deleted the product", true);
            })
            .catch(err=>{
                this.ShowAlert(`Error: ${err.message}`, false)
            })
        },
        OnProductDelete: function(id){
            //Passing id of product for delete operation
            this.id_product=id;
        },
        OnApplyFilters: function(suppliers){
            this.listProducts=this.products;
            if(suppliers.length>0)
                this.listProducts=this.listProducts.filter(el=> suppliers.find(id=> id===el.supplierId))
        },
        ShowAlert: function(message, success){
            this.$refs.alert1.innerText = message;
            this.success=success;
            this.showAlert=true;
            setTimeout(()=>this.showAlert=false, 3000);
        }
    }
}
</script>
