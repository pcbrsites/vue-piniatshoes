<template>
  <div class="home">
    <ul>
      <li v-for="(product, key) in products" :key="key + product.id">
        <img :src="product.image" :alt="product.title" />
        <strong>{{ product.title }}</strong>
        <span>{{ product.priceFormatted }}</span>
        <button
          type="button"
          data-testid="add-product-button"
          @click="handleAddProduct(product.id)"
        >
          <div data-testid="cart-product-quantity">
            <IconAddShoppingCart></IconAddShoppingCart>
            {{ cartItemsAmount[product.id] || 0 }}
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import IconAddShoppingCart from "@/components/Icons/IconAddShoppingCart.vue";
import { useCart } from "@/store/cart";
import { api } from "../services/api";
import { darken } from "polished";
import { formatPrice } from "../util/format";
import { CartItemsAmount } from "@/types";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

export default defineComponent({
  components: { IconAddShoppingCart },
  setup() {
    //
    const cart = useCart();
    const darkenColor = ref(darken(0.06, "#7159c1"));

    const products = ref<ProductFormatted[]>([]);

    const loadProducts = async () => {
      const { data } = await api.get("/products");
      const productItems: ProductFormatted[] = data.map((product: Product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      products.value = productItems;
    };

    const handleAddProduct = (productId: number) => {
      cart.addProduct(productId);
    };

    onMounted(async () => {
      await loadProducts();
    });
    return {
      darkenColor,
      products,
      cartItemsAmount: computed<CartItemsAmount>(() => cart.cartItemsAmount),
      handleAddProduct,
    };
  },
});
</script>

<style lang="scss" scoped>
.home ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: #c0b6e4;
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
}
</style>
