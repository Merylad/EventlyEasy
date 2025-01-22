import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default is localStorage for web
import userReducer from "../features/users/state/usersSlice";
import eventsReducer from '../features/events/state/eventsSlice'
import todoReducer from '../features/todos/state/todoSlice'

const persistConfig = {
  key: "root", // Key for localStorage
  storage, // Type of storage (localStorage)
};

const appReducer = combineReducers({
  user: userReducer,
  events : eventsReducer,
  todos : todoReducer
});

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore Redux Persist actions
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;