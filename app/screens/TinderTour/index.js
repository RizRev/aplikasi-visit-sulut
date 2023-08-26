import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet,Text,View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { TinderCard } from '../../components/TinderCard';
import { getTinderTour } from '../../data/tindertour';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {Header,Icon} from '@components'
import * as Notifications from 'expo-notifications'; // Import Expo Notifications


const TinderTour = ({navigation}) => {
  const [cardsData, setCardsData] = useState([]);
  // const [expoPushToken, setExpoPushToken] = useState(null); 
  userId = useSelector(state => state.auth.login.user.id);
  expoPushToken = useSelector(state => state.application.token);
  // console.log("REVAN MONGO : ",message);

  useEffect(() => {
    fetchTinderTourData();
    // registerForPushNotificationsAsync();
  }, []);

  const fetchTinderTourData = async () => {
    try {
      const data = await getTinderTour();
      // Assuming the ID field in your Tinder tour data is named "id"
      const cardsWithDataAndId = data.map((cardData) => ({
        ...cardData,
        id: cardData.id, // Replace "id" with the actual name of the ID field in your data
      }));
      setCardsData(cardsWithDataAndId);
      console.log("Data DANCOK : ",JSON.stringify(cardsWithDataAndId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const registerForPushNotificationsAsync = async () => {
  //   const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //   let finalStatus = existingStatus;

  //   if (existingStatus !== 'granted') {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     finalStatus = status;
  //   }

  //   if (finalStatus !== 'granted') {
  //     console.log('Permission to receive notifications was denied.');
  //     return;
  //   }

  //   const token = (await Notifications.getExpoPushTokenAsync()).data;
  //   setExpoPushToken(token); // Store the Expo push token in state
  //   console.log('Expo Push Token:', token);
  // };
  

  const onSwipeLeft = async (index) => {
    const swipedCardId = cardsData[index].id;
    console.log('Swiped left on card with ID:', swipedCardId);
    console.log('User ID:', userId);
  
    try {
      const response = await fetch('http://192.168.1.110/api/swipe/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          swipedCardId,
          userId,
          isLiked: false, // Set this value based on left swipe or right swipe logic
        }),
      });

      console.log("MONGO : ",JSON.stringify({
        swipedCardId,
        userId,
        isLiked: false, // Set this value based on left swipe or right swipe logic
      }));
  
      const data = await response.json();
      console.log('API Response:', data);
  
      // You can add your logic here for what happens when the API call is successful
    } catch (error) {
      console.error('Error:', error);
      // You can add your logic here for error handling
    }
  };
  
  const onSwipeRight = async (index) => {
    const swipedCardId = cardsData[index].id;
    const swipedToken = cardsData[index].expoPushToken;
    // console.log('Swiped right on card with ID:', swipedCardId);
    console.log('User ID:', userId);
  
    try {
      const response = await fetch('http://b.visit-northsulawesi.com/api/swipe/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          swipedCardId,
          userId,
          expoPushToken: swipedToken,
          isLiked: true, // Set this value based on left swipe or right swipe logic
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const onTapCard = async () => {
    console.log('ini tap card')
  }
  

  console.log("Data Tinder : ",cardsData);

  const renderCard = (cardData, index) => <TinderCard key={index} {...cardData} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{height:200,width:200}}>
      <Text style={{color:'white'}}>Haloo</Text>
      </View> */}
      <Header
        title={`Tinder Tour`}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={'blue'}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{flex: 1,backgroundColor:'white'}}>
      <Swiper
        key={cardsData.id}
        cards={cardsData}
        renderCard={renderCard}
        infinite
        backgroundColor="white"
        cardHorizontalMargin={0}
        stackSize={2}
        onSwipedLeft={onSwipeLeft}
        onSwipedRight={onSwipeRight}
        onTapCard={onTapCard}
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default TinderTour;
