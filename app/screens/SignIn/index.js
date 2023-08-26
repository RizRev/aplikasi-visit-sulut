import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions, ApplicationActions } from '@actions';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { Header, SafeAreaView, Icon, Text, Button, TextInput } from '@components';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import * as actionTypes from '../../actions/actionTypes';
import { showMessage } from 'react-native-flash-message';

export default function SignIn({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({ id: true, password: true });
  const travelType = useSelector(state => state.application.travel);
  // const expoPushToken = useSelector(state => state.application.token);

  const loginStart = () => {
    return {
      type: actionTypes.LOGIN_START,
    };
  };
  
  const loginSuccessAction = login => {
    return {
      type: actionTypes.LOGIN_SUCCESS,
      login,
    };
  };
  
  const loginFailed = () => {
    return {
      type: actionTypes.LOGIN_ERROR,
    };
  };
  
  const onLogin = () => {
    // console.log("Test");
    // dispatch(AuthActions.authentication(false));
    if (email === '' || password === '') {
      setSuccess({
        ...success,
        email: false,
        password: false,
      });
    } else {
      setLoading(true);
      dispatch(loginStart()); // Dispatch login start action

      const apiUrl = 'http://b.visit-northsulawesi.com/api/login';
         
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, travelType }),
      })
        .then(response => response.json()) // Parse the JSON response
        .then(responseJson => {
          setLoading(false);
          console.log("INI DATA : ",responseJson);
          if (responseJson.success === true) { // Check the success field in responseJson
            console.log("Revan Mongo : ",responseJson.result.user.expoPushToken);
            dispatch(loginSuccessAction(responseJson.result));
            dispatch(ApplicationActions.onAddToken(responseJson.result.user.expoPushToken));
            if (travelType==='tourguide') {
              navigation.navigate('MainTourGuide');

            } else {
              navigation.goBack();
            }
            
            // Rest of your code
          } else {
            // Handle login failure
            showMessage({
              message: 'Login failed',
              description: 'Invalid credentials',
              type: 'danger',
            });
          }
        })
        .catch(error => {
          setLoading(false);
          console.error('Error:', error);
          dispatch(loginFailed()); // Dispatch login failed action
          if (error instanceof TypeError) {
            // Handle network errors
            showMessage({
              message: 'Network error',
              description: 'Please check your internet connection',
              type: 'warning',
            });
          } else {
            // Handle other errors
            showMessage({
              message: 'An error occurred',
              description: 'Please try again later',
              type: 'warning',
            });
          }
        });
    }
  };

  const auth = useSelector(state => state.auth);
  const loginSuccess = auth.login.success;

  useEffect(() => {
    if (!loginSuccess) {
      showMessage({
        message: 'Invalid credentials',
        description: 'Please check your email and password',
        type: 'warning',
      });
    }
  }, [loginSuccess]);
  
  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t('sign_in')}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{ flex: 1 }}
        >
          <View style={styles.contain}>
            <TextInput
              onChangeText={text => setEmail(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  email: true,
                });
              }}
              placeholder={t('input_id')}
              success={success.email}
              value={email}
            />
            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={text => setPassword(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  password: true,
                });
              }}
              placeholder={t('input_password')}
              secureTextEntry={true}
              success={success.password}
              value={password}
            />
            <Button
            style={{ marginTop: 20 }}
            full
            loading={loading}
            onPress={() => {
              onLogin();
            }}
          >
            {t('sign_in')}
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPassword')}
          >
            <Text body1 grayColor style={{ marginTop: 25 }}>
              {t('forgot_your_password')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text body1 style={{ color: '#87CEFA', marginTop: 10 }}>
              Register Here
            </Text>
          </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
