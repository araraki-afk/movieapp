import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { getMovieDetails, getImageUrl } from '../services/api';
import { useFavorites } from '../context/FavoritesContext';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';

const { width } = Dimensions.get('window');

const DetailScreen = ({ route, navigation }) => {
  const { movie: initialMovie } = route.params;
  const [movie, setMovie] = useState(initialMovie);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const details = await getMovieDetails(initialMovie.id);
        setMovie(details);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить детали фильма');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [initialMovie.id]);

  const toggleFavorite = async () => {
    if (isFavorite(movie.id)) {
      await removeFavorite(movie.id);
    } else {
      await addFavorite(movie);
    }
  };

  if (loading) {
    return <LoadingView message="Загрузка информации о фильме..." />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={() => navigation.goBack()} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.backdrop}
        source={
          movie.backdrop_path
            ? { uri: getImageUrl(movie.backdrop_path, 'w780') }
            : require('../assets/no-backdrop.png')
        }
        resizeMode="cover"
      />
      
      <View style={styles.header}>
        <View style={styles.posterContainer}>
          <Image
            style={styles.poster}
            source={
              movie.poster_path
                ? { uri: getImageUrl(movie.poster_path) }
                : require('../assets/no-image.png')
            }
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.tagline}>{movie.tagline}</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.year}>
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </Text>
            <Text style={styles.runtime}>
              {movie.runtime ? `${movie.runtime} мин.` : 'N/A'}
            </Text>
            <Text style={styles.rating}>★ {movie.vote_average.toFixed(1)}</Text>
          </View>
          
          <TouchableOpacity
            style={[styles.favoriteButton, isFavorite(movie.id) && styles.favoriteActive]}
            onPress={toggleFavorite}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavorite(movie.id) ? 'Удалить из избранного' : 'Добавить в избранное'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Описание</Text>
        <Text style={styles.overview}>
          {movie.overview || 'Описание отсутствует'}
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Жанры</Text>
        <View style={styles.genresContainer}>
          {movie.genres && movie.genres.map(genre => (
            <View key={genre.id} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>
      </View>
      
      {movie.production_companies && movie.production_companies.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Компании</Text>
          <Text style={styles.companies}>
            {movie.production_companies.map(company => company.name).join(', ')}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backdrop: {
    width: width,
    height: width * 0.56, // 16:9 aspect ratio
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    marginTop: -50,
  },
  posterContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  year: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  runtime: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  rating: {
    fontSize: 14,
    color: '#f39c12',
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  overview: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 14,
    color: '#666',
  },
  companies: {
    fontSize: 15,
    color: '#333',
  },
  favoriteButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  favoriteActive: {
    backgroundColor: '#e74c3c',
  },
  favoriteButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default DetailScreen;