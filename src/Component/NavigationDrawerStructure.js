import React, { Component } from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import Notes from './Dashboard';
import Reminder from './Reminder';
import Archive from './Archive';
import Deleted from './DeleteNotePage';
import Settings from './Settings';
import Help from './Help';
import CreateLable from './CreateLabel';
import Logout from './Logout'


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
