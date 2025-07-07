import React, { useState } from "react";
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
  const [modalOpen, setModalOpen] = useState(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden ">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <img
              src={slide.url}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover brightness-[.6]"
            />

            {/* Title & Description */}
            <div className="absolute bottom-6 left-4 md:left-10 bg-black/50 p-4 md:p-5 rounded-lg max-w-[90%] md:max-w-xl text-white backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl font-bold mb-1">{slide.title}</h2>
              <p className="text-sm md:text-base">{slide.description}</p>
            </div>
          </div>
        ))}
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
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full ${
              current === i ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

  

      {/* Modal */}
      {modalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setModalOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-2 right-3 text-lg font-bold text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                &times;
              </button>
              <h3 className="text-2xl font-semibold mb-4">User Menu</h3>
              <ul className="space-y-3 text-lg">
                <li className="hover:text-blue-500 cursor-pointer">📌 Wishlist</li>
                <li className="hover:text-blue-500 cursor-pointer">❤️ Favorites</li>
                <li className="text-red-500 hover:text-red-700 cursor-pointer">🚪 Logout</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
