import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const APIKEY = 'AIzaSyDTLYMpxG8TtIRP_e9_4EnjGvCFrZ6v2dg';



export default class DistanceLabel extends React.Component {


    constructor(props) {
        super(props);
        this.state = { distance: "" };
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.distance.length == 0 &&
                    <ActivityIndicator styleAttr="Small" />}
                {this.state.distance.length >= 0 && <Text style={styles.label}>{this.state.distance}</Text>}
            </View>
        );
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.computeDistance(this.props.originLat, this.props.originLng, this.props.destLat, this.props.destLng);

    }


    computeDistance(originLat, originLng, destLat, destLng) {
        axios.get('https://maps.googleapis.com/maps/api/directions/json',
            {
                params: {
                    origin: '' + originLat + ',' + originLng,
                    destination: '' + destLat + ',' + destLng,
                    APIKEY: APIKEY,
                    mode: 'DRIVING'
                }
            }
        ).then(this.resultDistance.bind(this));

    }

    resultDistance(response) {
        this.setState({ distance: response.data.routes[0].legs[0].distance.text });
    }

}

DistanceLabel.PropTypes = {
    originLat: PropTypes.number,
    originLng: PropTypes.number,
    destLat: PropTypes.number,
    destLng: PropTypes.number
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: { 
        marginLeft: 10,
        fontSize: 20,
        color: 'rgb(155,155,155)',
    }
});

// Clé api distance API (google)
// AIzaSyDTLYMpxG8TtIRP_e9_4EnjGvCFrZ6v2dg
