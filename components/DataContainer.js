import React from 'react';
import { StyleSheet, Text, View, ListView, Animated , PanResponder} from 'react-native';
import ListComponent from './ListComponent';
import MapView from 'react-native-maps';
import axios from 'axios';
import SearchBar from './SearchBar';
import redImage from '../img/red.png';
import greenImage from '../img/green.png';
import yellowImage from '../img/yellow.png';

const APIKEY_PLACESEARCH = 'AIzaSyA248lZdLZWTB0FGCcazOTGHVqc7vWOgOA';
const APIKEY_DIRECTION_MATRIX = 'AIzaSyCIWibWCYwtL1Q0m-gwAyZK7qgXwjnymNk';

function getRegion(lat, lng) {
  return {
    latitude:  lat,
    longitude: lng,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  };
}

export default class DataContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
      dataSource: [],
      lastlocation: {
        coords: {
          longitude: 4.850000,
          latitude: 45.750000
        }
      },
      watchID: (null: ?number),
      sortedDataSource: null,
    }

    this.parkDidUpdate()
  }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (location) => {
        this.setState({lastlocation: location}, () => {
          this.sortedDataSource()
        });
      },
      (error) => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 30}
    );
    this.state.watchID = navigator.geolocation.watchPosition((location) => {
      this.setState({lastlocation: location}, () => {
        this.sortedDataSource()
      });
    });
  }

  componentWillUnmount() {
     navigator.geolocation.clearWatch(this.state.watchID);
  }

  sortedDataSource() {
    this.setState({
      sortedDataSource: this.state.dataSource
    })
  }

  parkDidUpdate() {
    return axios({
        url: 'https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&maxfeatures=30&request=GetFeature&typename=pvo_patrimoine_voirie.pvoparkingtr&SRSNAME=urn:ogc:def:crs:EPSG::4171',
        headers: {'Authorization' : 'Basic cGF1bGluZS5tb250Y2hhdUBnbWFpbC5jb206RXBpdGVjaDQyLjIwMDc='}
      })
      .then((response) => response.data)
      .then((responseData) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseData.features),
          markers: responseData.features,
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
    if (results.data.status == "OK") {
      this.setState({
        region: getRegion(results.data.results[0].geometry.location.lat, results.data.results[0].geometry.location.lng )
      });
    }
  }

  handleCoords(coords) {
    this.setState({
      region: getRegion(coords.latitude, coords.longitude)
    });

  }

  getImageForMarker(marker) {
    let cMax = parseInt(marker.properties.capacitevoiture);
    let s = marker.properties.etat;
  	let i = s.indexOf(' ')
  	let currentLot = parseInt([s.slice(0,i), s.slice(i+1)][0], 10)

    if (isNaN(currentLot)) {
  		currentLot = 0
  	}

    let perc = currentLot/cMax;
    var percent = 1 - perc;



    if(percent > 0.85) {
      return redImage;
    } else if (perc > 0.70) {
      return yellowImage;
    } else {
      return greenImage;
    }

    return greenImage;
  }

  render() {
    return (
      <View style={styles.container}  >
       <SearchBar style={styles.searchBar}  callback={(text) => this.searchCallback(text)} />
         <MapView.Animated
           initialRegion={{
             latitude:  this.state.lastlocation.coords.latitude,
             longitude: this.state.lastlocation.coords.longitude,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421,
           }}
            region={this.state.region}
            onPress={(e) => this.onMapPress(e)}
            style={styles.map}
         >
           {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={{latitude: marker.geometry.coordinates[1], longitude:marker.geometry.coordinates[0]}}
              key={marker.properties.nom}
              title={marker.properties.nom}
              description={marker.properties.etat}
              image={this.getImageForMarker(marker)}

            />
          ))}
         </MapView.Animated>
         <ListComponent isLoading={this.state.isLoading} dataSource={this.state.dataSource} lastlocation={this.state.lastlocation} handleClick={c => this.handleCoords(c)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column'
 },
 map: {
   height: 300,
   width: 400,
 },
 searchBar: {
   position: 'absolute',
   top: 5,
   right: 5,
 }
});
