import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';

const {
  apiKey,
  baseUrl,
  region,
} = Constants.manifest.extra.openWeatherApi;

const queryUrl = (city) => `${baseUrl}/weather?q=${city}&appid=${apiKey}&lang=${region}`

export default class WeatherDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const {
      route: {
        params: { city },
      },
    } = this.props;

    fetch(queryUrl(city))
      .then(response => response.json())
      .then(info => {
        console.log(info);
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  renderTemperature(){
    const celsius = this.state.main.temp - 273.15;

    return (
      <Text>온도 : {celsius.toFixed(1)}</Text>
    )
  }

  render() {
    const {
      route: {
        params: { city },
      },
      navigation,
    } = this.props;

    navigation.setOptions({ title: `${city} 날씨` });

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }


    return (
      <View style={styles.container}>
        {this.renderTemperature()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});