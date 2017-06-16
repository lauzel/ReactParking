import React, { Component } from 'react';
import { AppRegistry, ListView, StyleSheet, Text, View, ActivityIndicator, Animated, PanResponder } from 'react-native';
import axios from 'axios';
import ParkCell from './ParkCell';

export default class ListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pan     : new Animated.ValueXY(),
    }

    this.panResponder = PanResponder.create({    //Step 2
       onStartShouldSetPanResponder : () => true,
       onPanResponderMove           : Animated.event([null,{ //Step 3
           dx : this.state.pan.x,
           dy : this.state.pan.y
       }]),
       onPanResponderRelease        : (e, gesture) => {} //Step 4
   });
  }

  render() {
      if (this.props.isLoading || this.props.dataSource == []) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      } else {
        return (
          <View style={{flex: 1, paddingTop: 20, flexDirection: 'row'}}>
            <ListView
              dataSource={this.props.dataSource}
              renderRow={(rowData) => <ParkCell data={rowData} handleClick={(e, coords) => this.props.handleClick(coords)} location={this.props.lastlocation}/>}
            />
          </View>
        );
      }
    }
}
