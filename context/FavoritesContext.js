import React, { createContext, useState, useEffect, useContext} from "react";
import { getFavorites,addToFavorites,removeFromFavorites  } from "../utils/storage";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            setLoading(true);
            try {
                const storedFavorites = await getFavorites();
                setFavorites(storedFavorites);
            } catch (error) {
                console.error('Error loading favorites:', error);
            } finally { 
                setLoading(false);
            }
        };

        loadFavorites();
    },
[]);
const addFavorite = async (movie) => {
    try {
        const updatedFavorites = await addToFavorites(movie);
        setFavorites(updatedFavorites);
        return true;
    } catch (error) {
        console.error('Error adding to favorites: ', error);
        return false;
    }
};

    const removeFavorite = async (movieId) => {
        try {
            const updatedFavorites = await removeFromFavorites(movieId);
            setFavorites(updatedFavorites);
            return true;
        } catch (error) {
            console.error('Error removing from favorites: ',error);
            return false;
        }
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    return (
        <FavoritesContext.Provider
        value={{
            favorites,
            loading,
            addFavorite,
            removeFavorite,
            isFavorite
        }}>
            {children}
        </FavoritesContext.Provider>
    );


};
//хук для использования контекста
export const useFavorites = () => useContext(FavoritesContext);