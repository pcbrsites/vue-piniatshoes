// counterStore.spec.ts
import { setActivePinia, createPinia } from "pinia";
// import { useCart } from "@/store/cart";

describe("Counter Store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  //   it("increments", () => {
  //     const counter = useCart();
  //     // expect(counter.n).toBe(0);
  //     // counter.increment();
  //     // expect(counter.n).toBe(1);
  //   });

  //   it("increments by amount", () => {
  //     const counter = useCart();
  //     // counter.increment(10);
  //     // expect(counter.n).toBe(10);
  //   });
});
