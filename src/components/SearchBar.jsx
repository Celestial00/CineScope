import React, { useEffect } from 'react';

const SearchBar = ({ query, setQuery, movies, setFilteredMovies }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const results = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(results);
    }, 300); // debounce delay

    return () => clearTimeout(timeout);
  }, [query, movies, setFilteredMovies]);

  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full md:w-1/2 p-2 my-2 rounded border focus:outline-none focus:ring"
    />
  );
};

export default SearchBar;
