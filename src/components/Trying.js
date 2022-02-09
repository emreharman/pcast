import React from 'react';
import {View, Text} from 'react-native';

const Trying = ({navigation, route}) => {
  const podcast = route.params;
  console.log(podcast);
  return (
    <View>
      <Text>Trying drawer</Text>
    </View>
  );
};

export default Trying;
