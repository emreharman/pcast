import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
//import utils
import {validateEmail} from '../utils/validateEmail';
//import redux stuff
import {
  loginStart,
  loginSuccess,
  loginFail,
} from '../redux/actions/loginActions';
import {useSelector, useDispatch} from 'react-redux';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(state => state.loginState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    dispatch(loginStart());
    if (email === '' || password === '') {
      Alert.alert("Email or password can't be empty.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Email format is wrong.');
      return;
    }
    axios
      .post('https://nox-podcast-api.vercel.app/login', {email, password})
      .then(res => {
        Alert.alert('Login successful');
        dispatch(loginSuccess(res.data.access_token));
      })
      .catch(err => {
        Alert.alert('Email or password is wrong!');
        dispatch(loginFail(err.message));
      });
  };
  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={styles.image}
        source={require('../assets/img/loginBg.png')}>
        <LinearGradient
          colors={[
            'rgba(9, 18, 28,0.9)',
            'rgba(9, 18, 28,1)',
            'rgba(9, 18, 28,1)',
            'rgba(9, 18, 28,0.9)',
          ]}
          locations={[0, 0.25, 0.75, 1]}
          style={styles.loginContainer}>
          <View style={styles.logoContainer}>
            <ImageBackground
              style={styles.logo}
              source={require('../assets/img/logo.png')}></ImageBackground>
          </View>
          <View style={styles.subTextContainer}>
            <Text style={styles.subText}>
              Episodic series of digital audio.
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require('../assets/img/mail.png')}
            />
            <TextInput
              style={styles.inputText}
              placeholderTextColor="rgba(137, 143, 151, 1)"
              placeholder="E-mail address"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />
          </View>
          <View style={[styles.inputContainer, styles.mt16]}>
            <Image
              style={styles.inputIcon}
              source={require('../assets/img/key.png')}
            />
            <TextInput
              style={styles.inputText}
              placeholderTextColor="rgba(137, 143, 151, 1)"
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <Pressable style={styles.loginBtnContainer} onPress={handleSubmit}>
            <Text style={styles.loginBtnText}>Login</Text>
          </Pressable>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  loginContainer: {
    width: '95%',
    height: '95%',
    borderBottomRightRadius: 24,
    paddingHorizontal: 32,
  },
  logoContainer: {
    width: 156,
    height: 72,
    marginTop: 51,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  subTextContainer: {
    width: 195,
    marginTop: 48,
    marginBottom: 72,
  },
  subText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    color: 'rgba(255,255,255,1)',
    lineHeight: 30,
  },
  inputContainer: {
    width: '90%',
    height: 58,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    borderBottomRightRadius: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 24,
  },
  inputText: {
    color: 'rgba(137, 143, 151, 1)',
    flex: 1,
  },
  mt16: {
    marginTop: 16,
  },
  loginBtnContainer: {
    width: '90%',
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    backgroundColor: '#3369ff',
    marginTop: 30,
    shadowColor: 'rgba(51, 105, 255, 0.7)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 50,

    elevation: 10,
  },
  loginBtnText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: 'rgba(255,255,255,1)',
  },
});

export default LoginScreen;
