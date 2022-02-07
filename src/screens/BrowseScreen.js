import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';

const BrowseScreen = () => {
  const loginState = useSelector(state => state.loginState);
  useEffect(() => {
    console.log(loginState);
    axios
      .get('https://nox-podcast-api.vercel.app/search', {
        headers: {
          Authorization: `Bearer ${loginState.token}`,
        },
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <View>
      <Text>Browse screen</Text>
    </View>
  );
};

export default BrowseScreen;
