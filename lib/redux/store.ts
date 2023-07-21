import { configureStore } from "@reduxjs/toolkit";
import { profileApi } from "@/lib/redux/rtkapi/profileApi";
import { gaimizApi } from "@/lib/redux/rtkapi/gaimizApi";
import laptopOrderReducer from "@/lib/redux/slices/laptopOrderSlice";

const store = configureStore({
  reducer: {
    laptopOrder: laptopOrderReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [gaimizApi.reducerPath]: gaimizApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(profileApi.middleware)
      .concat(gaimizApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
