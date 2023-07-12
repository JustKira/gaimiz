import { configureStore } from "@reduxjs/toolkit";
import { profileApi } from "@/lib/redux/rtkapi/profileApi";
import { adminApi } from "@/lib/redux/rtkapi/adminApi";

const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(profileApi.middleware)
      .concat(adminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
