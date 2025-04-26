import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import ItemCard from '../components/ItemCard';
import LoadingView from '../components/LoadingView';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, loading, removeFavorite } = useFavorites();

  const handleMoviePress = (movie) => {
    navigation.navigate('Detail', { movie });
  };

  const handleRemoveFavorite = (movieId) => {
    removeFavorite(movieId);
  };

  if (loading) {
    return <LoadingView message="Загрузка избранного..." />;
  }

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            У вас пока нет избранных фильмов
          </Text>
          <Text style={styles.emptySubText}>
            Добавьте фильмы в избранное, нажав на звездочку
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              onPress={() => handleMoviePress(item)}
              onFavoritePress={() => handleRemoveFavorite(item.id)}
              isFavorite={true}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});

export default FavoritesScreen;