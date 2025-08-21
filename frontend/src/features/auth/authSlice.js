import { createSlice } from "@reduxjs/toolkit";

// ✅ Safely parse localStorage value
const loadUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("user");
    if (!userData || userData === "undefined") return null; // prevent JSON.parse error
    return JSON.parse(userData);
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const initialState = {
  user: loadUserFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Save to localStorage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // ✅ Clear on logout
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
