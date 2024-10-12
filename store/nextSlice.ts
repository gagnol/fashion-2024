import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  userInfo: userInfo[] | null;
}
const initialState: State = {
  userInfo: [],
}

export const nextSlice = createSlice({
  name: "next",
  initialState,
  reducers: {
  
    addUser: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  addUser,
  removeUser,
  
} = nextSlice.actions;

export default nextSlice.reducer;
