import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PlayScreen from '../screens/PlayScreen';
import Trying from '../components/Trying';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({navigation, route}) => {
  const {podcast} = route.params;
  //console.log(podcast);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerContentContainerStyle: {
          height: '100%',
          backgroundColor: 'rgba(9, 18, 28, 1)',
        },
        drawerActiveBackgroundColor: 'rgba(137, 143, 151, 1)',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: 'rgba(137, 143, 151, 1)',
        drawerType: 'slide',
      }}>
      <Drawer.Screen
        name="Player"
        component={PlayScreen}
        initialParams={podcast}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
