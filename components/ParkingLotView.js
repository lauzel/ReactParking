import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

export default class ParkingLotView extends React.Component {


    constructor(props) {
        super(props);
        this.state = { color: this.chooseColor() };

    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.state.color }]}>
                <View style={styles.lot}>
                    <Text style={styles.currentLot}>{this.props.currentLot}</Text>
                    <Text style={styles.maxLot}>/ {this.props.maxLot}</Text>
                </View>
                <Text style={styles.text}>PLACES DISPONIBLES</Text>
            </View>

        );
    }

    chooseColor() {
        var percent = 1 - (this.props.currentLot / this.props.maxLot);
        var color = "";
        if (percent > 0.85) {
            color = "#D36B78"
        }
        else if (percent > 0.70) {
            color = "#F5C923";
        } else {
            color = "#50E3C2";
        }
        return color;
    }
}


ParkingLotView.PropTypes = {
    maxLot: PropTypes.number,
    currentLot: PropTypes.number
};


const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100
    },
    lot: {
        marginLeft: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    currentLot: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
    },
    maxLot: {
        alignSelf: 'flex-end',
        fontSize: 14,
        color: '#D3B8BC',
    },
    text: {
        marginBottom: 5,
        marginRight: 5,
        textAlign: 'right',
        marginTop: 'auto',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

        color: 'white',
        fontSize: 12,
        alignSelf: 'flex-end'
    }
});
