import { configureStore } from "@reduxjs/toolkit";
import { MoviesState } from "./MovieSlice";

const Store = configureStore({
  reducer: { MoviesState },
});

export default Store;
