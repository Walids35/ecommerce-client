import {create} from "zustand";

const store = ((set) => ({ 
  ls: typeof window !== "undefined" ? window.localStorage : null, 
  cartProducts: [],

  getCartProducts: () => {
    const storedProducts = localStorage.getItem("cartProducts");
    if (storedProducts) {
      set({ cartProducts: JSON.parse(storedProducts) });
    }
  },

  addToCart: (productId) => {
    set((state) => {
      const updatedProducts = [...state.cartProducts, productId];
      localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
      return { cartProducts: updatedProducts };
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      const index = state.cartProducts.indexOf(productId)
      const cartP = [...state.cartProducts]
      console.log("Old Array:", cartP)
      const updatedProducts = cartP.splice(index, 1)
      console.log("Updated Array:",updatedProducts)
      localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
      return { cartProducts: updatedProducts };
    });
  },

  updateCartProduct: (productId, updatedProduct) => {
    set((state) => {
      const updatedProducts = state.cartProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            ...updatedProduct,
          };
        }
        return product;
      });
      localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
      return { cartProducts: updatedProducts };
    });
  },

  clearCart: () => {
    localStorage.removeItem("cartProducts");
    set({ cartProducts: [] });
  },
}));

export const useStore = create(store);
