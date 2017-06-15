import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import ListComponent from './components/ListComponent';
=======
import DistanceLabel from './components/DistanceLabel';
import ParkingLotView from './components/ParkingLotView';
>>>>>>> f569a6cf0713fb406b2f909b73603f05a785c75a

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ListComponent/>
//         <DistanceLabel originLat={45.7760072} originLng={4.8007158000000345} destLat={45.76052199999999} destLng={4.862372999999934}/>
//         <ParkingLotView maxLot={200} currentLot={170}/>
      </View>
    );
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
