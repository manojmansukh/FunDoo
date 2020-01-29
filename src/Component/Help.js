import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import AppBar1 from './AppBar1'
import { styles } from '../CSS/Help.Style'

export default class Help extends Component {

  render() {
    return (
      <View>
        <AppBar1 navigation={this.props.navigation}/>

        <View style={styles.MainContainer}>
          <Text style={{ fontSize: 23 }}> Help </Text>
        </View>
      </View>
    );
  }
}