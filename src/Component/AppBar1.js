import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

export default class AppBar1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listView: true,
      searchTerm: '',
    }
  }

  toggleDrawer() {
    this.props.navigation.toggleDrawer()
  };

  GridView = () => {
    this.setState({ listView: !this.state.listView });
  }

  render() {
    return (
      <Appbar style={{ backgroundColor: 'white', borderRadius: 8, margin: 10 }}>
        <View style={{ flexDirection: 'row', width: '100%' }}>

          <View style={{ width: '70%', backgroundColor: 'white', flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this.toggleDrawer()}>
              <Image
                source={require('../Asserts/drawer.png')}
                style={{ width: 28, height: 28, margin: 10,  }} />
            </TouchableOpacity>
            <Text onPress={() => this.props.navigation.navigate('Search')}
              style={{ fontWeight: '400', fontSize: 17, top: 12,marginLeft:8}}>Search Your notes </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', width: '30%', backgroundColor: 'white', justifyContent: 'flex-end', justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{ position: 'relative', height: 'auto', width: 'auto', marginRight: 6 }}
              onPress={() => {
                this.setState({ listView: !this.state.listView }, () => {
                  this.props.handleListView(this.state.listView)
                });
              }}>
              <Image source={(this.state.listView) ? require('../Asserts/List4.png') : require('../Asserts/Grid2.png')}
                style={{ top: 0, width: 25, height: 25, margin: 10 ,tintColor:'grey'}} />
            </TouchableOpacity>
            <Avatar.Text size={35}
              style={{ backgroundColor: 'lightblue', marginRight: 5 ,top:5}} label="M" />
          </View>

        </View>
      </Appbar>
    );
  }
}

