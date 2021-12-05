<template>
    <tr class="align-middle clickable" :class="{'bg-danger text-light': product.discontinued}">
        <td @click="UpdateProduct(product)" >{{product.productId}}</td>
        <td @click="UpdateProduct(product)">{{product.productName}}</td>
        <td @click="UpdateProduct(product)">{{quantityPerUnit}}</td>
        <td @click="UpdateProduct(product)">{{supplier}}</td>  
        <td @click="UpdateProduct(product)">{{product.unitPrice}}</td>  
        <td @click="UpdateProduct(product)">{{product.unitsInStock}}</td>  
        <td @click="UpdateProduct(product)">{{product.unitsOnOrder}}</td>
        <td @click="UpdateProduct(product)">{{product.reorderLevel}}</td>
        <td><a @click="ShowOrderDetails(product.orderDetails, product.productName)" class="text-primary">Show</a></td>
        <td @click="UpdateProduct(product)" class="text-success fw-bold">{{totalValue}}</td>
        <td class="bg-light">
            <!-- <a href="#modalYesNo" data-bs-toggle="modal" @click="DeleteProduct(product.productId)">
                <i class="material-icons text-danger">delete</i>
            </a> -->
            <a href="#" @click="DeleteProduct(product)">
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
    emits: ['productDeleteEvent', 'productUpdateEvent'],
    computed:{
        totalValue(){
            return (this.product.unitPrice*this.product.unitsInStock).toFixed(2);
        },
        supplier(){
            return this.product.supplier?this.product.supplier.companyName:"No supplier"
        },
        quantityPerUnit(){
            return this.product.quantityPerUnit?this.product.quantityPerUnit:'/';
        },
    },
    methods:{
        DeleteProduct: function(product){
            this.$vueSimpleAlert.confirm(`Are you sure you want to delete product "${product.productName}"?`, 'Delete confirmation', 'info',{
                confirmButtonText: 'Yes',
                cancelButtonText: `No`,
            })
            .then(()=>{
                this.$emit('productDeleteEvent',product.productId)
            })
        },
        UpdateProduct: function(product){
            this.$emit('productUpdateEvent', product)
        },
        ShowOrderDetails(array, productName){
            let orderDetails=`<div class='scrollable'><table class="table table-hover text-start mt-4 border-top">
                                <tbody>`;
            array.forEach(o => {
                orderDetails+=`<tr >
                <td class="ps-5">
                <h4>Order #${o.orderId}</h4>
                <b class="fw-bold">Quantity: </b><span>${o.quantity}</span><br>
                <b class="fw-bold">Discount: </b><span class="${o.discount>0?'text-primary':''}">${o.discount*100}%</span><br>
                <b class="fw-bold">Unit price: </b><span class='text-success'>${o.unitPrice}</span><br>
                </td>
            </tr>`
            });
            orderDetails+='</tbody></table></div>'

            this.$vueSimpleAlert.alert('','','',{
                title: `Order details for product "${productName}"`,
                html: orderDetails,
                position: 'top',
                width: 800
            })
        }
    }

}
</script>

<style>
    .clickable{
        cursor: pointer;
    }
    .scrollable{
        height: 600px !important;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>