import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
//import redux stuff
import {Provider} from 'react-redux';
import store from './src/redux/store';
//import Screens and Components
import LoginScreen from './src/screens/LoginScreen';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.body}>
        <StatusBar hidden />
        <LoginScreen />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default App;
