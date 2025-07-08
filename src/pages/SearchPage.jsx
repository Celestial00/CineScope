import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { MoviesApi, SeriesAPi } from "../redux/movieSlice";
import MovieGrid from "../components/MovieGrid";

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

const genreMapping = {
  28: "Action",
  18: "Drama",
  35: "Comedy",
  27: "Horror",
  878: "Sci-Fi",
  53: "Thriller",
  14: "Fantasy",
  12: "Adventure",
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [option, setOption] = useState("both");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SeriesAPi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(MoviesApi());
  }, [dispatch]);

  const filterData = (items) =>
    items.filter((item) => {
      const title = item.title || item.name || "";
      const genreMatch = selectedGenre
        ? item.genre_ids?.some((id) =>
            selectedGenre
              .toLowerCase()
              .includes(genreMapping[id]?.toLowerCase() || "")
          )
        : true;

      return title.toLowerCase().includes(query.toLowerCase()) && genreMatch;
    });

  const stateMov = useSelector((state) => state.MoviesState.movies);
  const stateSer = useSelector((state) => state.MoviesState.series);

  const handleGenre = (genre) => {
    genres !== null ? setSelectedGenre(genre) : "";
  };

  return (
    <div className="w-full  mx-auto p-4 space-y-6">
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

      <div className="flex items-center  flex-wrap gap-3">
        <div className="flex gap-4">
          <p
            onClick={() => setOption("both")}
            className={`cursor-pointer text-[15px]  transition hover:text-blue-500 ${
              option === "both" ? "text-blue-500" : "text-gray-400"
            }`}
          >
            Both
          </p>
          <p
            onClick={() => setOption("show")}
            className={`cursor-pointer text-[15px] transition hover:text-blue-500 ${
              option === "show" ? "text-blue-500" : "text-gray-400"
            }`}
          >
            Show
          </p>
          <p
            onClick={() => setOption("movie")}
            className={`cursor-pointer text-[15px] transition hover:text-blue-500 ${
              option === "movie" ? "text-blue-500" : "text-gray-400"
            }`}
          >
            Movie
          </p>
        </div>

        <div className=" w-0.5 h-8 bg-gray-600 "></div>

        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenre(genre)}
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

      {option === "both" && (
        <>
          <div className="">
            <h1 className="text-2xl my-4"> Movies.</h1>
            <MovieGrid Fav={filterData(stateMov)} />
          </div>

          <div className="">
            <h1 className="text-2xl my-4"> Shows.</h1>
            <MovieGrid Fav={filterData(stateSer)} />
          </div>
        </>
      )}

      {option === "movie" && (
        <div className="">
          <h1 className="text-2xl my-4"> Movies.</h1>
          <MovieGrid Fav={filterData(stateMov)} />
        </div>
      )}

      {option === "show" && (
        <div className="">
          <h1 className="text-2xl my-4"> Shows.</h1>
          <MovieGrid Fav={filterData(stateSer)} />
        </div>
      )}
    </div>
  );
}
