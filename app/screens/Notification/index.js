import React, {useState,useEffect} from 'react';
import {RefreshControl, FlatList, View,Text} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import {Header, SafeAreaView, Icon, ListThumbCircle} from '@components';
import styles from './styles';
import {NotificationData} from '@data';
import {useDispatch, useSelector} from 'react-redux';
import * as WebBrowser from 'expo-web-browser';

export default function Notification({navigation}) {
  const userId = useSelector(state => state.auth.login.user.id);
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [refreshing] = useState(false);
  const [notification,setNotification] = useState([]);
  useEffect (() =>{
    fetchMatchData()
    console.log('notification',notification)
  },[])
  const fetchMatchData = async () => {
    console.log('user id get match notification',userId)
    const response = await fetch(`http://b.visit-northsulawesi.com/api/match/get-match/${userId}`)
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("ini response fetch data match",jsonResponse.result)
      setNotification(jsonResponse.result)

      // Menampilkan data imageSrc dari setiap elemen dalam array notification
      jsonResponse.result.forEach(notificationItem => {
      const imageSrcArray = notificationItem.client.imageSrc;
      console.log('imageSrc for a notification:', imageSrcArray);
      // Lakukan manipulasi atau tindakan lain dengan imageSrcArray
    });
    }
  }

  const handlePress = (item) => {
    console.log(`${item}`)
    if (notification[item].product[0].payment[0].status === 'settlement') {
      console.log('masuk settlement',notification[item].id) 
      navigation.navigate('Messages', {matchId:notification[item].id})
    } else  {
      console.log('tidak masuk settlement')
      navigation.navigate('PricingTable',{url:notification[item].product[0].payment[0].url});
      // WebBrowser.openBrowserAsync(`${notification[item].product[0].payment[0].url}`)
    }
    console.log('data press',notification[item].product[0].payment[0].status)
  }

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('notification')}
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
        { notification.length !== 0  ? 
        <View>
          <FlatList
        contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={() => {}}
          />
        }
        data={notification}
        keyExtractor={(item, index) => item.id}
        renderItem={({item, index}) => (
          <View>
          {/* <Text>{item.product[0].payment[0].status}</Text> */}
          <ListThumbCircle
            onPress={() => handlePress(index)}
            image={item.client.imageSrc[0].url}
            txtLeftTitle={item.client.surname}
            txtContent={item.product[0].payment[0].status}
            txtRight={item.createdAt}
            style={{marginBottom: 5}}
          />
          </View>
        )}
      />
        </View> : 
        <View>
        </View>
        }
      </SafeAreaView>
    </View>
  );
}
