import { createSlice } from "@reduxjs/toolkit";

const savedData = JSON.parse(localStorage.getItem("users")) || {
  individual: { name: "", email: "", password: "" },
  group: { groupName: "", membersCount: "", repName: "", groupEmail: "", groupPassword: "" }
};

export const userSlice = createSlice({
  name: "users",
  initialState: savedData,
  reducers: {
    addIndividuals: (state, action) => {
      state.individual = action.payload;
      localStorage.setItem("users", JSON.stringify(state));
    },
    addGroups: (state, action) => {
      state.group = action.payload;
      localStorage.setItem("users", JSON.stringify(state));
    }
  }
});

export const { addIndividuals, addGroups } = userSlice.actions;
export default userSlice.reducer;
