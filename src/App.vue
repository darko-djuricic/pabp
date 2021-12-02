<template>
  <navbar :categories="categories" @selectCategoryEvent="OnSelectedCategory" />
  <div class="container pt-5 mt-5">
    <div v-if="selected" class="pt-5">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#" @click="selected = undefined">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ selected[0].category.categoryName }}
          </li>
        </ol>
      </nav>
      <product-table :products="selected" />
    </div>
    <div class="text-center pt-5" v-else>
      <h1 class="display-4 text-center mb-5">Welcome! Choose category:</h1>
      <div class="row pt-3">
        <categories
          v-for="c in categories"
          :key="c.categoryId"
          @click="OnSelectedCategory(c.categoryId)"
        >
          <template #header>{{ c.categoryName }}</template>
          <template #desc>{{ c.description }}</template>
        </categories>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Others/Navbar.vue";
import Categories from "./components/Categories/Categories.vue";
import ProductTable from "./components/Products/ProductTable.vue";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      products: undefined,
      categories: undefined,
      selected: undefined,
      suppliers: undefined,
    };
  },
  components: {
    Navbar,
    Categories,
    ProductTable,
  },
  methods: {
    GetProducts: function () {
      axios
        .get("http://94.156.189.137:8000/api/Products")
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => {
          alert("ERROR " + err.message);
        });
    },
    GetCategories: function () {
      axios
        .get("http://94.156.189.137:8000/api/Categories")
        .then((res) => {
          this.categories = res.data;
        })
        .catch((err) => {
          alert("ERROR " + err.message);
        });
    },
    GetSuppliers: function () {
      axios
        .get("http://94.156.189.137:8000/api/Suppliers")
        .then((res) => {
          this.suppliers = res.data;
        })
        .catch((err) => {
          alert("ERROR " + err.message);
        });
    },
    OnSelectedCategory: function (id) {
      this.selected = this.products.filter((el) => el.categoryId === id);

      //Getting category and supplier for products
      this.selected.forEach((p) => {
        let supp = this.suppliers.find((el) => el.supplierId === p.supplierId);
        let cat = this.categories.find((el) => el.categoryId === id);
        if (supp) p.supplier = supp;
        if (cat) p.category = cat;
      });
    },
  },
  mounted() {
    this.GetCategories();
    this.GetProducts();
    this.GetSuppliers();
  },
};
</script>


