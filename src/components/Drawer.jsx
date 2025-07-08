import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";

const genres = ["Action", "Drama", "Comedy", "Horror"];
const dates = ["2024", "2023", "2022", "2021"];
const ratings = ["G", "PG", "PG-13", "R"];

export default function FilterNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    genre: false,
    date: false,
    rating: false,
  });

  const dropdownRef = useRef(null);
  const drawerRef = useRef(null);


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

  return (
    <nav className={`w-full py-4 cursor-pointer dark:border-gray-700`}>
      <div className="flex  justify-between ">
        <div className="flex justify-between items-center ">
          {/* Desktop Menu */}
          <ul
            className="hidden md:flex items-center gap-6 font-medium"
            ref={dropdownRef}
          >
            <li className="cursor-pointer text-sm text-gray-400 transition hover:text-blue-500">
              All
            </li>
            <li className="cursor-pointer text-sm text-gray-400 transition hover:text-blue-500">
              Movies
            </li>
            <li className="cursor-pointer text-sm text-gray-400 transition hover:text-blue-500">
              Shows
            </li>

            {/* Genre Dropdown */}
            <li className="relative text-sm text-gray-400 transition">
              <button
                onClick={() => toggleDropdown("genre")}
                className="flex items-center gap-1 hover:text-blue-500"
              >
                Genre <ChevronDown className="w-4 h-4" />
              </button>
              {dropdowns.genre && (
                <ul className="absolute bg-white dark:bg-[#0a151f] rounded mt-2 p-2 w-40 z-40 shadow-md">
                  {genres.map((item) => (
                    <li
                      key={item}
                      className="hover:text-blue-500 cursor-pointer px-2 py-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Date Dropdown */}
            <li className="relative text-sm text-gray-400 transition">
              <button
                onClick={() => toggleDropdown("date")}
                className="flex items-center gap-1 hover:text-blue-500"
              >
                Release year <ChevronDown className="w-4 h-4" />
              </button>
              {dropdowns.date && (
                <ul className="absolute bg-white dark:bg-[#0a151f] rounded mt-2 p-2 w-40 z-40 shadow-md">
                  {dates.map((item) => (
                    <li
                      key={item}
                      className="hover:text-blue-500 cursor-pointer px-2 py-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Rating Dropdown */}
            <li className="relative text-sm text-gray-400 transition">
              <button
                onClick={() => toggleDropdown("rating")}
                className="flex items-center gap-1 hover:text-blue-500"
              >
                Age Rating <ChevronDown className="w-4 h-4" />
              </button>
              {dropdowns.rating && (
                <ul className="absolute bg-white dark:bg-[#0a151f] rounded mt-2 p-2 w-40 z-40 shadow-md">
                  {ratings.map((item) => (
                    <li
                      key={item}
                      className="hover:text-blue-500 cursor-pointer px-2 py-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button onClick={() => setMenuOpen(true)} className="md:hidden px-4">
            <Menu />
          </button>
        </div>

        <div className=" flex gap-1 justify-center items-center px-5 md:px-0  dark:text-gray-400 text-sm text-gray-400 transition hover:text-blue-500  ">
          <p>Reset</p>
          <X className="h-4 w-4" />
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm md:hidden" />
      )}

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#0a151f] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-lg text-gray-800 dark:text-white">
            Filters
          </h2>
          <button onClick={() => setMenuOpen(false)}>
            <X />
          </button>
        </div>

        <ul className="flex flex-col gap-3 px-4 pt-4 font-medium text-gray-700 dark:text-white">
          <li className="hover:text-blue-500 cursor-pointer">All</li>
          <li className="hover:text-blue-500 cursor-pointer">Movies</li>
          <li className="hover:text-blue-500 cursor-pointer">Shows</li>

          <details className="group">
            <summary className="cursor-pointer">Genre</summary>
            <ul className="pl-4 mt-1 space-y-1">
              {genres.map((g) => (
                <li key={g} className="hover:text-blue-500 cursor-pointer">
                  {g}
                </li>
              ))}
            </ul>
          </details>

          <details className="group">
            <summary className="cursor-pointer">Release Year</summary>
            <ul className="pl-4 mt-1 space-y-1">
              {dates.map((d) => (
                <li key={d} className="hover:text-blue-500 cursor-pointer">
                  {d}
                </li>
              ))}
            </ul>
          </details>

          <details className="group">
            <summary className="cursor-pointer">Age Rating</summary>
            <ul className="pl-4 mt-1 space-y-1">
              {ratings.map((r) => (
                <li key={r} className="hover:text-blue-500 cursor-pointer">
                  {r}
                </li>
              ))}
            </ul>
          </details>

        
        </ul>
      </div>
    </nav>
  );
}
