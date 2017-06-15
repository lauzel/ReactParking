import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListComponent from './components/ListComponent';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <ListComponent/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
