import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const FlatListItem = props => {
  const {item, setSelectedFlatListItem, selectedFlatListItem} = props;
  return (
    <>
      {item.name === selectedFlatListItem ? (
        <View style={styles.container}>
          <LinearGradient
            style={styles.iconContainer}
            colors={['rgba(145, 190, 228, 0.25)', 'rgba(255, 255, 255, 0)']}>
            <Image
              style={[styles.icon, styles.activeIcon]}
              source={item.icon}
            />
          </LinearGradient>
          <Text style={styles.activeFlatText}>{item.name}</Text>
        </View>
      ) : (
        <Pressable
          style={styles.container}
          onPress={() => setSelectedFlatListItem(item.name)}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={item.icon} />
          </View>
          <Text style={styles.flatText}>{item.name}</Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 22,
  },
  activeFlatText: {
    color: '#fff',
    marginTop: 16,
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
  },
  flatText: {
    color: 'rgba(137, 143, 151, 1)',
    marginTop: 16,
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(25,35,47,1)',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 22,
    height: 22,
  },
  activeIcon: {
    tintColor: '#fff',
  },
});
export default FlatListItem;
