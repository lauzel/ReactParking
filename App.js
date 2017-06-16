import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListComponent from './components/ListComponent';
import DistanceLabel from './components/DistanceLabel';
import ParkingLotView from './components/ParkingLotView';
import MapView from 'react-native-maps';
import DataContainer from './components/DataContainer';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       initialRegion : {
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }
    };

  }

  render() {
    return (
      <View style={styles.container}>
         <DataContainer />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column'
 }
});
