import { defineStore } from "pinia";
import { CartItemsAmount, Product, Stock } from "@/types";
import { api } from "@/services/api";
import { createToast } from "mosha-vue-toastify";
const loadStoreCard = () => {
  const storagedCart = localStorage.getItem("@RocketShoes:cart");

  if (storagedCart) {
    return JSON.parse(storagedCart);
  }

  return [];
};

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

export type RootState = {
  cart: Product[];
};

// const addProduct =
export const useCart = defineStore({
  id: "card",
  state: () =>
    ({
      cart: loadStoreCard(),
    } as RootState),
  getters: {
    cartSize({ cart }) {
      return cart.reduce((sum) => {
        return sum + 1;
      }, 0);
    },
    cartItemsAmount({ cart }) {
      return cart.reduce((sumAmount, product) => {
        sumAmount[product.id] = product.amount;
        return sumAmount;
      }, {} as CartItemsAmount);
    },
    total({ cart }) {
      return cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount;
      }, 0);
    },
  },
  actions: {
    setCart(card: Product[]) {
      this.cart = card;
    },
    async addProduct(productId: number) {
      const { amount: stockAmount } = await api
        .get<Stock>(`/stock/${productId}`)
        .then((res) => res.data);

      const newCart = [...this.cart];
      const cartProduct = newCart.find((product) => product.id === productId);
      const currentAmount = cartProduct ? cartProduct.amount : 0;
      const amount = currentAmount + 1;

      if (amount > stockAmount) {
        this.alert("Quantidade solicitada fora de estoque");
        return;
      }
      if (!cartProduct) {
        const product = await api
          .get(`/products/${productId}`)
          .then((res) => res.data);

        const newProduct: Product = {
          ...product,
          amount: 1,
        };

        localStorage.setItem(
          "@RocketShoes:cart",
          JSON.stringify([...newCart, newProduct])
        );
        this.cart = [...newCart, newProduct];
        return;
      } else {
        this.updateProductAmount({ productId, amount });
      }
    },
    async updateProductAmount({ productId, amount }: UpdateProductAmount) {
      try {
        if (amount < 1) {
          this.alert("Erro na alteração de quantidade do produto");
          return;
        }
        const newCart = [...this.cart];
        const cartProduct = newCart.find((product) => product.id === productId);
        if (cartProduct) {
          const { data: stockInfo } = await api.get<Stock>(
            `/stock/${productId}`
          );

          if (amount > stockInfo.amount) {
            this.alert("Quantidade solicitada fora de estoque");
            return;
          }

          this.cart = newCart.map((product) =>
            product.id === productId ? { ...product, amount: amount } : product
          );
          localStorage.setItem(
            "@RocketShoes:cart",
            JSON.stringify(
              newCart.map((product) =>
                product.id === productId
                  ? { ...product, amount: amount }
                  : product
              )
            )
          );
        } else {
          this.alert("Erro na alteração de quantidade do produto");
          return;
        }
      } catch {
        this.alert("Erro na alteração de quantidade do produto");
      }
    },
    removeProduct(productId: number) {
      try {
        const newCard = [...this.cart];
        if (!newCard.find((product) => product.id === productId)) {
          this.alert("Erro na remoção do produto");
          return;
        }
        this.cart = newCard.filter((product) => product.id !== productId);
        localStorage.setItem(
          "@RocketShoes:cart",
          JSON.stringify(newCard.filter((product) => product.id !== productId))
        );
      } catch {
        this.alert("Erro na remoção do produto");
      }
    },
    alert(content: string) {
      createToast(content, { type: "danger" });
    },
  },
});
