import MovieGrid from "./MovieGrid";
import { useDispatch, useSelector } from "react-redux";
import { MoviesApi } from "../redux/movieSlice";
import { useEffect } from "react";

export default function Container() {
  const Movies = useSelector((state) => state.MoviesState.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MoviesApi());
  }, [dispatch]);

  return (
    <>
      <div className="my-5">
        <MovieGrid Fav={Movies} />
      </div>
    </>
  );
}
