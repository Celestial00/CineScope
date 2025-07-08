import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

const images = [
  {
    url: "https://deadline.com/wp-content/uploads/2019/06/strangerthings_s3_illustrated_vertical_final_rgb_digital__en-1.jpg?w=681&h=383&crop=1",
    title: "Stranger Things",
    description: "A chilling adventure through the upside-down world.",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/5ec686197f8b2976074846c2/1618809593080-N5PB8CWYOW3OPDE2TT6E/Feature+3-1.png?format=2500w",
    title: "Sci-Fi Chronicles",
    description: "Exploring distant galaxies and future technology.",
  },
  {
    url: "https://images3.alphacoders.com/239/239087.jpg",
    title: "Mystic Warriors",
    description: "Legends of warriors from forgotten realms.",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=b7fe2c24f174676b490b42de62837330"
        );
        const data = await res.json();

        const topFive = data.results.slice(0, 5);
        setTopMovies(topFive);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchTopMovies();
  }, []);


  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % topMovies.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + topMovies.length) % topMovies.length);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden ">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {topMovies === null ? (
          <p>loading...</p>
        ) : (
          topMovies.map((mov, index) => (
            <div key={index} className="min-w-full h-full relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${mov.backdrop_path}`}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover brightness-[.6]"
              />

              {/* Title & Description */}
              <div className="absolute bottom-6 left-4 md:left-20 bg-black/50 p-4 md:p-5 rounded-lg max-w-[90%] md:max-w-xl text-white backdrop-blur-sm">
                <h2 className="text-xl md:text-2xl font-bold mb-1">
                  {mov.title}
                </h2>
                <p className="text-sm md:text-base">{mov.overview}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {topMovies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full ${
              current === i ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
