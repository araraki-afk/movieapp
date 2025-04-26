import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = '@favorites';

export const getFavorites = async () => {
    try {
        const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
        return favoritesJson != null ? JSON.parse(favoritesJson) : [];
    } catch (error) {
        console.error('Error getting favorites: ', error);
        return [];
    }
};

export const saveFavorites = async (favorites) => {
    try {
        const favoritesJson = JSON.stringify(favorites);
        await AsyncStorage.setItem(FAVORITES_KEY, favoritesJson);
    } catch (error) {
        console.error('Error saving favorites: ', error);
    }
};

export const addToFavorites = async (movie) => {
    try {
        const favorites = await getFavorites();
        if (!favorites.some(favorite => favorite.id === movie.id)) {
            const updatedFavorites = [...favorites, movie];
            await saveFavorites(updatedFavorites);
            return updatedFavorites;
        }
        return favorites;
    } catch (error) {
        console.error('Error adding to favorites: ', error);
        return [];
    }
};

export const removeFromFavorites = async (movieId) => {
    try {
        const favorites = await getFavorites();
        const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
        await saveFavorites(updatedFavorites);
        return updatedFavorites;
    } catch (error) {
        console.error('Error removing from favorites: ', error);
        return [];
    }
};

export const isFavorite = async (movieId) => {
    try {
        const favorites = await getFavorites();
        return favorites.some(movie => movie.id === movieId);
    } catch (error) {
        console.error('Error checking if favorite: ', error);
        return false;
    }
};