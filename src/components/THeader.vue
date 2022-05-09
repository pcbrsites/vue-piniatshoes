<template>
  <header>
    <router-link to="/">
      <img src="@/assets/images/logo.svg" />
    </router-link>
    <router-link to="/cart" class="cart">
      <div>
        <strong>Meu carrinho</strong>
        <span data-testid="cart-size">
          {{ cartSize === 1 ? `${cartSize} item` : `${cartSize} itens` }}
        </span>
      </div>
      <IconShoppingBasket></IconShoppingBasket>
    </router-link>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useCart } from "@/store/cart";
import IconShoppingBasket from "./Icons/IconShoppingBasket.vue";
export default defineComponent({
  components: { IconShoppingBasket },
  setup() {
    const cart = useCart();
    return {
      cartSize: computed(() => cart.cartSize),
    };
  },
});
</script>
<style lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;

  a {
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.7;
    }
  }

  .cart {
    display: flex;
    align-items: center;
    text-decoration: none;
    div {
      text-align: right;
      margin-right: 10px;

      strong {
        display: block;
        color: #fff;
      }

      span {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>
