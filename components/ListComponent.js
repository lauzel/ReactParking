import React, { Component } from 'react';
import { AppRegistry, ListView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ParkCell from './ParkCell';

export default class ListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      lastlocation: null,
      watchID: (null: ?number),
      sortedDataSource: null
    }
    this.parkDidUpdate()
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        this.setState({lastlocation: location}, () => {
          this.sortedDataSource()
        });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 30}
    );
    this.state.watchID = navigator.geolocation.watchPosition((location) => {
      this.setState({lastlocation: location}, () => {
        this.sortedDataSource()
      });
    });
  }

  componentWillUnmount() {
     navigator.geolocation.clearWatch(this.state.watchID);
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
        }, () => {
          this.sortedDataSource()
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sortedDataSource() {
    console.log(this.state.lastlocation.coords.latitude)
    console.log(this.state.lastlocation.coords.longitude)
    this.setState({
      sortedDataSource: this.state.dataSource
    })
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
      <View style={{flex: 1, paddingTop: 20, flexDirection: 'row'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <ParkCell data={rowData} location={this.state.lastlocation}/>}
        />
      </View>
    );
  }
}