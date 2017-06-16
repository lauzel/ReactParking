import React, { Component } from 'react';
import { AppRegistry, ListView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ParkCell from './ParkCell';

export default class ListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
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
              renderRow={(rowData) => <ParkCell data={rowData} location={this.props.lastlocation}/>}
            />
          </View>
        );
      }
    }
}
