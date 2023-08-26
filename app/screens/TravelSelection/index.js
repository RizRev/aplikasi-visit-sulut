import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { onChangeTravel } from '../../actions/application';
import {ApplicationActions} from '@actions';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";

const TravelSelection = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState(null); 
  const dispatch = useDispatch();
  const cities = [
    { name: 'traveller', image: require('../../assets/images/traveller.jpg'), text: 'I am Traveller' },
    { name: 'tourguide', image: require('../../assets/images/tour-guide.jpg'), text: 'I am Tour Guide' },
  ];

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    setExpoPushToken(token);
    // dispatch(ApplicationActions.onAddToken(token));
    console.log('Expo Push Token:', token);
  
    return token;
  };

  const onChange = (option) => {
    dispatch(onChangeTravel(option));
    if (option === 'traveller') {
      navigation.navigate('Options');
    } else if (option === 'tourguide') {
      navigation.navigate('SignUp');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.mainLokasi}>Explain Us</Text>

      <ScrollView
        style={styles.cardContainer}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        {cities.map(city => (
          <TouchableOpacity key={city.name} onPress={() => onChange(city.name)} style={styles.cardImageContainer}>
            <Image source={city.image} style={styles.cardImage} />
            <View style={styles.imageOverlay}>
              <Text style={styles.imageText}>{city.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Rest of the component */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  mainLokasi: {
    fontSize: 24,
    marginTop: hp('8%'),
    marginBottom: hp('1%'),
  },
  cardContainer: {
    flex: 1,
    marginBottom: hp('6%'),
  },
  cardImageContainer: {
    marginVertical: hp('1%'), // Add margin
    borderWidth: 1,
    borderColor: '#DA7DE1',
    borderRadius: 10,
    overflow: 'hidden', // Ensure the border stays within the image boundaries
  },
  cardImage: {
    width: wp('85%'),
    height: hp('25%'),
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#DA7DE1',
    borderRadius: 20,
    paddingHorizontal: wp('5%'),
    paddingVertical: 10,
    marginVertical: hp('6%'),
    width: wp('85%'),
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  alertContainer: {
    backgroundColor: '#fff',
    padding: wp('5%'),
    borderRadius: 20,
  },
  alertText: {
    color: '#000',
    fontSize: 20,
    marginBottom: hp('3%'),
    textAlign: 'center',
  },
  alertDescription: {
    textAlign: 'center',
    fontSize: 15,
  },
  backButton: {
    backgroundColor: '#DA7DE1',
    borderRadius: 20,
    marginHorizontal: wp('10%'),
    marginTop: hp('5%'),
  },
  backButtonText: {
    color: '#fff',
    padding: 7,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default TravelSelection;
