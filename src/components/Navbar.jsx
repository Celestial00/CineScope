import { Search, User, Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, provider, db } from "../firebase";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        favorites: [],
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setModalOpen(false)}
        />
      )}

      <nav className="w-full py-4 flex items-center justify-between relative z-40 bg-white text-gray-800 dark:bg-[#060d17] dark:text-white">
        <div className="flex gap-6 items-center justify-between w-full md:w-auto">
          <div className="text-2xl font-semibold"> CineScope</div>

          <ul className="hidden md:flex gap-5 font-medium">
            <Link to="/">
              <li className="cursor-pointer text-sm text-gray-400 hover:text-blue-500 transition">
                Home
              </li>
            </Link>
            <Link to="/movies">
              <li className="cursor-pointer text-sm text-gray-400 hover:text-blue-500 transition">
                Movies
              </li>
            </Link>

            <Link to="/series">
              <li className="cursor-pointer text-sm text-gray-400 hover:text-blue-500 transition">
                Series
              </li>
            </Link>
          </ul>

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

        <div className="hidden md:flex items-center gap-4">
          <Link to="/search">
            <div className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <Search className="h-4 w-4" />
            </div>
          </Link>

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

          {user === null ? (
            <button
              onClick={() => setModalOpen(true)}
              className="p-2 cursor-pointer rounded-sm hover:bg-gray-800 dark:hover:bg-gray-700"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <User className="h-4 w-4" />
            </button>
          )}
        </div>

        {menuOpen && (
          <ul className="md:hidden absolute top-20 left-0 w-full flex flex-col gap-4 bg-white dark:bg-gray-900 text-center py-6 shadow-lg z-100 text-gray-800 dark:text-white">
            <li className="hover:text-blue-500">Home</li>
            <li className="hover:text-blue-500">Movies</li>
            <li className="hover:text-blue-500">Series</li>

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

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-100">
          <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl shadow-2xl w-[90%] max-w-3xl p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-3 text-lg font-bold text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              &times;
            </button>

            {user === null ? (
              <div className="">
                <div className="flex justify-between items-center flex-col">
                  <h1 className="text-4xl font-bold">Welcome.</h1>
                  <p className="mt-1 text-gray-400">
                    {" "}
                    Find all information about you require with single touch.
                  </p>
                </div>

                <div
                  className=" w-full  flex  justify-center my-6 items-center  "
                  onClick={handleLogin}
                >
                  <div className=" p-2 flex justify-center items-center gap-4 cursor-pointer bg-gray-800  rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="40"
                      height="40"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#fbc02d"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#e53935"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4caf50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1565c0"
                        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                    <p>Sign in/up with google</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                <div className="mt-4  w-full h-15 flex justify-center item ">
                  {" "}
                  <p>Hi, {user.displayName}</p>{" "}
                </div>

                <Link to="/favorites">
                  <div className="  w-full h-15 flex justify-center items-center cursor-pointer bg-gray-800  rounded-2xl">
                    <p>Favorites</p>
                  </div>
                </Link>

                <div
                  onClick={handleLogout}
                  className="mt-4  w-full h-15 flex justify-center items-center cursor-pointer bg-gray-800  rounded-2xl "
                >
                  <p className="text-red-700">Logout</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
