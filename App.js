import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListComponent from './components/ListComponent';
import GoToMapBtn from './components/GoToMapBtn';
import SearchBar from './components/SearchBar';
import axios from 'axios';


const APIKEY_PLACESEARCH = 'AIzaSyA248lZdLZWTB0FGCcazOTGHVqc7vWOgOA';
const APIKEY_DIRECTION_MATRIX = 'AIzaSyCIWibWCYwtL1Q0m-gwAyZK7qgXwjnymNk';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchBar callback={this.searchCallback.bind(this)} />
      </View>
    );
  }

  searchCallback(text) {

    axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json',
      {
        params: {
          query: '' + text,
          key: APIKEY_PLACESEARCH,
        }
      }
    ).then(this.parseSearchPlace.bind(this));
  }

  parseSearchPlace(results) {
    console.log(results);
    if (results.data.status == "OK") {
      var loc = results.data.results[0].geometry.location;
      console.log("Resultat :\n" + loc.lat + "\n" + loc.lng);
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
