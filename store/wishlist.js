import {create} from "zustand";

const store = ((set) => ({ 
  ls: typeof window !== "undefined" ? window.localStorage : null, 
  cartProducts: [],

  getWishListProducts: () => {
    const storedProducts = localStorage.getItem("cartProducts");
    if (storedProducts) {
      set({ cartProducts: JSON.parse(storedProducts) });
    }
  },

  addToWishList: (productId) => {
    set((state) => {
      const updatedProducts = [...state.cartProducts, productId];
      localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
      return { cartProducts: updatedProducts };
    });
  },

  removeFromWishList: (productId) => {
    set((state) => {
      const pos = state.cartProducts.indexOf(productId)
      const cartP = [...state.cartProducts]
      const updatedProducts = cartP.filter((value,index) => index !==  pos)
      localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
      return { cartProducts: updatedProducts };
    });
  },

  updateWishListProduct: (productId, updatedProduct) => {
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

  clearWishList: () => {
    localStorage.removeItem("cartProducts");
    set({ cartProducts: [] });
  },
}));

export const useWishList = create(store);
