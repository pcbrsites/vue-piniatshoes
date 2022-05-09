<template>
  <div class="cart">
    <table class="table">
      <thead>
        <tr>
          <th aria-label="product image" />
          <th>PRODUTO</th>
          <th>QTD</th>
          <th>SUBTOTAL</th>
          <th aria-label="delete icon" />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in cartFormatted"
          data-testid="product"
          :key="product.id"
        >
          <td>
            <img :src="product.image" :alt="product.title" />
          </td>
          <td>
            <strong>{{ product.title }}</strong>
            <span>{{ product.priceFormatted }}</span>
          </td>
          <td>
            <div>
              <button
                type="button"
                data-testid="decrement-product"
                :disabled="product.amount <= 1"
                @click="handleProductDecrement(product)"
              >
                <IconAddCircleOutline></IconAddCircleOutline>
                <!-- <MdRemoveCircleOutline size={20} /> -->
              </button>
              <input
                type="text"
                data-testid="product-amount"
                readOnly
                :value="product.amount"
              />
              <button
                type="button"
                data-testid="increment-product"
                @click="handleProductIncrement(product)"
              >
                <IconAddCircleOutline></IconAddCircleOutline>
              </button>
            </div>
          </td>
          <td>
            <strong>{{ product.totalFormatted }}</strong>
          </td>
          <td>
            <button
              type="button"
              data-testid="remove-product"
              @click="handleRemoveProduct(product.id)"
            >
              <IconDelete></IconDelete>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <footer>
      <button type="button">Finalizar pedido</button>

      <div class="total">
        <span>TOTAL</span>
        <strong>{{ total }}</strong>
      </div>
    </footer>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import IconAddCircleOutline from "@/components/Icons/IconAddCircleOutline.vue";
import IconDelete from "@/components/Icons/IconDelete.vue";
import { useCart } from "@/store/cart";
import { darken } from "polished";
import { formatPrice } from "@/util/format";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
  totalFormatted: string;
}
export default defineComponent({
  components: { IconAddCircleOutline, IconDelete },
  setup() {
    const darkenColor = ref(darken(0.03, "#7159c1"));
    const cart = useCart();

    const cartFormatted = computed<ProductFormatted[]>(() =>
      cart.cart.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
        totalFormatted: formatPrice(product.price * product.amount),
      }))
    );

    const total = computed(() => formatPrice(cart.total));

    function handleProductIncrement(product: Product) {
      cart.updateProductAmount({
        productId: product.id,
        amount: product.amount + 1,
      });
    }

    function handleProductDecrement(product: Product) {
      cart.updateProductAmount({
        productId: product.id,
        amount: product.amount - 1,
      });
    }

    function handleRemoveProduct(productId: number) {
      cart.removeProduct(productId);
    }

    return {
      cartFormatted,
      total,
      darkenColor,
      handleProductIncrement,
      handleProductDecrement,
      handleRemoveProduct,
    };
  },
});
</script>

<style lang="scss" scoped>
.cart {
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: #c0b6e4;
      }
    }
  }
}

.table {
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  img {
    height: 100px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;

    svg {
      color: #7159c1;
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: #c0b6e4;
      }
    }

    &:disabled {
      svg {
        color: #c0b6e4;
        cursor: not-allowed;
      }
    }
  }

  .total {
    display: flex;
    align-items: baseline;

    span {
      color: #999;
      font-weight: bold;
    }

    strong {
      font-size: 28px;
      margin-left: 5px;
    }
  }
}
</style>
