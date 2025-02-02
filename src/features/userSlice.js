import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: "",
    idToken: "",
    localId: "",
  },
  reducers: {
    setUser: (state, actions) => {
      state.email = actions.payload.email;
      state.idToken = actions.payload.idToken;
      state.localId = actions.payload.localId;
    },
    deleteUser:(state)=>{
      state.email = "";
      state.idToken = "";
      state.localId = "";
    }
  },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
