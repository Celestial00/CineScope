import React, { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { useDispatch, useSelector } from "react-redux";
import { MoviesApi } from "../redux/MovieSlice";
import Drawer from "../components/Drawer";

export default function Movie() {
  const allMovies = useSelector((state) => state.MoviesState.movies);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    genre: "",
    date: "",
    rating: "",
  });

  useEffect(() => {
    dispatch(MoviesApi());
  }, [dispatch]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const getGenreId = (name) => {
    const genreMap = {
      Action: 28,
      Drama: 18,
      Comedy: 35,
      Horror: 27,
      "Sci-Fi": 878,
      Thriller: 53,
      Fantasy: 14,
      Adventure: 12,
    };
    return genreMap[name] || null;
  };

  console.log(allMovies);

  const filteredMovies = allMovies.filter((movie) => {
    const matchesGenre = filters.genre
      ? movie.genre_ids?.includes(getGenreId(filters.genre))
      : true;

    const matchesDate = filters.date
      ? movie.release_date?.startsWith(filters.date)
      : true;

    const matchesRating = filters.rating
      ? movie.adult === (filters.rating === "R")
      : true;

    return matchesGenre && matchesDate && matchesRating;
  });

  return (
    <>
      <h1 className="text-5xl font-bold my-10">Movies.</h1>
      <Drawer onFilterChange={handleFilterChange} />
      <MovieGrid Fav={filteredMovies} />
    </>
  );
}
