import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet,Text,View, Platform } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { TinderCard } from '../../components/TinderCard';
import { getTinderTraveller } from '../../data/tindertraveller';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {Header,Icon} from '@components'
import { database } from '../../config/firebase'
import { generateId } from '@config'
import { 
    collection, 
    doc, 
    getDoc,
    setDoc, 
    serverTimestamp, 
    updateDoc, 
    addDoc, 
    orderBy, 
    query, 
    onSnapshot, 
    QuerySnapshot,
    getDocs 
} from 'firebase/firestore';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const TourAlone = ({navigation}) => {
  const [cardsData, setCardsData] = useState([]);
  const user = useSelector(state => state.auth.login.user);
  const userId = useSelector(state => state.auth.login.user.id);
  const name = useSelector(state => state.auth.login.user.name);
  const imageId = useSelector(state => state.auth.login.user.image);
  const expoPushToken = useSelector(state => state.application.token);

  useEffect(() => {
    fetchTinderTourData();
  }, []);

  const fetchTinderTourData = async () => {
    try {
      const data = await getTinderTraveller();
      const filteredData = data.filter((cardData) => cardData.id !== userId);
      const cardsWithDataAndId = filteredData.map((cardData) => ({
        ...cardData,
        id: cardData.id,
      }));
      // console.log("TEST : ",cardsWithDataAndId);
      setCardsData(cardsWithDataAndId);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onSwipeLeft = async (index) => {
    if (!cardsData[index]) return;
    const swipedCardId = cardsData[index].id;
    const swipedToken = cardsData[index].expoPushToken;
    try {
      const swipedCardDocRef = doc(database, "users", userId, "passes", swipedCardId);
      const swipeData = {
        swiper: userId,
        swipee: swipedCardId,
        swipedAt: serverTimestamp(),
        isLiked: false,
        expoPushToken: swipedToken,
        image: cardsData[index].imageSrc
      };
      await setDoc(swipedCardDocRef, {
        [userId]: swipeData,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const onSwipeRight = async (index) => {
    if (!cardsData[index]) return;
  
    const swipedCard = cardsData[index];
    const swipedCardId = cardsData[index].id;
    const swipedToken = cardsData[index].expoPushToken;
    const swipedImage = cardsData[index].imageSrc;
    const swipedName = cardsData[index].name;
  
    const swipeData = {
      swiper: userId,
      swipee: swipedCardId,
      swipedAt: serverTimestamp(),
      isLiked: true,
      expoPushToken: swipedToken,
      image: swipedImage,
    };
  
    const swipeDocRef = doc(database, "users", userId, "swipes", swipedCardId);
    const swipeDocRefReverse = doc(database, "users", swipedCardId, "swipes", userId);
    const swipeDocSnapshot = await getDoc(swipeDocRef);
    if (swipeDocSnapshot.exists()) {
      console.log("You have already match!!!");
    } else {
      try {
        const swipeDocSnapshotReverse = await getDoc(swipeDocRefReverse);
        console.log("swipeDocSnapshot : ",JSON.stringify(swipeDocSnapshot.exists()));
        if (swipeDocSnapshotReverse.exists()) {
          // console.log("Masuk sini");
          // If a swipe document already exists, it's a match
          const matchId = `match-${userId}-${swipedCardId}`;
          console.log("Generate Match Id : ",matchId);
          const matchData = {
            matchId: matchId,
            ["swiper"]: {
              id: userId,
              message: "You Got Match!",
              expoPushToken: expoPushToken,
              image: imageId,
              name: name
            },
            ["swipee"]: {
              id: swipedCardId,
              message: "You Got Match!",
              expoPushToken: swipedToken,
              image: swipedImage,
              name: swipedName
            },
            usersMatched: [userId, swipedCardId],
            timeStamp: serverTimestamp(),
          };
          await setDoc(swipeDocRef, { [userId]: swipeData });
          await setDoc(doc(database, "matches", matchId), matchData);

          try {
            const axiosResponse = await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
              subID: expoPushToken,
              appId: 10715,
              appToken: '7P4LhbDCRWDvxZv5IZv175',
              title: 'New Notification',
              message: 'You got match!'
            });

            const axiosResponseReceiver = await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
              subID: swipedToken,
              appId: 10715,
              appToken: '7P4LhbDCRWDvxZv5IZv175',
              title: 'New Notification',
              message: 'You got match!'
            });

            // console.log("RESPONSE : ",JSON.stringify(axiosResponse));
            // console.log("RESPONSE : ",JSON.stringify(axiosResponseReceiver));

            if (axiosResponse.status === 201 && axiosResponseReceiver.status === 201) {
              console.log('Push notification sent successfully!');
            } else {
              console.error('Error sending push notification:', axiosResponse.statusText);
            }
          } catch (error) {
            console.error('Error posting match data to API:', error);
          }
          navigation.navigate("Match", {
            matchData,
          });
          console.log("INI MATCH !!!!");
        } else {
          await setDoc(swipeDocRef, { [userId]: swipeData });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  
  
  
  const onTapCard = async () => {
    console.log('ini tap card')
  }
  

  // console.log("Data Tinder : ",cardsData);

  const renderCard = (cardData, index) => <TinderCard key={index} {...cardData} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{height:200,width:200}}>
      <Text style={{color:'white'}}>Haloo</Text>
      </View> */}
      <Header
        title={`Traveller Swipe`}
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
    marginTop: Platform.OS === 'ios' ? -50 : 0,
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default TourAlone;