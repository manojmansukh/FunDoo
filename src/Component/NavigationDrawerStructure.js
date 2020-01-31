import React, { Component } from 'react';
import { View, Image, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Home'
import Notes from './Dashboard';
import Reminder from './Reminder';
import Archive from './Archive';
import Deleted from './DeleteNotePage';
import Settings from './Settings';
import Help from './Help';
import CreateLable from './CreateLabel';
import Logout from './Logout'
import Appbar1 from './AppBar1'

class NavigationDrawerStructure extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gridView: true,
    }
  }

  toggleDrawer = () => { this.props.navigationProps.toggleDrawer() }

  listView = () => { this.setState({ gridView: !this.state.gridView }) }

  render() {
    return (
      <View style={{ display: 'flex', flexDirection: 'row', }}>
        {/* <Appbar style ={{ backgroundColor:'white'}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('../Image/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5, tintColor: 'black' }}
          />
        </TouchableOpacity>
        
        
        <TouchableOpacity 
          style={{ position: 'relative', top: 2, height: 23, width: 25,marginHorizontal:350  }}
          onPress={this.listView}>
          <Image source={(this.state.gridView) ? require('../Image/Grid.png') : require('../Image/List1.png')}
            style={{ width: 25, height: 25, marginLeft: '0%', }} />
        </TouchableOpacity>
        
        </Appbar> */}
      </View>
    );
  }
}

// const Home_StackNavigator = createStackNavigator({
//   //All the screen from the Screen1 will be indexed here
//   Home: {
//     screen: Home,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Home',
//       //header:null,
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

const Notes_StackNavigator = createStackNavigator({
  Notes: {
    screen: Notes,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});

const Reminder_StackNavigator = createStackNavigator({
  Reminder: {
    screen: Reminder,
    navigationOptions: ({ navigation }) => ({
      header: null,

    }),
  },
});

const CreateLabel_StackNavigator = createStackNavigator({
  Reminder: {
    screen: CreateLable,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});

const Archive_StackNavigator = createStackNavigator({
  Archive: {
    screen: Archive,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});

const Deleted_StackNavigator = createStackNavigator({
  Archive: {
    screen: Deleted,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});

const Settings_StackNavigator = createStackNavigator({
  Archive: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});

const Help_StackNavigator = createStackNavigator({
  Archive: {
    screen: Help,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});

const Logout_StackNavigator = createStackNavigator({
  Archive: {
    screen: Logout,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});

const AppDrawerNavigator = createDrawerNavigator({
  //Drawer Optons and indexing
  // NavHome: {
  //   screen: Home_StackNavigator,
  //   navigationOptions: {
  //     drawerLabel: 'Home',
  //     drawerIcon: ({ tintColor }) => (
  //       <Image
  //         source={require("../Image/home1.png")}
  //         resizeMode="contain"
  //         style={{ width: 20, height: 30, tintColor: 'black' }}
  //       />
  //     ),
  //   },
  // },

  NavNotes: {
    screen: Notes_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Notes',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("../Asserts/Note.png")}
          resizeMode="contain"
          style={{ width: 20, height: 30, tintColor: 'black' }}
        />
      ),
    },
  },

  NavReminder: {
    screen: Reminder_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Reminder',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("../Asserts/Reminder.png")}
          resizeMode="contain"
          style={{ width: 20, height: 30, tintColor: 'black' }}
        />
      ),
    },
  },

  NavCreateLabel: {
    screen: CreateLabel_StackNavigator,
    navigationOptions: {
      drawerLabel: 'CreateLabel',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("../Asserts/createLabel.png")}
          resizeMode="contain"
          style={{ width: 20, height: 30, tintColor: 'black' }}
        />
      ),
    },
  },

  NavArchive: {
    screen: Archive_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Archive',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("../Asserts/Archive.png")}
          resizeMode="contain"
          style={{ width: 20, height: 30, tintColor: tintColor }}
        />
      ),
    },
  },

  NavDeleted: {

    screen: Deleted_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Deleted',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("../Asserts/Deleted.png")}
          resizeMode="contain"
          style={{ width: 20, height: 30, tintColor: 'black' }}
        />
      ),
    },
  },

  NavSettings: {
    screen: Settings_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Settings',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("../Asserts/Settings.png")}
          resizeMode="contain"
          style={{ width: 20, height: 30, tintColor: 'black' }}
        />
      ),
    },
  },

  NavHelp: {
    screen: Help_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Help & FeedBack',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("../Asserts/Help.png")}
          resizeMode="contain"
          style={{ width: 20, height: 30, tintColor: 'black' }}
        />
      ),
    },
  },

  NavLogout: {
    screen: Logout_StackNavigator,
    navigationOptions: {

      drawerLabel: 'Logout',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("../Asserts/Help.png")}
          resizeMode="contain"
          style={{ width: 20, height: 30, tintColor: 'black' }}
        />
      ),
    },
  },

},
);

export default createAppContainer(AppDrawerNavigator);
