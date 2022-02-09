import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BrowseScreen from '../screens/BrowseScreen';
import PlayScreen from '../screens/PlayScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Browse">
        <Stack.Screen
          name="Browse"
          component={BrowseScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Play"
          component={PlayScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
