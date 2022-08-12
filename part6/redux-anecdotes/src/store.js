import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";

export const store = configureStore({
  reducer: { notification: notificationReducer, anecdotes: anecdoteReducer },
});
