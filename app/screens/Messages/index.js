import React, {useState, useRef, useLayoutEffect, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BaseStyle, Images, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Image, Text, TextInput,ScrollView} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import { database } from '../../config/firebase'
import { collection, addDoc, orderBy, query, onSnapshot, QuerySnapshot,getDocs } from 'firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';


export default function Messages({navigation,route}) {
  const {item, token} = route?.params
  console.log("TOKEN : ",token);
  useEffect (() => {
    if (item) {
      console.log('ini match id',item)
    } else {
      console.log('tidak ada matchId')
    }
  },[])

  const user = useSelector(state => state.auth.login.client ? state.auth.login.client : state.auth.login.user);
  // console.log("ini user",user)

  const {t} = useTranslation();
  const {colors} = useTheme();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const refFlatList = useRef(null);
  const [message,setMessage] = useState('')
  const [messageFirebase,setMessageFirebase] = useState('')

useEffect(() => {
  const collectionRef = collection(database, "matches", item, "messages");
  const q = query(collectionRef, orderBy('createdAt', 'asc')); // Order by createdAt ascending

  const unsubscribe = onSnapshot(q, querySnapshot => {
    const updatedMessages = querySnapshot.docs.map((doc) => {
      const data = doc.data(); // Get the data within the document
      const id = doc.id; // Get the document ID
    
      // Access specific fields within the data
      const text = data.text;
      const createdAt = data.createdAt; // Convert Firestore timestamp to JavaScript Date
      const user = data.user;

      let formattedTime;
      const firestoreTimestamp = createdAt;
      if (firestoreTimestamp && firestoreTimestamp.toDate) {
        const date = firestoreTimestamp.toDate();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        formattedTime = `${hours}:${minutes}`;
        console.log(formattedTime); // This will print HH:MM
      } else {
        console.error("Invalid timestamp format.");
      }

      return {
        id: id,
        message: text,
        created: formattedTime,
        userId: user.id,
        username: user.name,
        image: user.image
      };
    });
    
    // Now, 'updatedMessages' contains the mapped data
    console.log("updatedMessages : ",JSON.stringify(updatedMessages));
    setMessage(updatedMessages);
    // Scroll to the end of the list when new messages arrive
    if (refFlatList.current) {
      setTimeout(() => {
        refFlatList.current.scrollToEnd({ animated: false });
      }, 500);
    }
  });

  // Unsubscribe when the component unmounts
  return () => unsubscribe();
}, []);

const sendMessageFirebase = async () => {
  if (messageFirebase !== '') {
    const newMessage = {
      text: messageFirebase,
      createdAt: new Date(), // Current time
      user: {
        name: `${user.surname ? user.surname : user.name}`,
        id: `${user.id}`,
        image: `${user.image}`
      },
    };
    try {
      // Add the new message to Firestore
      await addDoc(collection(database, "matches", item, "messages"), newMessage);

      // Send notifications to both the sender (expoPushToken) and receiver (swipedToken)
      const axiosResponse = await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
        subID: token, // Sender's push token
        appId: 10715,
        appToken: '7P4LhbDCRWDvxZv5IZv175',
        title: 'New Message',
        message: messageFirebase,
      });

      setMessageFirebase('');
    } catch (error) {
      console.error('Error sending message or notifications:', error);
    }
  }
};

  const renderItem = item => {
    // console.log("Item index:", item);
    if (item.username!==user.surname && item.username!==user.name) {
      return (
        <View style={styles.userContent}>
          <Image
            source={{uri: item.image}}
            style={[styles.avatar, {borderColor: colors.border}]}
          />
          <View style={{paddingHorizontal: 8, flex: 7}}>
            <Text caption1>{item.username}</Text>
            <View
              style={[
                styles.userContentMessage,
                {backgroundColor: colors.primaryLight},
              ]}>
              <Text body2 whiteColor>
                {item.message}
              </Text>
            </View>
          </View>
          <View style={styles.userContentDate}>
            <Text footnote numberOfLines={1}>
              {item.created}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.meContent}>
          <View style={styles.meContentDate}>
            <Text footnote numberOfLines={1}>
              {item.created}
            </Text>
          </View>
          <View style={{paddingLeft: 8, flex: 7}}>
            <View
              style={[styles.meContentMessage, {backgroundColor: colors.card}]}>
              <Text body2>{item.message}</Text>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('messages')}
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
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          style={{flex: 1, justifyContent: 'flex-end'}}
          // {Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          enabled
          >
          {
            message.length > 0 ? 
            <View style={{flex: 1}}>
            {/* {message.map((item) => (
              <View><Text>{item.text}</Text></View>
            ))} */}
            <FlatList
              ref={refFlatList}
              data={message}
              keyExtractor={(item, index) => item.id}
              renderItem=
              {({item}) => renderItem(item)}
            />
          </View> :
          <View>
          </View>
          }
          <View style={styles.inputContent}>
            <View style={{flex: 1}}>
              <TextInput
                onChangeText={text => setMessageFirebase(text)}
                // onSubmitEditing={() => sendMessageFirebase()}
                placeholder={t('type_message')}
                value={messageFirebase}
              />
            </View>
            <TouchableOpacity
              style={[styles.sendIcon, {backgroundColor: colors.primary}]}
              onPress={sendMessageFirebase}>
              <Icon
                name="paper-plane"
                size={20}
                color="white"
                enableRTL={true}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
