const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '39686ac0deeb429d0f561e03bcbb3c68';

export const getPopularMovies = async (page=1) => {
    try {
        const response = await fetch(
             `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU&page=${page}`
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching popluar movies:', error);
        throw error;
    }
};

export const getMoviesDetails = async(movieId) => {
    try {
        const response = await fetch (
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ru-RU&`
        );

        if (!response.ok) {
            throw new Error('Networt response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching movie details for ID ${movieId}: `, error);
        throw error;
    }
};


export const getImageUrl = (path, size = 'w500') => {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
};