<template>
    <tr>
        <td>{{product.productId}}</td>
        <td>{{product.productName}}</td>
        <td>{{product.supplier.companyName}}</td>
        <td>{{product.unitPrice}}</td>  
        <td>{{product.unitsInStock}}</td>  
        <td>{{totalValue}}</td>
        <td>
            <a href="#modalYesNo" data-bs-toggle="modal" @click="DeleteProduct(product.productId)">
                <i class="material-icons text-danger">delete</i>
            </a>
        </td>
    </tr>
    
</template>

<script>

export default {
    props:{
        product: {
            productId: Number,
            productName: String,
            category:{
                categoryId: Number,
                categoryName: String,
            },
            supplier: Object,
            unitPrice: Number,
            unitsInStock: Number,
        },
    },
    emits: ['productDeleteEvent'],
    computed:{
        totalValue(){
            return this.product.unitPrice*this.product.unitsInStock;
        },
    },
    methods:{
        DeleteProduct: function(id){
            this.$emit('productDeleteEvent', id)
        }
    }

}
</script>

<style>

</style>