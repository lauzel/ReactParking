import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View, TouchableHighlight } from 'react-native';

import locateUserImg from '../img/ic_gps_fixed_black.png';


/**
 * 
 * EX :
 * 
 * <LocateUserBtn userLat={45} userLng={5} callback={this.locateUser.bind(this)} />
 * 
 */
export default class LocateUserBtn extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor={"#A0A0A0"} style={styles.btn} onPress={this.locateUser.bind(this)}>
                    <Image style={styles.imgbtn} source={locateUserImg} />
                </TouchableHighlight>
            </View>
        );
    }

    locateUser() {
        this.props.callback(this.props.userLat, this.props.userLng);
    }

    componentDidMount() {
    }

}

LocateUserBtn.PropTypes = {
    userLat: PropTypes.number,
    userLng: PropTypes.number,
    callback: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        shadowColor: 'red',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        borderRadius: 30
    }
})