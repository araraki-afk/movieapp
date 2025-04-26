import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getImageUrl } from '../services/api';

const ItemCard = ({ item, onPress, onFavoritePress, isFavorite }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.poster}
        source={
          item.poster_path
            ? { uri: getImageUrl(item.poster_path) }
            : require('../assets/no-image.png')
        }
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.releaseDate}>
          {new Date(item.release_date).getFullYear() || 'N/A'}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>
            ★ {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
          </Text>
        </View>
      </View>
      <TouchableOpacity
  style={[styles.favoriteButton, isFavorite && styles.favoriteActive]}
  onPress={() => {
    console.log('Favorite button pressed');
    onFavoritePress();
  }}
>
        <Text style={styles.favoriteIcon}>
          {isFavorite ? '★' : '☆'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 4,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#f39c12',
    fontWeight: 'bold',
  },
  favoriteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  favoriteActive: {
    opacity: 1,
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#f39c12',
  },
});

export default ItemCard;