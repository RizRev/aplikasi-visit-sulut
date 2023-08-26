import React, {useState, useEffect, useRef} from 'react';
import {RefreshControl, FlatList, View, BackHandler, Text,Modal,TouchableOpacity,Image } from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, ListThumbSquare} from '@components';
import styles from './styles';
// import {MessagesData} from '@data';
import {useTranslation} from 'react-i18next';
import * as Notifications from 'expo-notifications';
import { useDispatch,useSelector } from 'react-redux';
import * as actionTypes from '../../actions/actionTypes';
import {ApplicationActions} from '@actions';
import axios from 'axios';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Messenger({navigation}) {
  const [role,setRole] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [swiperdata, setSwiperData] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const responseListener = useRef();
  const [refreshing, setRefreshing] = useState(false);
  const dataSwiper = useSelector(state => state.application.swiper);
  const travelType = useSelector(state => state.application.travel);
  let clientId
  if (travelType === 'tourguide') {
      clientId = useSelector(state => state.auth.login.client.id);
  } else  {
      clientId = useSelector(state => state.auth.login.user.id)
  }
  console.log('clientId',clientId)
  console.log('data redux swiper',dataSwiper)
  console.log('travel type',travelType)
  const [messagesData, setMessagesData] = useState(dataSwiper ? dataSwiper : []); // Store messages in state
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState('request');



  useEffect(() => {
    // Set up notification listeners
    Notifications.requestPermissionsAsync();
    
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      const notificationData = notification.request.content.data;
      const swiperData = notificationData.swiperData;
      console.log('notification data',notificationData)

      if (travelType === 'tourguide') {
        const formattedSwiperData = {
          id: swiperData.id,
          user: swiperData.swiper.name,
          userId: swiperData.swiper.id,
          message: 'You got swiped right by a Traveller!',
          image: swiperData.swiper.image,
          date: swiperData.createdAt,
          read: false,
          accept: false
        };
  
        setUnreadCount(prevUnreadCount => prevUnreadCount + 1); // Increment unread count
        console.log("Pesan tak terbaca : ",unreadCount);
        setMessagesData(prevMessagesData => {
          const newMessagesData = [formattedSwiperData, ...prevMessagesData]; // Add new message at the beginning
          dispatch(ApplicationActions.onAddSwiper(newMessagesData)); // Dispatch action
          return newMessagesData; // Return the updated messagesData for useState
        });
      }
      
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  const handleReject = () => {
    const updatedMessages = [...messagesData];
    updatedMessages.splice(selectedMessageIndex, 1);
    setMessagesData(updatedMessages);
    dispatch(ApplicationActions.onAddSwiper(updatedMessages));    
    setModalVisible(false);
  };

  const handleAccept = async () => {
    const user1Id = messagesData[selectedMessageIndex].userId
    setModalVisible(false);
    const apiUrl = 'http://b.visit-northsulawesi.com/api/match/create';
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            user1Id, 
            clientId
          }),
        })
        if (response.ok) {
          const jsonResponse = await response.json();
          console.log("ini response",jsonResponse)
          if (jsonResponse.success == true){
          const matchId = jsonResponse.result.id
          const updatedMessages = [...messagesData];
          updatedMessages[selectedMessageIndex].accept = true;
          updatedMessages[selectedMessageIndex].matchId = jsonResponse.result.id;
          dispatch(ApplicationActions.onAddSwiper(updatedMessages))
          console.log("ini match id",matchId,'hasil accept',updatedMessages[selectedMessageIndex])
          }
        } else {
          console.log("tidak ada response")
        }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Fetch new data if needed
    setRefreshing(false);
  };

  const handlePress = (index) => {
    setSelectedMessageIndex(index);
    if(activeTab === 'request'){
      setModalVisible(true);
    } 
    else {
      navigation.navigate('Messages', {matchId:messagesData[index].matchId})
    }
    console.log('index', index)
    const updatedMessages = [...messagesData];
    updatedMessages[index].read = true;
    console.log('update messages',updatedMessages)
    setMessagesData(updatedMessages);
    dispatch(ApplicationActions.onAddSwiper(updatedMessages))
  };
  

  console.log("BUDI BUDI SWIPER!!!", JSON.stringify(messagesData));
  return (
    <View style={{flex: 1}}>
      <Header title={t('messenger')} />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
          {/* {Tab Bar} */}
          {travelType === 'traveller' ? 
          <View></View> : 
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            // backgroundColor: colors.card,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: activeTab === 'request' ? 'blue' : 'grey',
              paddingVertical: 10,
            }}
            onPress={() => setActiveTab('request')}
          >
            <Text style={{ color: '#FFF' }}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: activeTab === 'accepted' ? 'blue' : 'grey',
              paddingVertical: 10,
            }}
            onPress={() => setActiveTab('accepted')}
          >
            <Text style={{ color: '#FFF' }}>Accepted</Text>
          </TouchableOpacity>
        </View>
          }
        {messagesData.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                colors={[colors.primary]}
                tintColor={colors.primary}
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            data={activeTab === 'request' ? messagesData.filter(item => !item.accept) : messagesData.filter(item => item.accept)}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <ListThumbSquare
                onPress={() => 
                  handlePress(index)
                }
                image={item.image}
                txtLeftTitle={item.user}
                txtContent={item.message}
                txtRight={item.date}
                unread={!item.read}
              />
            )}
          />
        ) : (
          <Text>No messages available</Text>
        )
        }
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1} // Untuk menghindari unggah input ke latar belakang modal saat di-tekan
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Warna latar belakang transparan dengan sedikit blur
          }}
          onPress={() => setModalVisible(false)} // Tutup modal saat latar belakang ditekan
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              width: '80%',
            }}
          >
            {/* Konten modal disini */}
            <Text style={{textAlign:'center'}}>Swiper Data Details</Text>
            {/* Tambahkan informasi dari data swiper yang dipilih */}
            {selectedMessageIndex !== -1 && (
              <>
              <Text>{messagesData[selectedMessageIndex]?.user}</Text>
              <Image source={{uri: messagesData[selectedMessageIndex]?.image}} style={{width:'20%',height:'20%'}} />
              </>
            )}
            <TouchableOpacity
              onPress={handleReject}
              style={{
                backgroundColor: 'red',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text style={{ color: 'white' }}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAccept}
              style={{
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text style={{ color: 'white' }}>Accept</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
