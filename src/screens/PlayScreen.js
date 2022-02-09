import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import * as Progress from 'react-native-progress';
import {Slider} from '@miblanchard/react-native-slider';
import {toHHMMSS} from '../utils/toHHMMSS';

const PlayScreen = ({navigation, route}) => {
  const {podcast} = route.params;
  const [pod, setPod] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  let timer;

  useEffect(() => {
    const track = new Sound(podcast.audio_url, null, e => {
      if (e) {
        console.log('error loading track:', e);
      } else {
        track.play();
        //track.getCurrentTime(second => setCurrentTime(second));
        // const timer = setInterval(() => {
        //   setCurrentTime(i + 1);
        //   console.log(i);
        // }, 1000);
        setDuration(track.getDuration());
        timer = setInterval(() => {
          track.getCurrentTime(second => setCurrentTime(second));
        }, 1000);
      }
    });
    setPod(track);
    setIsPlaying(true);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (pod === '') return null;

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
              <Pressable
                onPress={() => {
                  pod.stop();
                  navigation.navigate('Browse');
                }}>
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
              <Pressable
                onPress={() => {
                  pod.getCurrentTime(second => {
                    pod.setCurrentTime(second - 10);
                    setCurrentTime(second);
                  });
                }}>
                <Image
                  style={styles.preFrwIcons}
                  source={require('../assets/img/prev.png')}
                />
              </Pressable>
              {isPlaying ? (
                <Pressable
                  onPress={() => {
                    pod.pause();
                    setIsPlaying(false);
                  }}>
                  <Image
                    style={styles.playPauseIcon}
                    source={require('../assets/img/Pause.png')}
                  />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    pod.play();
                    setIsPlaying(true);
                  }}>
                  <Image
                    style={styles.playPauseIcon}
                    source={require('../assets/img/Play.png')}
                  />
                </Pressable>
              )}
              <Pressable
                onPress={() => {
                  pod.getCurrentTime(second => {
                    pod.setCurrentTime(second + 10);
                    setCurrentTime(second);
                  });
                }}>
                <Image
                  style={styles.preFrwIcons}
                  source={require('../assets/img/forward.png')}
                />
              </Pressable>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={styles.infosContainer}>
        <Slider
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onValueChange={value => {
            setCurrentTime(value[0]);
            //console.log(value[0]);
            pod.setCurrentTime(value[0]);
          }}
          containerStyle={{width: '100%', marginTop: 30}}
          thumbStyle={{backgroundColor: '#3369ff'}}
          trackStyle={{backgroundColor: '#fff'}}
        />
        <View style={styles.likesContainer}>
          <View style={styles.likeContainer}>
            <Image
              source={require('../assets/img/like.png')}
              style={{width: 31, height: 31, marginRight: 9}}
            />
            <Text style={styles.likeCount}>{podcast.likes}</Text>
          </View>
          <View>
            <Text style={styles.durationText}>
              {toHHMMSS(duration - currentTime)}
            </Text>
          </View>
          <View style={styles.likeContainer}>
            <Text style={styles.dislikeCount}>{podcast.dislikes}</Text>
            <Image
              source={require('../assets/img/unlike.png')}
              style={{width: 31, height: 31, marginLeft: 9}}
            />
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.extraInfoContainer}>
          <View style={styles.episodeContainer}>
            <View style={styles.waveContainer}>
              <Image
                source={require('../assets/img/sound-wave.png')}
                style={{width: 13, height: 10}}
              />
            </View>
            <Text style={styles.episodeText}>Episode 2</Text>
          </View>
          <View style={styles.episodeContainer}>
            <Image
              source={require('../assets/img/download.png')}
              style={{width: 32, height: 32, marginRight: 10}}
            />
            <Text style={styles.episodeText}>{podcast.file_size} mb</Text>
          </View>
          <View>
            <Image
              source={require('../assets/img/dots.png')}
              style={{width: 4, height: 16}}
            />
          </View>
        </View>
        <Text style={styles.description}>{podcast.description}</Text>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  likesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#fff',
  },
  durationText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#fff',
  },
  dislikeCount: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: 'rgba(137,143,151,1)',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(137,143,151,0.15)',
    marginVertical: 20,
  },
  extraInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  waveContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(25,35,47,1)',
    borderRadius: 16,
    marginRight: 10,
  },
  episodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  episodeText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#fff',
  },
  description: {
    flex: 1,
    width: '100%',
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: 'rgba(137,143,151,1)',
    lineHeight: 22,
    overflow: 'scroll',
  },
});
export default PlayScreen;
