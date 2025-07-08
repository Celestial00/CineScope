import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function MovieDetailPage() {
  const [liked, setLiked] = useState(false);
  const [link, setLink] = useState("");
  const loc = useLocation();

  const { uid, title, desc, bg, genreids } = loc.state || {};

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${uid}/videos?api_key=b7fe2c24f174676b490b42de62837330`
        );
        const data = await res.json();

        const trailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        if (trailer) {
          setLink(`https://www.youtube.com/embed/${trailer.key}`); // ✅ Embed format
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    getTrailer();
  }, [uid]);

  const movie = {
    title,
    description: desc,
    genres: ["Action", "Sci-Fi", "Thriller"],
    rating: "PG-13",
    poster: bg,
  };

  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const genreTags = genreids.map((id) => genreMap[id] || "Unknown");


  return (
    <div className="w-full space-y-6 pb-10">
      <div className="w-full h-[400px] overflow-hidden rounded-md">
        <img
          src={movie.poster}
          alt="Movie Poster"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex justify-between items-center px-4 md:px-0">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {movie.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            {movie.description}
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            {genreTags.map((genre) => (
              <span
                key={genre}
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Rated: <strong>{movie.rating}</strong>
            </span>
          </div>
        </div>

        <button
          onClick={() => setLiked(!liked)}
          className="bg-transparent backdrop-blur p-1 rounded-full hover:scale-110 transition"
        >
          <Heart
            className={`h-6 w-6 ${
              liked ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
        </button>
      </div>

      {/* Trailer */}
      <div className="px-4 md:px-0">
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">
          Watch Trailer
        </h2>
        {link ? (
          <div className="aspect-video w-full rounded overflow-hidden shadow-md">
            <iframe
              width="100%"
              height="100%"
              src={link}
              title="YouTube trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No trailer available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
