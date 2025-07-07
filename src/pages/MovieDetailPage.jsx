import { Heart } from "lucide-react";
import { useState } from "react";

export default function MovieDetailPage() {
  const [liked, setLiked] = useState(false);

  const movie = {
    title: "Inception",
    description:
      "A skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state.",
    genres: ["Action", "Sci-Fi", "Thriller"],
    rating: "PG-13",
    poster:
      "https://images.squarespace-cdn.com/content/v1/5ec686197f8b2976074846c2/1618809593080-N5PB8CWYOW3OPDE2TT6E/Feature+3-1.png?format=2500w",
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0", // Replace with your trailer URL
  };

  return (
    <div className="w-full  space-y-6 pb-10">
      <div className="w-full h-[400px] overflow-hidden rounded-md">
        <img
          src={movie.poster}
          alt="Movie Poster"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex justify-between items- ">
        <div className="px-4 md:px-0 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {movie.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            {movie.description}
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
            <span className=" text-sm text-gray-600 dark:text-gray-400">
              Rated: <strong>{movie.rating}</strong>
            </span>
          </div>
        </div>

        <button
          onClick={() => setLiked(!liked)}
          className=" bg-transparent backdrop-blur p-1 rounded-full hover:scale-110 transition"
        >
          <Heart
            className={`h-6 w-6 ${
              liked ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
        </button>
      </div>

      <div className="px-4 md:px-0">
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">
          Watch Trailer
        </h2>
        <div className="aspect-video w-full rounded overflow-hidden shadow-md">
          <iframe
            width="100%"
            height="100%"
            src={movie.trailerUrl}
            title="YouTube trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
