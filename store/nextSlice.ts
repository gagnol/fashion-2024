import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface Product {
  _id: string,
  video: [string],
  name: string,
  slug: string,
  category: string,
  subcategory: string,
  image: [string],
  price: number,
  brand: string,
  rating: number,
  numReviews: number,
  countInStock: number,
  description: string,
  isFeature: string,
  discount: number,
  topDeal: string,
  bestSeller: string,
  colors: [string],
  quantity: number,
  discountPrice: number
  countryData: [any],
  shipping:number,
  colorPiked:string,
  sizePiked:string,
  
}

interface countryData {
  id: number,
  country: string,
  shipping: number,
  importFees: number,
}

interface userInfo {
  _id: number,
  name: string,
  email: string,
  image: string,
  isAdmin: boolean,
  address: string,
  city: string,
  postal: string,
  country: string

}

interface State {
  productData: Product[];
  favoriteData: Product[];
  allProducts: any[];
  userInfo: userInfo[] | null;
  countryData: any[] | undefined;
  colorPiked:string|undefined;
  sizePiked:string|undefined;
}

const initialState: State = {
  productData: [],
  favoriteData: [],
  allProducts: [],
  userInfo: [],
  countryData: [5, "USA", 0, 0],
  colorPiked:"",
  sizePiked:""
};

export const nextSlice = createSlice({
  name: "next",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    addFavorite: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.favoriteData.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.favoriteData.push(action.payload);
      }
    },
    increaseQuantity: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.productData.find(
        (item) => item._id === action.payload._id
      );
    
      if (existingProduct) {
        // Check if the increase is allowed based on countInStock
        if (existingProduct.quantity < existingProduct.countInStock) {
          existingProduct.quantity++;
        } else {
          // Optionally, you can show a message or dispatch an action to handle the case
          toast.error('Cannot increase quantity, out of stock', { duration: 4000, position: "top-center", });
        }
      }
    },
    decreaseQuantity: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity = 1;
      } else {
        existingProduct!.quantity--;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    resetFavorite: (state) => {
      state.favoriteData = [];
    },
    addUser: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    setAllProducts: (state, action: PayloadAction<any[]>) => {
      state.allProducts = action.payload;
    },
    addCountry: (state, action: PayloadAction<any[]>) => {
      state.countryData = action.payload;
    },
    selectedColor: (state, action: PayloadAction<string>) => {
      state.colorPiked = action.payload;
    },
    selectedSize: (state, action: PayloadAction<string>) => {
      state.sizePiked = action.payload;
    },
    resetPickedValues: (state) => {
      state.colorPiked = "";
      state.sizePiked = "";
    },
  },
});

export const {
  addCart,
  addFavorite,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  resetFavorite,
  addUser,
  removeUser,
  setAllProducts,
  addCountry,
 selectedColor,
 selectedSize,
 resetPickedValues
} = nextSlice.actions;

export default nextSlice.reducer;
