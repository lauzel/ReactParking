import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import DistanceLabel from './DistanceLabel';
import ParkingLotView from './ParkingLotView';

export default ParkCell = (props) => {
	let destLng = props.data.geometry.coordinates[0]
	let destLat = props.data.geometry.coordinates[1]
	var name = props.data.properties.nom.toUpperCase()
	var s = props.data.properties.etat
	var i = s.indexOf(' ')
	var currentLot = parseInt([s.slice(0,i), s.slice(i+1)][0], 10)
	if (isNaN(currentLot)) {
		currentLot = 0
	}
	let maxLot = parseInt(props.data.properties.capacitevoiture)

	console.log(currentLot)
    return (
      <View style={styles.cell}>
     	<ParkingLotView maxLot={maxLot} currentLot={currentLot}/>
     	<Text style={styles.name}>{name}</Text>
      	<DistanceLabel originLat={45.7760072} originLng={4.8007158000000345} destLat={destLat} destLng={destLng}/>
      </View>
    );
}

const styles = StyleSheet.create({
    cell: {
    	paddingTop: 1,
    	flex: 1, 
    	flexDirection: 'row'
    },
    name: {
    	flex: 2,
        marginLeft: 10,
        fontSize: 20,
        color: 'rgb(155,155,155)',
        maxHeight: 100
    },
});
