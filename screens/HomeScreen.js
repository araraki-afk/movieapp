import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPopularMovies } from '../services/api';
import { useFavorites } from '../context/FavoritesContext';
import ItemCard from '../components/ItemCard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const fetchMovies = async (pageNum = 1, refresh = false) => {
    if (refresh) setRefreshing(true);
    if (!refresh && pageNum === 1) setLoading(true);
    
    try {
      setError(null);
      const data = await getPopularMovies(pageNum);
      
      if (refresh || pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies(prevMovies => [...prevMovies, ...data.results]);
      }
      
      setPage(pageNum);
    } catch (err) {
      setError('Не удалось загрузить фильмы. Проверьте соединение с интернетом.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMovies(1, true);
    }, [])
  );

  const handleRefresh = () => {
    fetchMovies(1, true);
  };

  const handleLoadMore = () => {
    if (!loading && !error) {
      fetchMovies(page + 1);
    }
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('Detail', { movie });
  };

  const toggleFavorite = async (movie) => {
    if (isFavorite(movie.id)) {
      await removeFavorite(movie.id);
    } else {
      await addFavorite(movie);
    }
  };

  if (loading && !refreshing && movies.length === 0) {
    return <LoadingView message="Загрузка фильмов..." />;
  }

  if (error && movies.length === 0) {
    return <ErrorView message={error} onRetry={() => fetchMovies(1)} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => handleMoviePress(item)}
            onFavoritePress={() => toggleFavorite(item)}
            isFavorite={isFavorite(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
});

export default HomeScreen;