import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Appbar, FAB, Portal, Provider, Menu } from 'react-native-paper';
import ColorPalette from 'react-native-color-palette'
export default class Bottombar1 extends Component {

  render() {
    return (
      <Appbar style={{ borderWidth: .1, backgroundColor: 'white', width: '100%', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', }}>
          <Appbar.Action icon={require('../Image/tick.png')} />
          <Appbar.Action icon={require('../Image/brush.png')} />
          <Appbar.Action icon={require('../Image/miceicon.png')} />
          <Appbar.Action icon={require('../Image/imageicon.png')} />
          <TouchableOpacity onPress={this.props.handleBrowserOpen}>
          <Image source={require('../Image/Google2.png')}
          style={{height:20, width:20, margin:9, top:5}}/>
          </TouchableOpacity>


        </View>
        <View style={{ fles: 1, backgroundColor: 'white' }}>
          <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
            onPress={this.props.handleNavigation}>
            <Image style={{ height: "150%", bottom: 25, }} resizeMode="contain" source={require('../Image/addd.png')} />
          </TouchableOpacity>
        </View>
      </Appbar>
    );
  }
}

