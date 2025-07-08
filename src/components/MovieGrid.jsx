import MovieCard from "./MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { MoviesApi } from "../redux/movieSlice";
import { useEffect } from "react";

export default function MovieGrid() {
  const Movies = useSelector((state) => state.MoviesState.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MoviesApi());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
      {Movies?.length > 0 ? (
        Movies.map((mov) => (
          <MovieCard
            key={mov.id}
            uid={mov.id}
            image={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
            title={mov.original_title}
            overview={mov.overview}
            bg={`https://image.tmdb.org/t/p/w500${mov.backdrop_path}`}
            genreids={mov.genre_ids}
          />
        ))
      ) : (
        <p className="col-span-full text-center">No movies found.</p>
      )}
    </div>
  );
}
