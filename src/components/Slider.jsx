import React from 'react';

const Slider = ({ movies }) => {
  return (
    <div className="w-full overflow-x-auto whitespace-nowrap py-4">
      {movies.map((movie) => (
        <img
          key={movie.id}
          src={movie.poster_path}
          alt={movie.title}
          className="inline-block w-72 h-96 object-cover mx-2 rounded-lg shadow-md"
        />
      ))}
    </div>
  );
};

export default Slider;
