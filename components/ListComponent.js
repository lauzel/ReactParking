import React, { Component } from 'react';
import { AppRegistry, ListView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default class ListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    this.parkDidUpdate()
  }

  parkDidUpdate() {
    return axios({
        url: 'https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&maxfeatures=30&request=GetFeature&typename=pvo_patrimoine_voirie.pvoparkingtr&SRSNAME=urn:ogc:def:crs:EPSG::4171',
        headers: {'Authorization' : 'Basic cGF1bGluZS5tb250Y2hhdUBnbWFpbC5jb206RXBpdGVjaDQyLjIwMDc='}
      })
      .then((response) => response.data)
      .then((responseData) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log(responseData)
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseData.features),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.properties.nom}, {rowData.releaseYear}</Text>}
        />
      </View>
    );
  }
}