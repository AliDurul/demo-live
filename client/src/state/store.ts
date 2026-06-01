import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {todos: TodoState}
export type AppDispatch = typeof store.dispatch;
