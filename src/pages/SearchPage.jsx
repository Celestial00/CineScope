import { useState } from "react";
import { Search } from "lucide-react";
import MovieCard from "../components/MovieCard";

const genres = [
  "Action",
  "Drama",
  "Comedy",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Fantasy",
  "Adventure",
];

const dummyResults = [
  "https://image.tmdb.org/t/p/w500/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
  "https://image.tmdb.org/t/p/w500/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
  "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
  "https://image.tmdb.org/t/p/w500/hziiv14OpD73u9gAak4XDDfBKa2.jpg",
  "https://image.tmdb.org/t/p/w500/tDexQyu6FWltcd0VhEDK7uib42f.jpg",
  "https://image.tmdb.org/t/p/w500/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <div className="w-full  mx-auto p-4 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search for movies or shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full text-lg px-6 py-4 rounded-lg border dark:border-gray-700 dark:bg-[#0a151f] dark:text-white shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        />
        <Search className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-400" />
      </div>

      {/* Genre Tags */}
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() =>
              setSelectedGenre(genre === selectedGenre ? "" : genre)
            }
            className={`px-4 py-2 rounded-full text-sm transition border dark:border-gray-700 ${
              selectedGenre === genre
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-[#101e2b] text-gray-800 dark:text-white"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {dummyResults.map((url, i) => (
          <MovieCard
            key={i}
            image={url}
            showType={i % 2 === 0 ? "Show" : null}
          />
        ))}
      </div>
    </div>
  );
}
