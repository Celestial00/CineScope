import { Search, User, Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Apply dark mode globally via <html> class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      {/* Overlay for Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setModalOpen(false)}
        />
      )}

      {/* Navbar */}
      <nav className="w-full py-4 flex items-center justify-between relative z-50 bg-white text-gray-800 dark:bg-[#060d17] dark:text-white">
        {/* Logo + Links */}
        <div className="flex gap-6 items-center justify-between w-full md:w-auto">
          <div className="text-2xl font-semibold ">🎬 MovieBox</div>

          <ul className="hidden md:flex gap-5 font-medium ">
            <li className="cursor-pointer text-sm text-gray-400 hover:text-blue-500 transition">
              Home
            </li>
            <li className="cursor-pointer  text-sm text-gray-400 hover:text-blue-500 transition">
              Movies
            </li>
            <li className="cursor-pointer text-sm text-gray-400 hover:text-blue-500 transition">
              Series
            </li>
            <li className="cursor-pointer text-sm text-gray-400 hover:text-blue-500 transition">
              Favorites
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 ml-auto"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Right Icons */}
        <div className="hidden md:flex items-center gap-4">
          <div className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Search className="h-4 w-4" />
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <User className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden absolute top-20 left-0 w-full flex flex-col gap-4 bg-white dark:bg-gray-900 text-center py-6 shadow-lg z-50 text-gray-800 dark:text-white">
            <li className="hover:text-blue-500">Home</li>
            <li className="hover:text-blue-500">Movies</li>
            <li className="hover:text-blue-500">Series</li>
            <li className="hover:text-blue-500">Favorites</li>
            <li className="flex justify-center items-center gap-3 px-6">
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun /> : <Moon />}
              </button>
              <Search className="h-5 w-5" />
              <button onClick={() => setModalOpen(true)}>
                <User className="h-5 w-5" />
              </button>
            </li>
          </ul>
        )}
      </nav>

      {/* Modal */}
      {modalOpen && (
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
              <li className="hover:text-blue-500 cursor-pointer">
                📌 Wishlist
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                ❤️ Favorites
              </li>
              <li className="text-red-500 hover:text-red-700 cursor-pointer">
                🚪 Logout
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
