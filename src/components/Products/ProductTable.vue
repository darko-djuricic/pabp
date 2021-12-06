<template>
    <!-- Table of products -->
    <div v-if="!showForm" class="mb-5">
        <product-filters v-if="showFilters" :unitPrices="unitPrices" @ApplyFilterEvent="OnApplyFilters" :suppliers="suppliers"/>
        <table class="table table-hover text-center table-bordered">
            <thead class="align-middle bg-light">
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Product name</th>
                <th scope="col">Quantity per unit</th>
                <th scope="col">Supplier</th>
                <th scope="col">Unit price</th>
                <th scope="col">Units in stock</th>
                <th scope="col">Units on order</th>
                <th scope="col">Reorder level</th>
                <th scope="col">Order details</th>
                <th scope="col">Total value</th>
                <th class="text-danger" scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <product-row @productUpdateEvent="OnProductUpdate" @productDeleteEvent="OnProductDelete" v-for="p in listProducts" :key="p.productId" :product="p" />
            </tbody>
        </table>
        <div v-show="!isAnyProducts" class="text-center mt-5" id="availabilityMessage">
            <h1 class="display-5 mb-2">There is no available products</h1>
            <h5 v-show="discontinuedProductsCount>0" class="text-danger mb-5">{{discontinuedProductsCount}} discontinued product{{singularPlural}}. To see it, check "Discontinued" in filters section</h5>
        </div> 
        <div class="row justify-content-between">
        <div class="col-md-6 mb-3">
            <small v-show="isDiscontinuedView" class="me-3 text-danger">
                <span class="badge bg-danger text-danger">.</span>
                Discontinued
            </small>
        </div>
        <div class="col-md-6 text-md-end">
            <!-- <button data-bs-toggle="modal" data-bs-target="#productModal" class="btn btn-dark">Add product</button> -->
            <button class="btn btn-dark" @click="OnProductUpdate(null)">Add product</button>
        </div>
        </div>
    </div>
    <div v-else class="mt-4">
        <div class="row border-bottom">
            <a href="#" class="text-decoration-none col" @click="showForm=false">
                <span class="material-icons align-middle">arrow_back</span>
                <span class="align-top ps-2">Back to table</span>
            </a>
            <h2 class="col text-end">{{product?"Update":"Add"}} product</h2>
        </div>
        <product-form  class="mt-3" @submitFormEvent="OnSubmitForm" :selected_product="product" :category="category" :suppliers="suppliersList" />
    </div>
</template>

<script>
import ProductRow from './ProductRow.vue';
import ProductFilters from './ProductFilters.vue';
import ProductForm from './ProductForm.vue';
export default {
    components: { ProductRow, ProductFilters, ProductForm },
    data(){
        let products=this.GetDefaultProductsList(this.products);
        return{
            originalProductsCopy: this.products,
            listProducts: products,
            showForm: false,
            showFilters: true,
            product: null,
            unitPrices: this.products.map(el=>el.unitPrice),
            suppliers: [...new Set(this.products.map(el=>el.supplier).filter(el=>el))]
        }
    },
    emits: ['productsChangeEvent'],
    props: {
        products: Array,
        suppliersList: Array,
        category: Object,
    },
    computed:{
        singularPlural(){
            return this.discontinuedProductsCount>1?'s':'';
        },
        isAnyProducts(){
            return this.listProducts.length>0;
        },
        discontinuedProductsCount(){
            return this.originalProductsCopy.filter(el=>el.discontinued).length;
        },
        isDiscontinuedView(){
            return this.listProducts.map(el=>el.discontinued).includes(true)
        }
    },
    methods:{
        GetDefaultProductsList: function(products){
            return products.filter(el=> !el.discontinued).sort((a,b)=>a.reorderLevel<b.reorderLevel);
        },
        OnProductDelete: function(id){
            this.showFilters=false;
            this.$axios.delete(`http://94.156.189.137:8000/api/Products/${id}`)
            .then(()=>{
                this.originalProductsCopy=this.originalProductsCopy.filter(p=>p.productId!==id);
                this.listProducts=this.listProducts.filter(p=>p.productId!==id);
                this.$emit('productsChangeEvent', null);
                this.$vueSimpleAlert.alert('You have successfully deleted the product', 'Delete confirmation', 'success', {
                    timer: 3000,
                })
                this.UpdateUnitPricesSuppliers();
            })
            .catch(err=>{
                this.$vueSimpleAlert.alert(`Error: ${err.message}`, 'Delete confirmation', 'error', {
                    timer: 3000,
                })
            })
        },
        OnApplyFilters: function(filters){
            let functions=[];
            this.listProducts=this.originalProductsCopy;
            console.log(this.originalProductsCopy);

            if(filters.suppliers.length>0){
                functions.push(el=> filters.suppliers.find(id=> id===el.supplierId));
            }
            if(!filters.discontinued){
                functions.push(el=> !el.discontinued)
            }
            functions.push(el=> el.unitPrice<=filters.range)
            functions.forEach(func => {
                this.listProducts=this.listProducts.filter(func);
            });


            
        },
        OnProductUpdate: function(product){
            this.product=product;
            this.showForm=true;
        },
        OnSubmitForm: function(args){
            let product=args.product;
            let Func=args.isNew?this.AddProduct:this.UpdateProduct;
            Func(product);
        },
        AddProduct: function(product){
            this.$axios
            .post("http://94.156.189.137:8000/api/Products", product)
            .then((res) => {
                product.productId=res.data.productId;
                product.category=this.category;
                product.supplier=this.suppliersList.find(el=>el.supplierId===product.supplierId)
                
                this.originalProductsCopy.push(product)
                if(!product.discontinued) 
                    this.listProducts.push(product)

                this.$emit('productsChangeEvent', null);
                this.$vueSimpleAlert.alert('You have successfully added a new product', 'Product confirmation', 'success', {
                    timer: 3000,
                })
                
                this.UpdateUnitPricesSuppliers();
            })
            .catch((err) => {
                console.error(err.message);
                this.$vueSimpleAlert.alert('Something went wrong, please try later.', 'Product confirmation', 'error', {
                    timer: 3000,
                })
            });
        },
        UpdateProduct: function(product){
            this.$axios
            .put(`http://94.156.189.137:8000/api/Products/${product.productId}`, product)
            .then(() => {
                this.$vueSimpleAlert.alert('You have successfully added a new product', 'Product confirmation', 'success', {
                    timer: 3000,
                })
                //Update supplier
                this.UpdateSupplier(this.originalProductsCopy, product)
                //Show new default view of products
                this.listProducts=this.GetDefaultProductsList(this.originalProductsCopy);
                this.UpdateUnitPricesSuppliers()
            })
            .catch((err) => {
                console.error(err);
                this.$vueSimpleAlert.alert('Something went wrong, please try later.', 'Product confirmation', 'error', {
                    timer: 3000,
                })
            });
        },
        //Updating unit prices and suppliers for the filter
        UpdateUnitPricesSuppliers: function(){
            this.unitPrices=this.originalProductsCopy.map(el=>el.unitPrice);
            this.suppliers=[...new Set(this.originalProductsCopy.map(el=>el.supplier).filter(el=>el))]
            this.showForm=false;
            this.showFilters=true;
            this.listProducts.sort((a,b)=>a.reorderLevel<b.reorderLevel)
        },
        UpdateSupplier(productsList, newProduct){
            let obj= productsList.find(el=>el.productId===newProduct.productId)
            obj.supplier=this.suppliersList.find(el=>el.supplierId===newProduct.supplierId)
        },
        
    },

}
</script>
