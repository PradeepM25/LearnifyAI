// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi";
import { quickNotesApi } from "../features/api/quickNotesApi";
import { modulesApi } from "../features/api/modulesApi";


const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [quickNotesApi.reducerPath]: quickNotesApi.reducer,
  [modulesApi.reducerPath]: modulesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(authApi.middleware, quickNotesApi.middleware, modulesApi.middleware),
});

export default store;
