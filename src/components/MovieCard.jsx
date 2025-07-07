import { useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function MovieCard({ image, isShow = false }) {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Link to="/detail">
        <div className="relative rounded overflow-hidden w-full h-56 xl:h-64 group shadow hover:shadow-md transition">
          <img src={image} alt="movie" className="w-full h-full object-cover" />

          {/* Heart Button */}
          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-2 right-2 bg-transparent backdrop-blur p-1 rounded-full hover:scale-110 transition"
          >
            <Heart
              className={`h-5 w-5 ${
                liked ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
            />
          </button>

          {/* Movie/Show Label */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {isShow ? "Show" : "Movie"}
          </div>
        </div>
      </Link>
    </>
  );
}
