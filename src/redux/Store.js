import { configureStore } from "@reduxjs/toolkit";
import { MoviesState } from "./movieSlice";

const Store = configureStore({
  reducer: { MoviesState },
});

export default Store;
