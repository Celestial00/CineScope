import React from "react";
import MovieGrid from "../components/MovieGrid";
import { useDispatch, useSelector } from "react-redux";
import { MoviesApi } from "../redux/movieSlice";
import { useEffect } from "react";

export default function Movie() {
  const Movies = useSelector((state) => state.MoviesState.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MoviesApi());
  }, [dispatch]);

  return (
    <>
      <h1 className="text-5xl font-bold my-10">Movies.</h1>
      <MovieGrid Fav={Movies} />
    </>
  );
}
