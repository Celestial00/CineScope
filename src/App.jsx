import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoviesApi } from "./redux/MovieSlice";

export default function App() {
  const state = useSelector((state) => state.MoviesState.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MoviesApi());
  }, [dispatch]);

  console.log(state);

  return <div></div>;
}
