import {create} from "zustand";

const store = ((set) => ({  
  wishlistProducts: [],

  getWishListProducts: () => {
    const storedProducts = localStorage.getItem("wishlistProducts");
    if (storedProducts) {
      set({ wishlistProducts: JSON.parse(storedProducts) });
    }
  },

  addToWishList: (productId) => {
    set((state) => {
      const updatedProducts = [...state.wishlistProducts, productId];
      localStorage.setItem("wishlistProducts", JSON.stringify(updatedProducts));
      return { wishlistProducts: updatedProducts };
    });
  },

  removeFromWishList: (productId) => {
    set((state) => {
      const pos = state.wishlistProducts.indexOf(productId)
      const cartP = [...state.wishlistProducts]
      const updatedProducts = cartP.filter((value,index) => index !==  pos)
      localStorage.setItem("wishlistProducts", JSON.stringify(updatedProducts));
      return { wishlistProducts: updatedProducts };
    });
  },

  updateWishListProduct: (productId, updatedProduct) => {
    set((state) => {
      const updatedProducts = state.wishlistProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            ...updatedProduct,
          };
        }
        return product;
      });
      localStorage.setItem("wishlistProducts", JSON.stringify(updatedProducts));
      return { wishlistProducts: updatedProducts };
    });
  },

  clearWishList: () => {
    localStorage.removeItem("wishlistProducts");
    set({ wishlistProducts: [] });
  },
}));

export const useWishList = create(store);
