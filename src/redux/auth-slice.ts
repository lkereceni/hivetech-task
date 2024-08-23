import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentUser {
  id: string;
  email: string;
  jwt: string;
}

interface InitialState {
  currentUser: CurrentUser | null;
}

const initialState: InitialState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = authSlice.actions;
export default authSlice.reducer;
