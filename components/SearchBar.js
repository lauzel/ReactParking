import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Animated, Image, TouchableHighlight, TextInput, View, Keyboard } from 'react-native';

import searchImg from '../img/ic_search_black.png';
import closeImg from '../img/ic_close_black.png';

/**
 * 
 * 
 *  EX :
 *  <SearchBar style={styles.search} callback={() => console.log('CALLBACK !!!!')} />
 * 
 * 
 */

export default class SearchBar extends React.Component {


    constructor(props) {
        super(props);
        this.state = { isDeploy: false, widthInput: new Animated.Value(0), myText: "" };
    }

    render() {
        return (
            <View style={styles.container} >
                <TouchableHighlight underlayColor={"#A0A0A0"} style={styles.btn} onPress={this.onClickSearch.bind(this)} title={''}>
                    <View>
                        {!this.state.isDeploy && <Image style={styles.imgbtn} source={searchImg} />}
                        {this.state.isDeploy && <Image style={styles.imgbtn} source={closeImg} />}
                    </View>
                </TouchableHighlight>

                <Animated.View style={{ width: this.state.widthInput }}>
                    {this.state.isDeploy && <TextInput returnKeyType={'search'} onChange={this.handleSearchChange.bind(this)} onSubmitEditing={(event) => this.onSubmitSearch(event.nativeEvent.text)} placeholder={"Lyon Vaise"} style={[styles.textInput]} value={this.state.myText} />}
                </Animated.View>
            </View>
        );
    }

    onSubmitSearch(text) {
       console.log(this.state.myText);
       this.props.callback();
    }

    handleSearchChange(e) {        
        this.setState({ myText: e.nativeEvent.text });
    }

    componentDidMount() {
    }

    onClickSearch() {

        if (!this.state.isDeploy) {
            Animated.timing(
                this.state.widthInput,
                {
                    toValue: 300,
                    duration: 600,
                }
            ).start();
        } else {
            Keyboard.dismiss();
            Animated.timing(
                this.state.widthInput,
                {
                    toValue: 0,
                    duration: 600,
                }
            ).start();
        }
        this.setState({ isDeploy: !this.state.isDeploy });
    }

}

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
    },
    textInput: {
        width: 300,
        fontSize: 18,
        padding: 10
    },

    imgbtn: {
        width: 40,
        height: 40
    }
});

SearchBar.PropTypes = {
    callback: PropTypes.func
};