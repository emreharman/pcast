import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PlayScreen = ({navigation, route}) => {
  const {podcast} = route.params;
  return (
    <View style={styles.body}>
      <View style={styles.playHeaderContainer}>
        <ImageBackground
          style={styles.headerImg}
          source={require('../assets/img/podcast.jpg')}>
          <LinearGradient
            style={styles.gradient}
            colors={['rgba(9,18,28,0.8)', 'rgba(9,18,28,0)']}
            locations={[1, 1]}>
            <View style={styles.headerButtons}>
              <Pressable onPress={() => navigation.navigate('Browse')}>
                <Image
                  style={styles.backIcon}
                  source={require('../assets/img/back.png')}
                />
              </Pressable>
              <Pressable>
                <Image
                  style={styles.hmenuIcon}
                  source={require('../assets/img/hmenu.png')}
                />
              </Pressable>
            </View>
            <Text style={styles.podTitle}>
              {podcast.title.substring(0, 50)}
            </Text>
            <Text style={styles.authorText}>{podcast.author}</Text>
            <View style={styles.playButtons}>
              <Pressable>
                <Image
                  style={styles.preFrwIcons}
                  source={require('../assets/img/prev.png')}
                />
              </Pressable>
              <Pressable>
                <Image
                  style={styles.playPauseIcon}
                  source={require('../assets/img/Pause.png')}
                />
              </Pressable>
              <Pressable>
                <Image
                  style={styles.preFrwIcons}
                  source={require('../assets/img/forward.png')}
                />
              </Pressable>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={styles.infosContainer}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  playHeaderContainer: {
    width: '100%',
    height: 374,
    backgroundColor: 'gray',
  },
  headerImg: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  headerButtons: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 18,
    height: 18,
  },
  hmenuIcon: {
    width: 20,
    height: 14,
  },
  podTitle: {
    width: 236,
    marginTop: 45,
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  authorText: {
    marginTop: 12,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'rgba(137,143,151,1)',
  },
  playButtons: {
    width: 151,
    height: 51,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  preFrwIcons: {
    width: 18,
    height: 18,
  },
  playPauseIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  infosContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    backgroundColor: 'rgba(9,18,28,1)',
  },
});
export default PlayScreen;
