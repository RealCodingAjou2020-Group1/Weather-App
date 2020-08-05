import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

import CityList from './CityList';
import WeatherDetailScreen from './WeatherDetailScreen';
import StartPage from './StartPage';

export const HomePage = ({navigation}) => (
  <View style={styles.container}>
      <StartPage navigation={navigation}/>
      <StatusBar style="auto" />
  </View>
);

export const HomeScreen = ({ navigation, route }) => (
  <View style={styles.container}>
    <CityList navigation={navigation} route={route}/>
    <StatusBar style="auto" />
  </View>
);

export const DetailScreen = ({ navigation, route }) => (
  <View style={styles.container}>
    <WeatherDetailScreen navigation={navigation} route={route} />
    <StatusBar style="auto" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});