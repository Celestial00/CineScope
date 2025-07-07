
import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import Slider from '../components/Slider';

const mockMovies = [
  {
    id: 1,
    title: 'Inception',
    genre_ids: [28, 878],
    release_date: '2010-07-16',
    poster_path: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
    vote_average: 8.8,
  },
  {
    id: 4,
    title: 'Dune',
    genre_ids: [878, 12],
    release_date: '2021-10-22',
    poster_path: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    vote_average: 8.0,
  },
  {
    id: 5,
    title: 'Top Gun: Maverick',
    genre_ids: [28, 18],
    release_date: '2022-05-27',
    poster_path: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
    vote_average: 8.3,
  },
  {
    id: 6,
    title: 'Oppenheimer',
    genre_ids: [18, 36],
    release_date: '2023-07-21',
    poster_path: 'https://image.tmdb.org/t/p/w500/8GxvAB8DIPz2WCN5nj1YF4YHUjC.jpg',
    vote_average: 8.7,
  },
  {
    id: 7,
    title: 'Dune: Part Two',
    genre_ids: [878, 12],
    release_date: '2024-03-01',
    poster_path: 'https://image.tmdb.org/t/p/w500/aBz0c5XCRkagGtvfV2c9DqLq2MA.jpg',
    vote_average: 8.5,
  },
  {
    id: 8,
    title: 'Future Movie',
    genre_ids: [12],
    release_date: '2025-01-01',
    poster_path: 'https://via.placeholder.com/300x450?text=Coming+Soon',
    vote_average: 0.0,
  },
];


const Home = () => {
  const [movies, setMovies] = useState(mockMovies);
  const [query, setQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(mockMovies);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    let result = movies;
    if (genre) result = result.filter(m => m.genre_ids.includes(parseInt(genre)));
    if (year) result = result.filter(m => m.release_date?.startsWith(year));
    setFilteredMovies(result);
  }, [genre, year, movies]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white px-4">
      <Slider movies={movies} />
      <div className="my-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  <SearchBar query={query} setQuery={setQuery} movies={movies} setFilteredMovies={setFilteredMovies} />
  <FilterBar setGenre={setGenre} setYear={setYear} />
</div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
