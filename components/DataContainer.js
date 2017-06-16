import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import ListComponent from './ListComponent';
import MapView from 'react-native-maps';
import axios from 'axios';
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export default class DataContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
      dataSource: [],
      test: {
        latitude:  45.750000,
        longitude: 4.850000,
      }
    }

    this.parkDidUpdate()
  }

  componentDidMount() {

  }

  parkDidUpdate() {
    return axios({
        url: 'https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&maxfeatures=30&request=GetFeature&typename=pvo_patrimoine_voirie.pvoparkingtr&SRSNAME=urn:ogc:def:crs:EPSG::4171',
        headers: {'Authorization' : 'Basic cGF1bGluZS5tb250Y2hhdUBnbWFpbC5jb206RXBpdGVjaDQyLjIwMDc='}
      })
      .then((response) => response.data)
      .then((responseData) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log(responseData.features);
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

  render() {
    return (
      <View style={styles.container}>
         <MapView
           initialRegion={{
             latitude:  45.750000,
             longitude: 4.850000,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421,
           }}
            onPress={(e) => this.onMapPress(e)}
            style={styles.map}
         >
           {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={{latitude: marker.geometry.coordinates[1], longitude:marker.geometry.coordinates[0]}}
              key={marker.properties.nom}
              title={marker.properties.nom}
              description={marker.properties.etat}

            />
          ))}
         </MapView>
         <ListComponent isLoading={this.state.isLoading} dataSource={this.state.dataSource}/>
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
   height: 400,
   width: 400,
 },
});
