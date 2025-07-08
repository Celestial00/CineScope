import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";

export default function MovieCard({
  uid,
  image,
  title,
  overview,
  bg,
  genreids,
  isShow = false,
}) {
  const [liked, setLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  const getFavorites = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const favorites = data.favorites || [];
    
        return favorites;
      } else {
        console.log("No such document!");
        return [];
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const favs = await getFavorites(currentUser.uid);
        setFavorites(favs);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (favorites.includes(uid)) {
      setLiked(true);
    }
  }, [favorites, uid]);

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

  const addToFavorites = async (movieId, userId) => {
    const userRef = doc(db, "users", userId);

    try {
      await setDoc(
        userRef,
        {
          favorites: arrayUnion(movieId),
        },
        { merge: true } 
      );

      console.log("Movie added to favorites");
    } catch (err) {
      console.error("Error adding to favorites:", err);
    }
  };

  const toggleLike = async () => {
    if (!user) {
      setModalOpen(true);
    } else {
      try {
        await addToFavorites(uid, user.uid);
        setFavorites((prev) => [...prev, uid]); 
        setLiked(true);
      } catch (err) {
        console.error("Error toggling like:", err);
      }
    }
  };
 

  return (
    <>
      <div className="relative rounded overflow-hidden w-full h-56 xl:h-64 group shadow hover:shadow-md transition">
        <Link
          to="/detail"
          state={{
            uid: uid,
            title: title,
            desc: overview,
            bg: bg,
            genreids: genreids,
          }}
        >
          <img src={image} alt="movie" className="w-full h-full object-cover" />
        </Link>

        {/* Heart Button */}
        <button
          onClick={toggleLike}
          className="absolute top-2 right-2 bg-transparent backdrop-blur p-1 rounded-full hover:scale-110 transition"
        >
          <Heart
            className={`h-5 w-5 ${
              liked ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
        </button>

        {/* Movie/Show Label */}
       
   
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl shadow-2xl w-[90%] max-w-3xl p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-3 text-lg font-bold text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              &times;
            </button>

            {modalOpen && (
              <>
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 relative">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="absolute top-2 right-3 text-lg font-bold text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      &times;
                    </button>

                    {!user ? (
                      <div>
                        <div className="text-center">
                          <h1 className="text-3xl font-bold">Sorry</h1>
                          <p className="text-sm text-gray-400 mt-1">
                            You Need To Be Logged In To Add It To Your
                            Favorites!
                          </p>
                          <div
                            className="w-full flex justify-center my-6 items-center"
                            onClick={handleLogin}
                          >
                            <div className="p-2 flex justify-center items-center gap-4 cursor-pointer bg-gray-200 dark:bg-gray-800  rounded-2xl">
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
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
