import {Images} from '@config';
import React, {useState, useEffect, useRef} from 'react';
import {RefreshControl, FlatList, View, BackHandler, Text} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, ListThumbSquare} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import * as Notifications from 'expo-notifications';
import {useRoute} from '@react-navigation/native';
import { database } from '../../config/firebase'
import { collection, addDoc, doc, getDoc, orderBy, query, onSnapshot, QuerySnapshot,getDocs, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function MessengerTraveller({navigation}) {
  const userId = useSelector(state => state.auth.login.user.id);
  const route = useRoute();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [swiperdata, setSwiperData] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const responseListener = useRef();
  const [refreshing, setRefreshing] = useState(false);
  const [messagesData, setMessagesData] = useState([]); 
  const [matches, setMatches] = useState([]);
  let temp;

  // console.log("User Id : ",userId);
  useEffect(() => {
    const matchesCollectionRef = collection(database, 'matches');
    // const q = query(matchesCollectionRef, orderBy('timeStamp', 'asc'));
    const q = query(
      matchesCollectionRef
    );
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.docs.length === 0) {
        // Handle the case where there are no documents in the collection.
        console.log("No documents found in 'matches' collection.");
        return;
      }
  
      const updatedMatches = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        swiper: doc.data().swiper,
        swipee: doc.data().swipee,
        usersMatched: doc.data().usersMatched,
        timeStamp: doc.data().timeStamp,
      }));

      const filteredData = [];
      const filterFinal = [];
      for (let i = 0; i < updatedMatches.length; i++) {
        const item = updatedMatches[i];
        if (item.swiper.id === userId || item.swipee.id === userId) {
          if (item.swiper.id !== userId) {
            const data = {
              matchId: item.id,
              user: item.swiper,
              time: item.timeStamp
            }
            filterFinal.push(data);
          } else if (item.swipee.id !== userId) {
            const data = {
              matchId: item.id,
              user: item.swipee,
              time: item.timeStamp
            }
            filterFinal.push(data);
          }
        }
      }

      console.log("Testing : ",JSON.stringify(filterFinal));
      setMatches(filterFinal);
      // console.log("Filtered Matches: ", JSON.stringify(filteredMatches));
    });
  
    return () => unsubscribe();
  }, []);
  
  // Helper function to format Firestore timestamp to HH:MM
  const formatTimestamp = (firestoreTimestamp) => {
    if (firestoreTimestamp && firestoreTimestamp.toDate) {
      const date = firestoreTimestamp.toDate();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      console.error("Invalid timestamp format.");
      return '';
    }
  };
  

  const handleRefresh = () => {
    setRefreshing(true);
    // Fetch new data if needed
    setRefreshing(false);
  };

  const handlePress = (item, token) => {
    const matchId = item
    // console.log("Masuk Inbox",token);
    // const updatedMessages = [...messagesData];
    // updatedMessages[index].read = true;
    // setMessagesData(updatedMessages);
    navigation.navigate('Messages', {item: item, token: token});
  };
  
  return (
    <View style={{flex: 1}}>
      <Header title={t('messenger')} />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        {matches.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                colors={[colors.primary]}
                tintColor={colors.primary}
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            data={matches}
            keyExtractor={item => item.matchId}
            renderItem={({item, index}) => (
              <ListThumbSquare
                onPress={() => handlePress(item.matchId, item.user.expoPushToken)}
                image={item.user.image}
                txtLeftTitle={item.user.name}
                txtContent={item.user.message}
                txtRight={item.user.timeStamp}
                unread={!item.read}
              />
            )}
          />
        ) : (
          <Text>No messages available</Text>
        )}
      </SafeAreaView>
    </View>
  );
}
