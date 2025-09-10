import { createSlice } from "@reduxjs/toolkit";

const savedData = JSON.parse(localStorage.getItem("users")) || [];
const savedCurrentUser =
  JSON.parse(localStorage.getItem("currentUser")) || null;

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: savedData,
    currentUser: savedCurrentUser,
  },

  reducers: {
    addIndividuals: (state, action) => {
      const newUser = { id: Date.now(), ...action.payload };
      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    addGroups: (state, action) => {
      const newGroup = {
        id: Date.now(),
        groupName: action.payload.groupName,
        groupRepName: action.payload.groupRepName,
        groupEmail: action.payload.groupEmail,
        groupPassword: action.payload.groupPassword,
        members: [],
      };
      state.users.push(newGroup);
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    // ✅ Update group details and overwrite members safely
    updateGroupName: (state, action) => {
      const { id, newName, newRepName, newEmail, newPassword, newMembers } =
        action.payload;
      const group = state.users.find((g) => g.id === id && g.groupName);

      if (group) {
        if (newName?.trim()) group.groupName = newName;
        if (newRepName?.trim()) group.groupRepName = newRepName;
        if (newEmail?.trim()) group.groupEmail = newEmail;
        if (newPassword?.trim()) group.groupPassword = newPassword;

        // ✅ Replace members instead of adding duplicates
        if (Array.isArray(newMembers)) {
          group.members = newMembers.map((m) => ({
            id: m.id || Date.now() + Math.random(), // keep id if exists, else generate
            name: m.name,
            email: m.email,
          }));
        }

        localStorage.setItem("users", JSON.stringify(state.users));

        if (state.currentUser && state.currentUser.id === id) {
          state.currentUser = { ...group };
          localStorage.setItem(
            "currentUser",
            JSON.stringify(state.currentUser)
          );
        }
      }
    },

    // ✅ Delete a member from a group
    deleteMember: (state, action) => {
      const { groupId, memberId } = action.payload;
      const group = state.users.find((g) => g.id === groupId);
      if (group) {
        group.members = group.members.filter((m) => m.id !== memberId);

        localStorage.setItem("users", JSON.stringify(state.users));

        if (state.currentUser && state.currentUser.id === groupId) {
          state.currentUser = { ...group };
          localStorage.setItem(
            "currentUser",
            JSON.stringify(state.currentUser)
          );
        }
      }
    },

    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },

    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const {
  addIndividuals,
  addGroups,
  updateGroupName,
  deleteMember, // ✅ export
  login,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
