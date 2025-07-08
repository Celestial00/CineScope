import React from "react";
import MovieGrid from "../components/MovieGrid";
import { useDispatch, useSelector } from "react-redux";
import { SeriesAPi } from "../redux/movieSlice";
import { useEffect } from "react";

export default function Series() {
  const Series = useSelector((state) => state.MoviesState.series);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SeriesAPi());
  }, [dispatch]);

  console.log(Series);

  return (
    <>
      <h1 className="text-5xl font-bold my-10">Series.</h1>
      <MovieGrid Fav={Series} Type={"true"} />
    </>
  );
}
