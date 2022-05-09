import { mount, RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import routes from "@/router";

import THeader from "@/components/THeader.vue";
import { useCart } from "@/store/cart";

describe("THeader", () => {
  beforeEach(() => {
    // setActivePinia(createPinia());
  });

  it("should be able to render the amount of products added to cart", () => {
    const wrapper = mount(THeader, {
      global: {
        plugins: [
          routes,
          createTestingPinia({
            initialState: {
              card: {
                cart: [
                  {
                    amount: 2,
                    id: 1,
                    image:
                      "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg",
                    price: 179.9,
                    title: "Tênis de Caminhada Leve Confortável",
                  },
                  {
                    amount: 1,
                    id: 2,
                    image:
                      "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg",
                    price: 139.9,
                    title:
                      "Tênis VR Caminhada Confortável Detalhes Couro Masculino",
                  },
                ],
              },
            },
          }),
        ],
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    expect(wrapper.get('[data-testid="cart-size"]').text()).toMatch("2 itens");
  });
});
