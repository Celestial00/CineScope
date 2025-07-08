import MovieGrid from "../components/MovieGrid";
import { useDispatch, useSelector } from "react-redux";
import { SeriesAPi } from "../redux/movieSlice";
import { useEffect, useState } from "react";
import Drawer from "../components/Drawer";

export default function Series() {
  const allSeries = useSelector((state) => state.MoviesState.series);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    genre: "",
    date: "",
    rating: "",
  });

  useEffect(() => {
    dispatch(SeriesAPi());
  }, [dispatch]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const getGenreId = (name) => {
    const genreMap = {
      Action: 10759,
      Drama: 18,
      Comedy: 35,
      Horror: 9648,
      "Sci-Fi": 10765,
      Thriller: 80,
      Fantasy: 10765,
      Adventure: 10759,
    };
    return genreMap[name] || null;
  };

  const filteredSeries = allSeries.filter((item) => {
    const matchesGenre = filters.genre
      ? item.genre_ids?.includes(getGenreId(filters.genre))
      : true;

    const matchesDate = filters.date
      ? item.first_air_date?.startsWith(filters.date)
      : true;

    const matchesRating = filters.rating
      ? item.adult === (filters.rating === "R")
      : true;

    return matchesGenre && matchesDate && matchesRating;
  });

  return (
    <>
      <h1 className="text-5xl font-bold my-10">Series.</h1>
      <Drawer onFilterChange={handleFilterChange} />
      <MovieGrid Fav={filteredSeries} Type={"true"} />
    </>
  );
}
