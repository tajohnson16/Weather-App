import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import { API_KEY } from './utils/WeatherAPIKey';
import Weather from './components/Weather'

export default class App extends React.Component {
  state = {
    isLoading: true,
    description: null,
    feel: 0,
    Location: null,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error fetching weather conditions'
        });
      }
    );
  }

  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=imperial`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          Location: json.name,
          feel: json.main.feels_like,
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          description: json.weather[0].description,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading, description, feel, weatherCondition, temperature, Location } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
        ) : (
            <Weather description={description} feel={feel} Location={Location} weather={weatherCondition} temperature={temperature} />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});
