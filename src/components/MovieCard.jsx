import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-2 rounded shadow hover:shadow-lg transition">
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="w-full h-64 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-semibold">{movie.title}</h3>
      <p className="text-sm">⭐ {movie.vote_average} | 📅 {movie.release_date}</p>
    </div>
  );
};

export default MovieCard;
