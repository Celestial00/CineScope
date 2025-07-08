import MovieCard from "./MovieCard";
export default function MovieGrid({ Fav, Type }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
      {Fav?.length > 0 ? (
        Fav.map((mov) => (
          <MovieCard
            key={mov.id}
            uid={mov.id}
            image={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
            title={mov.original_title}
            overview={mov.overview}
            bg={`https://image.tmdb.org/t/p/w500${mov.backdrop_path}`}
            genreids={mov.genre_ids}
            isShow={Type}
          />
        ))
      ) : (
        <div className="flex justify-center items-center w-full h-[50vh] col-span-full">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
