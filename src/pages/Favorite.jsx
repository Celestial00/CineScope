import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { MoviesApi, SeriesAPi } from "../redux/movieSlice";
import MovieGrid from "../components/MovieGrid";

import { useDispatch, useSelector } from "react-redux";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SeriesAPi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(MoviesApi());
  }, [dispatch]);

  const stateMov = useSelector((state) => state.MoviesState.movies);
  const stateSer = useSelector((state) => state.MoviesState.series);

  const favoriteMovies = stateMov.filter((mov) => favorites.includes(mov.id));
  const favoriteSeries = stateSer.filter((ser) => favorites.includes(ser.id));

  const favo = [...favoriteMovies, ...favoriteSeries];

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



  return (
    <div>
      <h1 className="text-5xl font-bold my-10">Your Favorites.</h1>

      <MovieGrid Fav={favo}  />
    </div>
  );
}
