import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const genres = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Thriller", "Fantasy", "Adventure"];
const dates = ["2024", "2023", "2022", "2021"];
const ratings = ["G", "PG", "PG-13", "R"];

export default function Drawer({ onFilterChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({ genre: false, date: false, rating: false });
  const [selected, setSelected] = useState({ genre: "", date: "", rating: "" });

  const dropdownRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    onFilterChange(selected);
  }, [selected]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdowns({ genre: false, date: false, rating: false });
      }
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (key) => {
    setDropdowns({
      genre: false,
      date: false,
      rating: false,
      [key]: !dropdowns[key],
    });
  };

  const handleSelect = (key, value) => {
    setSelected((prev) => ({
      ...prev,
      [key]: value === prev[key] ? "" : value,
    }));
  };

  const resetFilters = () => {
    setSelected({ genre: "", date: "", rating: "" });
  };

  return (
    <nav className={`w-full py-4 cursor-pointer dark:border-gray-700`}>
      <div className="flex justify-between">
        <ul className="hidden md:flex items-center gap-6 font-medium" ref={dropdownRef}>
          {/* Genre Dropdown */}
          <li className="relative text-sm text-gray-400 transition">
            <button onClick={() => toggleDropdown("genre")} className="flex items-center gap-1 hover:text-blue-500">
              Genre <ChevronDown className="w-4 h-4" />
            </button>
            {dropdowns.genre && (
              <ul className="absolute bg-white dark:bg-[#0a151f] rounded mt-2 p-2 w-40 z-40 shadow-md">
                {genres.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleSelect("genre", item)}
                    className={`hover:text-blue-500 px-2 py-1 cursor-pointer ${
                      selected.genre === item ? "text-blue-500 font-semibold" : ""
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Date Dropdown */}
          <li className="relative text-sm text-gray-400 transition">
            <button onClick={() => toggleDropdown("date")} className="flex items-center gap-1 hover:text-blue-500">
              Release Year <ChevronDown className="w-4 h-4" />
            </button>
            {dropdowns.date && (
              <ul className="absolute bg-white dark:bg-[#0a151f] rounded mt-2 p-2 w-40 z-40 shadow-md">
                {dates.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleSelect("date", item)}
                    className={`hover:text-blue-500 px-2 py-1 cursor-pointer ${
                      selected.date === item ? "text-blue-500 font-semibold" : ""
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Rating Dropdown */}
          <li className="relative text-sm text-gray-400 transition">
            <button onClick={() => toggleDropdown("rating")} className="flex items-center gap-1 hover:text-blue-500">
              Age Rating <ChevronDown className="w-4 h-4" />
            </button>
            {dropdowns.rating && (
              <ul className="absolute bg-white dark:bg-[#0a151f] rounded mt-2 p-2 w-40 z-40 shadow-md">
                {ratings.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleSelect("rating", item)}
                    className={`hover:text-blue-500 px-2 py-1 cursor-pointer ${
                      selected.rating === item ? "text-blue-500 font-semibold" : ""
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Reset */}
        <div
          onClick={resetFilters}
          className="flex gap-1 justify-center items-center px-5 md:px-0 dark:text-gray-400 text-sm text-gray-400 transition hover:text-blue-500 cursor-pointer"
        >
          <p>Reset</p>
          <X className="h-4 w-4" />
        </div>
      </div>
    </nav>
  );
}
