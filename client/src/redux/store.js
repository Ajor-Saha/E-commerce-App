import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import cartReducer from "./cart/cartSlice.js";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authMiddleware from "./authMiddleware.js";
import themeReducer from "./theme/themeSlice.js";


const rootReducer = combineReducers({
   user: userReducer,
   cart: cartReducer,
   theme: themeReducer,
  });

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(authMiddleware),
  });
 
export const persistor = persistStore(store);