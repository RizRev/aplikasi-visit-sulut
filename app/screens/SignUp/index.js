import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, Image, ActivityIndicator, TouchableWithoutFeedback, Keyboard, ActionSheetIOS, Alert} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Button, TextInput, Text} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as Utils from '@utils';
import { showMessage } from 'react-native-flash-message';
import { ImageLoad } from 'react-native-image-placeholder';
import MultiSelect from 'react-native-multiple-select';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {ApplicationActions} from '@actions';
import {useDispatch} from 'react-redux';
import { number } from 'prop-types';
import * as Notifications from 'expo-notifications'; // Import Expo Notifications
import { registerIndieID } from 'native-notify';


export default function SignUp({navigation}) {
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dgbtjwctx/image/upload';
  const CLOUDINARY_PRESET = 'wwmb6npl';
  const headers = {
    accept: 'application/json',
    'content-type': 'multipart/form-data',
  };
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const [idcard, setIdCard] = useState('');
  const [surname, setSurName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [lang, setLanguage] = useState('');
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    name: true,
    email: true,
    address: true,
    password: true,
    phone: true,
    image: false, // Initially set to false: 
    image2: false,
  });
  const tourguideLanguages = useSelector(state => state.application.tourguide_language);
  const travelType = useSelector(state => state.application.travel);
  // const expoPushToken = useSelector(state => state.application.token);
  const selectedLanguages = Array.isArray(tourguideLanguages) ? tourguideLanguages.join(', ') : '';
  const dispatch = useDispatch();
  let expoPushToken;
  /**
   * call when action signup
   *
   */

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }
  
  expoPushToken = generateRandomString(40);
  
  const onSignUp = async () => {
    registerIndieID(expoPushToken, 10715, '7P4LhbDCRWDvxZv5IZv175');
    if (name == '' || email == '' || image == '' || expoPushToken == '') {
      showMessage({
        message: 'Error',
        description: 'Please fill in all required fields',
        type: 'danger',
      });
      setSuccess({
        ...success,
        name: name !== '' ? true : false,
        email: email !== '' ? true : false,
        password: password !== '' ? true : false,
        address: address !== '' ? true : false,
      });
      return;
    } else {
      if (travelType==='tourguide') {
          setLoading(true);
          const expoPushToken = generateRandomString(10);
          try {
            const response = await axios.post('http://b.visit-northsulawesi.com/api/client/create', {
              idcard,
              surname,
              name,
              email,
              password,
              address,
              website,
              phone,
              lang: selectedLanguages,
              image: image || '',
              image2: image2 || '',
              expoPushToken,
            },{
              headers: {
                'Content-Type': 'application/json',
                // Add other headers as needed
              },
            });
      
            console.log('API response:', response.data);
            setLoading(false);
            
            navigation.navigate('SignIn');
          } catch (error) {
            console.log('API request error:', error);
            setLoading(false);
            showMessage({
              message: 'Error',
              description: 'Failed to sign up. Please try again later.',
              type: 'danger',
            });
          }
      } else {
        if (image == '' || image == null || expoPushToken == '') {
          Alert.alert('Alert', 'Image is empty or Please activate your notification permission.');
        } else {
          setLoading(true);
          try {
            const response = await axios.post('http://b.visit-northsulawesi.com/api/register', {
              name,
              email,
              password,
              image: image,
              expoPushToken
            },{
              headers: {
                'Content-Type': 'application/json',
                // Add other headers as needed
              },
            });
      
            console.log('API response:', response.data);
            setLoading(false);
            // dispatch(ApplicationActions.onAddToken(expoPushToken));
            navigation.navigate('SignIn');
          } catch (error) {
            console.log('API request error:', error);
            setLoading(false);
            showMessage({
              message: 'Error',
              description: 'Failed to sign up. Please try again later.',
              type: 'danger',
            });
          }
        }
      }
    }
  };

  const uploadImage = async (uri, index) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'image',
        type: 'image/jpeg',
      });
      formData.append('upload_preset', CLOUDINARY_PRESET);
  
      setLoading(true);
  
      const response = await axios.post(CLOUDINARY_URL, formData, { headers });
      console.log('Image upload response:', response.data);
  
      if (response.data && response.data.secure_url) {
        const imageUrl = response.data.secure_url;
  
        if (index === 1) {
          setImage(imageUrl);
          setSuccess({
            ...success,
            image: true,
          });
        } else if (index === 2) {
          setImage2(imageUrl);
          setSuccess({
            ...success,
            image2: true,
          });
        }
      }
  
      setLoading(false);
    } catch (error) {
      console.log('Image upload error:', error);
      setLoading(false);
    }
  };
  

  const showActionSheet = () => {
    return new Promise((resolve) => {
      if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Cancel', 'Take Photo', 'Choose from Library'],
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if (buttonIndex === 1) {
              resolve('camera');
            } else if (buttonIndex === 2) {
              resolve('library');
            } else {
              resolve('cancel');
            }
          }
        );
      } else {
        // For Android or other platforms, you can use a custom action sheet library or UI component
        // to provide a similar selection interface.
        // Here, we'll use a basic Alert with buttons to simulate an action sheet on Android.
        Alert.alert(
          'Choose Image Source',
          '',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => resolve('cancel'),
            },
            {
              text: 'Take Photo',
              onPress: () => resolve('camera'),
            },
            {
              text: 'Choose from Library',
              onPress: () => resolve('library'),
            },
          ],
          { cancelable: true }
        );
      }
    });
  };
  
  const pickImage = async (index) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }
  
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermission.status !== 'granted') {
        console.log('Camera permission denied');
      }
  
      const selectedSource = await showActionSheet();
      let result;
      if (selectedSource === 'camera') {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
      } else if (selectedSource === 'library') {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
      }
  
      if (!result.canceled && result.assets.length > 0) {
        const assetUri = result.assets[0].uri;
        if (index === 1) {
          setImage(assetUri);
          uploadImage(assetUri, index);
        } else if (index === 2) {
          setImage2(assetUri);
          uploadImage(assetUri, index);
        }
      }
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };
  

  const navigateToOtherPage = () => {
    navigation.navigate('TourGuideLanguage'); // Replace 'OtherPage' with the name of the desired page
  };

  const handleGoBack = () => {
    dispatch(ApplicationActions.onClearTourGuideLanguage());
    navigation.goBack();
  };
  
  return (
    <View style={{flex: 1}}>
      <Header
        title={t('sign_up')}
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
        onPressLeft={handleGoBack}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              {/* Conditional rendering of TextInput Tourguide or Traveler */}
              
              <View style={styles.contain}>
              {travelType === 'tourguide' && (
                <TextInput
                  onChangeText={text => setIdCard(text)}
                  placeholder={t('input_id')}
                  success={success.idcard}
                  value={idcard}
                />
                )}
                <TextInput
                  style={{marginTop: 10}}
                  onChangeText={text => setName(text)}
                  placeholder="Full Name"
                  success={success.name}
                  value={name}
                />
                {/* Conditional rendering of TextInput Tourguide or Traveler */}
                {travelType === 'tourguide' && (
                <TextInput
                  style={{marginTop: 10}}
                  onChangeText={text => setSurName(text)}
                  placeholder="Surname"
                  success={success.surname}
                  value={surname}
                />
                )}
                <TextInput
                  style={{marginTop: 10}}
                  onChangeText={text => setEmail(text)}
                  placeholder={t('input_email')}
                  keyboardType="email-address"
                  success={success.email}
                  value={email}
                />
                <TextInput
                  style={{ marginTop: 10 }}
                  onChangeText={text => setPassword(text)}
                  placeholder="Password"
                  secureTextEntry
                  success={success.password}
                  value={password}
                />
                {/* Conditional rendering of TextInput Tourguide or Traveler */}
                {travelType === 'tourguide' && (
                <TextInput
                  style={{marginTop: 10}}
                  onChangeText={text => setAddress(text)}
                  placeholder={t('input_address')}
                  success={success.address}
                  value={address}
                />
                )}
                {/* Conditional rendering of TextInput Tourguide or Traveler */}
                {travelType === 'tourguide' && (
                  <TextInput
                    style={{marginTop: 10}}
                    onChangeText={text => setWebsite(text)}
                    placeholder="Website"
                    success={success.website}
                    value={website}
                  />
                )}
                {travelType === 'tourguide' && (
                <TextInput
                  style={{marginTop: 10}}
                  onChangeText={text => setPhone(text)}
                  placeholder="Phone"
                  success={success.phone}
                  value={phone}
                />
                )}
                {/* Conditional rendering of TextInput Tourguide or Traveler */}
                {travelType === 'tourguide' && (
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.languageButton}>
                      <TouchableOpacity style={styles.languageButtonTouchable} onPress={navigateToOtherPage}>
                        <Text style={styles.languageButtonText}>{selectedLanguages || 'Language'}</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                )}
                <TouchableOpacity style={{marginTop: 10, marginLeft: -205}} onPress={() => pickImage(1)}>
                  {loading && success.image ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    // <Image source={require('../../../assets/profile.png')} style={styles.imagePreview} />
                    <>
                      {image && success.image ? (
                        <Image source={{ uri: image }} style={styles.imagePreview} />
                      ) : (
                        <Image
                          source={require('../../../assets/profile.png')}
                          style={styles.placeholderImage}
                        />
                      )}
                    </>
                  )}
                </TouchableOpacity>
                
                {/* Conditional rendering of TextInput Tourguide or Traveler */}
                {travelType === 'tourguide' && (
                  <TouchableOpacity style={{marginTop: -5, marginLeft: -205}} onPress={() => pickImage(2)}>
                    {loading && success.image2 ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                          // <Image source={require('../../../assets/certificate.png')} style={styles.imagePreview} />
                          <>
                            {image2 && success.image2 ? (
                              <Image source={{ uri: image2 }} style={styles.imagePreview} />
                            ) : (
                              <Image
                                source={require('../../../assets/certificate.png')}
                                style={styles.placeholderImage}
                              />
                            )}
                          </>
                    )}
                  </TouchableOpacity>
                )}
                <Button
                  full
                  style={{marginTop: 0}}
                  loading={loading}
                  onPress={() => onSignUp()}>
                  {t('sign_up')}
                </Button>
                <TouchableOpacity
                  style={[styles.loginLink, { marginTop: 5 }]}
                  onPress={() => navigation.navigate('SignIn')}
                >
                  <Text style={[styles.loginLinkText, { color: '#13aabc' }]}>
                    Already Registered? Login here
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
