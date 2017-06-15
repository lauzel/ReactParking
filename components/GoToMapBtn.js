import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Button, View, Linking } from 'react-native';

export default class GoToMapBtn extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button onPress={this.redirectToMap.bind(this)} title="Y ALLER" color="#ED7171" accessibilityLabel="TOTO" />
        );
    }

    redirectToMap() {
        Linking.canOpenURL('geo:' + this.props.destLat + ',' + this.props.destLng).then(supported => {
            if (supported) {
                // Android
                Linking.openURL('geo:' + this.props.destLat + ',' + this.props.destLng);
            } else {
                // iOS
                Linking.openURL('http://maps.apple.com/?daddr=' + this.props.destLat + ',' + this.props.destLng);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    componentDidMount() {
    }

}

GoToMapBtn.PropTypes = {
    destLat: PropTypes.number,
    destLng: PropTypes.number
};