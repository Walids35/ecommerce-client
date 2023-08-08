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
      const pos = state.cartProducts.indexOf(productId)
      const cartP = [...state.cartProducts]
      const updatedProducts = cartP.filter((value,index) => index !==  pos)
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
