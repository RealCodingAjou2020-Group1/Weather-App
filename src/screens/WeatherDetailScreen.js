import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View, Text, LinearGradient} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import openWeatherApi from '../api/OpenWeatherApi';
import _get from 'lodash.get';

export default class WeatherDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    openWeatherApi.fetchWeatherInfoByCityName(this.props.route.params.city)
      .then(info => {
        console.log(info);
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  renderTemperature() {
    const celsius = this.state.main.temp - 273.15;

    return (
      <View style = {styles.container_temp}>
        <Text style={styles.text_temp}>{celsius.toFixed(0)}</Text>
        <Text style={styles.text_temp1}>°C</Text>
      </View>
    );
  }

  renderWeather() {
    const weather = _get(this.state, ['weather', '0', 'description'], null);

    return (
      <Text style = {styles.text_day}>{weather}</Text>
    );
  }

  renderDay() {
    let today = new Date();   
    let day = today.getDay();  // 요일
    if(day == 0)
    {
      day = "SUN";
    }
    else if(day == 1)
    {
      day = "MON";
    }
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분

    return (
      <Text style={styles.text_day}>{day}</Text>
    );
  }

  renderWind() {
    const speed = _get(this.state, ['wind', 'speed'], null);
    const deg = _get(this.state, ['wind', 'deg'], null);
    
    const arrowStyle = {
      transform: [
         { rotate: `${deg}deg`}
      ],
      width: 24,
      height: 24,
    };

    return (
      <View style={styles.container_wind}>
        <Text style={styles.text_wind}>
          {speed? `${speed}` : '정보 없음'}
        </Text>
        <Text style={styles.text_wind1}>
          m/s
        </Text>
        <View style={[arrowStyle]}>
          <MaterialCommunityIcons name="arrow-up-circle" size={25} color="black" />
        </View>
      </View>
    );
  }

  renderLocation() {
    const location = this.state.name;

    return (
      <View style={styles.container_location}>
        <View>
          <AntDesign name="enviroment" size={48} color="black" />
        </View>
        <Text style={styles.text_location}>
          {location}
        </Text>
      </View>
    );
  }
  renderWeatherCondition() {
    // https://openweathermap.org/weather-conditions
    return this.state.weather.map(({
      icon,
    }, index) => {
      return (
        <View key={index}>
          <Image source={{
            uri: `http://openweathermap.org/img/wn/${icon}@4x.png`,
            width: 180,
            height: 180,
          }} />
        </View>
      );
    });
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
      <View style = {styles.container}>
        <View style={styles.conditionContainer}>
          {this.renderWeatherCondition()}
        </View>
        <View style = {styles.container_mid}>
          <View>
            {this.renderTemperature()}
          </View>
          <View style = {styles.container_today}>
            <View>
              {this.renderDay()}
            </View>
            <View>
              {this.renderWeather()}
            </View>
          </View>
        </View>
        <View style={styles.container_wind}>
          {this.renderWind()}
        </View>
        <View style={styles.container_location}>
          {this.renderLocation()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingTop: Platform.OS === `ios` ? 0 : Expo.Constants.statusBarHeight,
  },

  conditionContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  text_temp: {
    fontSize: 100,
    justifyContent: 'flex-end',
    alignItems: "flex-start",
  },
  text_temp1: {
    fontSize: 30,
  },
  container_temp: {
    flex: 1,
    flexDirection: 'row',
  },

  container_mid: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  
  container_today: {
    flexDirection: 'column',
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text_day: {
    fontSize: 25,
    justifyContent: 'flex-start',
    alignItems: "flex-start",
  },

  container_wind: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text_wind: {
    fontSize: 30,
  },
  text_wind1: {
    fontSize: 20,
  },

  container_location: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
  },
  text_location: {
    fontSize: 20,
    padding: 20,
  },
});