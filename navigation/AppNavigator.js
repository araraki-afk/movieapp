import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Создаем стек навигации для главного экрана
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Популярные фильмы' }} 
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={({ route }) => ({ title: route.params.movie.title })} 
      />
    </Stack.Navigator>
  );
};

// Создаем стек навигации для экрана избранного
const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{ title: 'Избранное' }} 
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={({ route }) => ({ title: route.params.movie.title })} 
      />
    </Stack.Navigator>
  );
};

// Создаем нижнюю навигацию с вкладками
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{
          tabBarLabel: 'Фильмы',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🎬</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="FavoritesTab" 
        component={FavoritesStack} 
        options={{
          tabBarLabel: 'Избранное',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>⭐</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Основной компонент навигации
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;