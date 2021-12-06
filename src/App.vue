<template>
  <navbar :categories="categories" @selectCategoryEvent="OnSelectedCategory" />
  <div class="container pt-5 mt-5">
    <div v-if="selected" class="pt-5">
      <!-- Breadcrumb -->
      <breadcrumb @homeEvent="OnHome">{{category.categoryName}}</breadcrumb>
      <product-table @productsChangeEvent="OnProductChange" :category="category" :products="selected" :suppliersList="suppliers" />
    </div>
    <div class="text-center pt-5" v-else>
      <div v-if='isLoaded'>
        <h1 class="display-4 text-center mb-5">Welcome! Choose category:</h1>
        <div class="row pt-3">
          <categories v-for="c in categories" :key="c.categoryId" @click="OnSelectedCategory(c.categoryId)">
            <template #header>{{ c.categoryName }} ({{NumOfProducts(c.categoryId)}})</template>
            <template #desc>{{ c.description }}</template>
          </categories>
        </div>
      </div>
      <spinner v-else />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Others/Navbar.vue";
import Categories from "./components/Categories/Categories.vue";
import ProductTable from "./components/Products/ProductTable.vue";
import Breadcrumb from './components/Others/Breadcrumb.vue';
import Spinner from './components/Others/Spinner.vue';


export default {
  name: "App",
  data() {
    return {
      products: undefined,
      categories: undefined,
      suppliers: undefined,
      orderDetails: undefined,
      orders: undefined,
      selected: undefined,
      category: "",
    };
  },
  components: {
    Navbar,
    Categories,
    ProductTable,
    Breadcrumb,
    Spinner,
  },
  computed:{
    isLoaded(){
      return this.products && this.categories && this.suppliers && this.orderDetails;
    }
  },
  methods: {
    GetProducts: function () {
      this.$axios
        .get("http://94.156.189.137:8000/api/Products")
        .then((res) => {
          this.products = res.data;

        })
        .catch((err) => {
          console.error(err);
          this.ErrorMessage('We cannot load products');
        });
    },
    GetCategories: function () {
      this.$axios
        .get("http://94.156.189.137:8000/api/Categories")
        .then((res) => {
          this.categories = res.data;
        })
        .catch((err) => {
          console.error(err);
          this.ErrorMessage('We cannot load categories');
        });
    },
    GetSuppliers: function () {
      this.$axios
        .get("http://94.156.189.137:8000/api/Suppliers")
        .then((res) => {
          this.suppliers = res.data;
        })
        .catch((err) => {
          console.error(err);
          this.ErrorMessage('We cannot load suppliers');
        });
    },
    GetOrderDetails: function(){
      this.$axios
        .get("http://94.156.189.137:8000/api/OrderDetails")
        .then((res) => {
          this.orderDetails=res.data;
        })
        .catch((err) => {
          console.error(err);
          this.ErrorMessage('We cannot load suppliers');
        });
    },
    GetOrders: function(){
      this.$axios.get("http://94.156.189.137:8000/api/Orders")
          .then(()=>{
              
          })
          .catch(err=>{
              console.error(err);
              this.$vueSimpleAlert.alert(err.message, 'Error', 'error')
          })
    },
    OnSelectedCategory: function (id) {
      this.category=this.categories.find((el) => el.categoryId === id);
      this.selected = this.products.filter((el) => el.categoryId === id);

      if(this.selected.length>0){
        //Getting category, supplier and order details for products
        this.selected.forEach((p) => {
          let supp = this.suppliers.find((el) => el.supplierId === p.supplierId);
          let cat = this.categories.find((el) => el.categoryId === id);
          let ordLst= this.orderDetails.filter(el=> el.productId === p.productId)
          if (supp) p.supplier = supp;
          if (cat) p.category = cat;
          if(ordLst) p.orderDetails=ordLst;
        });
      }
    },
    OnProductChange: function(){
     this.GetProducts()
    },
    OnHome: function()  { this.selected = undefined },
    NumOfProducts: function(id){
      return this.products.filter(el=>el.categoryId===id).length;
    },
    ErrorMessage: function(message){
      this.$vueSimpleAlert.alert(`${message}. Please, try later.`, 'Error', 'error')
    }
  },
  created() {
    this.GetCategories();
    this.GetProducts();
    this.GetSuppliers();
    this.GetOrderDetails();
    this.GetOrders();
  },
};
</script>


