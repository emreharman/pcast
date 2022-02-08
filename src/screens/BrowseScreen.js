import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Keyboard,
  FlatList,
} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';

import {flatListItems} from '../utils/flatListItems';
import FlatListItem from '../components/FlatListItem';
import Podcast from '../components/Podcast';

const BrowseScreen = () => {
  const searchRef = useRef(null);
  const loginState = useSelector(state => state.loginState);
  const [podcasts, setPodcasts] = useState('');
  const [selectedFlatListItem, setSelectedFlatListItem] = useState('Podcasts');
  console.log(selectedFlatListItem);
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
      <FlatList
        style={styles.flatList}
        extraData={selectedFlatListItem}
        data={flatListItems}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <FlatListItem
            item={item}
            setSelectedFlatListItem={setSelectedFlatListItem}
            selectedFlatListItem={selectedFlatListItem}
          />
        )}
      />
      <View>
        <Text style={styles.selectedText}>
          {selectedFlatListItem} ({podcasts.length})
        </Text>
      </View>
      <FlatList
        data={podcasts}
        style={styles.podcastsFlatList}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => <Podcast podcast={item} />}
      />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'rgba(9, 18, 28, 1)',
    paddingHorizontal: 33,
    paddingVertical: 30,
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
    marginTop: 30,
  },
  searchContainer: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(1,3,4,1)',
    borderRadius: 16,
    marginTop: 30,
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
  flatList: {
    height: 90,
    marginTop: 32,
    flexGrow: 0,
  },
  selectedText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: 'rgba(137,143,151,1)',
    marginVertical: 20,
  },
  podcastsFlatList: {
    flex: 1,
  },
});
export default BrowseScreen;
