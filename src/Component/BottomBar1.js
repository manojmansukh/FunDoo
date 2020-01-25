import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Appbar, FAB, Portal, Provider , Menu} from 'react-native-paper';
import ColorPalette from 'react-native-color-palette'

export default class BottomBar extends Component {

  render() {
    return (
        <Appbar style={{ borderWidth: .1, backgroundColor: 'white', width:'100%', justifyContent: 'space-between'}}>
        <View style={{ flexDirection: 'row', }}>
          <Appbar.Action icon={require('../Image/tick.png')}/>
          <Appbar.Action icon={require('../Image/brush.png')}/>
          <Appbar.Action icon={require('../Image/miceicon.png')}/>
          <Appbar.Action icon={require('../Image/imageicon.png')}/>

        </View>
        <View style={{ fles: 1, backgroundColor: 'white' }}>
          <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
            onPress={ this.props.handleNavigation}>
            <Image style={{ height: "150%", bottom: 25, }} resizeMode="contain" source={require('../Image/addd.png')} />
          </TouchableOpacity>
        </View>
      </Appbar>
    );
  }
}

