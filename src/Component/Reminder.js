import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppBar1 from './AppBar1'
import { styles } from '../CSS/Reminder.Style'

export default class Remainder extends Component {
  render() {
    return (
      <View>
        <AppBar1 navigation={this.props.navigation} />
     
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> Screen 2 </Text>
      </View>
      
      </View>
    );
  }
}
