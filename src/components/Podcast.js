import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Podcast = props => {
  const {podcast, navigation} = props;
  return (
    <Pressable style={styles.container}>
      <ImageBackground
        style={styles.img}
        imageStyle={{borderRadius: 24, borderBottomRightRadius: 0}}
        source={require('../assets/img/podcast.jpg')}>
        <LinearGradient
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['rgba(9,18,28,0.8)', 'rgba(9,18,28,0)']}>
          <Text style={styles.title}>{podcast.title.substring(0, 40)} ...</Text>
          <View style={styles.infosContainer}>
            <View>
              <View style={styles.dateContainer}>
                <Text style={styles.timeText}>
                  {new Date().toLocaleDateString()}
                </Text>
                <Image
                  style={styles.timeIcon}
                  source={require('../assets/img/time.png')}
                />
                <Text style={styles.timeText}>
                  {new Date().toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.authorContainer}>
                <Image
                  style={styles.profileImg}
                  source={require('../assets/img/profile.jpg')}
                />
                <Text style={styles.authorText}>{podcast.author}</Text>
              </View>
            </View>
            <Pressable
              style={styles.playIconContainer}
              onPress={() => navigation.navigate('Play', {podcast})}>
              <Image
                style={styles.playIcon}
                source={require('../assets/img/Play.png')}
              />
            </Pressable>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,

    marginBottom: 20,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderBottomRightRadius: 0,
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  img: {
    flex: 1,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    color: '#fff',
  },
  timeIcon: {
    width: 13,
    height: 13,
    marginHorizontal: 10,
  },
  timeText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: 'rgba(137,143,151,1)',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 19,
  },
  profileImg: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  authorText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: '#fff',
    marginLeft: 8,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playIconContainer: {
    width: 51,
    height: 51,
  },
  playIcon: {
    width: '100%',
    height: '100%',
  },
  infosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Podcast;
