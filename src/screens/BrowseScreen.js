import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';

const BrowseScreen = () => {
  const searchRef = useRef(null);
  const loginState = useSelector(state => state.loginState);
  const [podcasts, setPodcasts] = useState('');
  useEffect(() => {
    axios
      .get('https://nox-podcast-api.vercel.app/search', {
        headers: {
          Authorization: `Bearer ${loginState.token}`,
        },
      })
      .then(res => {
        setPodcasts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  if (podcasts === '') return null;
  return (
    <Pressable style={styles.body} onPress={() => Keyboard.dismiss()}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/img/logo.png')} />
      </View>
      <View>
        <Text style={styles.headerText}>Browse</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Type to search..."
          placeholderTextColor="#fff"
          ref={searchRef}
          selectionColor="#fff"
        />
        <Pressable onPress={() => searchRef.current.focus()}>
          <Image
            style={styles.searchIcon}
            source={require('../assets/img/search.png')}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'rgba(9, 18, 28, 1)',
    paddingHorizontal: 33,
    paddingVertical: 53,
  },
  logoContainer: {
    width: 90,
    height: 42,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  headerText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 48,
    color: '#fff',
    marginTop: 35,
  },
  searchContainer: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(1,3,4,1)',
    borderRadius: 16,
    marginTop: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
});
export default BrowseScreen;
