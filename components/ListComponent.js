import React, { Component } from 'react';
import { AppRegistry, ListView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default class ListComponent extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.dataSource);
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
        <View style={{flex: 1, paddingTop: 20}}>
          <ListView
            dataSource={this.props.dataSource}
            renderRow={(rowData) => <Text>{rowData.properties.nom}, {rowData.releaseYear}</Text>}
          />
        </View>
      );
    }
  }
}
