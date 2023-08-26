import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity,Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions, ApplicationActions} from '@actions';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDetail,
  ProfilePerformance,
} from '@components';
import styles from './styles';
import {UserData} from '@data';
import {useTranslation} from 'react-i18next';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
// import {WebView} from 'react-native-webview'

export default function Profile({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [userData] = useState(UserData[0]);
  const dispatch = useDispatch();
  const isSuccess = useSelector(state => state.auth.login.success);
  let   user;
  let   image;
  const [success, setSuccess] = useState({ id: true, password: true });
  const travelType = useSelector(state => state.application.travel);
  // const [modalVisible,setModalVisible] = useState(false)

  // const openModal = () => {
  //   setModalVisible(true)
  // }

  // const url = 'https://app.sandbox.midtrans.com/snap/v3/redirection/edf57b73-8d7c-4feb-a59f-6d50d46fc479'

  if (travelType==='tourguide') {
    user = useSelector(state => state.auth.login.client);
  } else {
    user = useSelector(state => state.auth.login.user);
  }
  
  console.log("Test : ",isSuccess);
  /**
   * @description Simple logout with Redux
   * @author Lutfi
   * @date 2023-05-08
   */


  // console.log("Current isLoggedIn :",userId);

  // console.log("User : ",user)
  const onLogOut = () => {
    if (!user) {
      console.log('User not defined, cannot log out.');
      return;
    }
    
    const userId = user.id;
    console.log('User ID:', userId);
  
    // setLoading(true);
  
    // dispatch(AuthActions.authentication(false, response => {
      // console.log('Logout action dispatched:', response);
  
      if (travelType==='tourguide') {
        // Update isLoggedIn status on the backend
        fetch('http://b.visit-northsulawesi.com/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, travelType }),
        })
          .then(response => response.json())
          .then(data => {
            setLoading(false);
            console.log('Logout response:', data);
            // Rest of your code
            dispatch(AuthActions.authentication(false));
            dispatch(ApplicationActions.onClearToken());
            navigation.navigate('TravelSelection');  
          })
          .catch(error => {
            setLoading(false);
            console.error('Error:', error);
            // Handle error
          });
      } else {
        // Update isLoggedIn status on the backend
      fetch('http://b.visit-northsulawesi.com/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, travelType }),
      })
        .then(response => response.json())
        .then(data => {
          setLoading(false);
          console.log('Logout response:', data);
          // Rest of your code
          dispatch(ApplicationActions.onClearToken());
          dispatch(AuthActions.authentication(false));
        })
        .catch(error => {
          setLoading(false);
          console.error('Error:', error);
          // Handle error
        });
      }
      
    // }));
  };
  
  const onLogin = () => {
    navigation.navigate('SignIn');    
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('profile')}
        renderRight={() => {
          return <Icon name="bell" size={24} color={colors.primary} />;
        }}
        onPressRight={() => {
          navigation.navigate('Notification');
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <ScrollView>
          <View style={styles.contain}>
              {isSuccess && ( // Only show these components when isSuccess is true
              <>
                <ProfileDetail
                  image={travelType === 'tourguide' ? user.imageProfile : user.image}
                  textFirst={user.name}
                  point={userData.point}
                  textSecond={user.address}
                  textThird={user.surname}
                  onPress={() => navigation.navigate('ProfileExanple')}
                />
                <ProfilePerformance
                  data={userData.performance}
                  style={{marginTop: 20, marginBottom: 20}}
                />
                <TouchableOpacity
                  style={[
                    styles.profileItem,
                    {borderBottomColor: colors.border, borderBottomWidth: 1},
                  ]}
                  onPress={() => {
                    navigation.navigate('ProfileEdit');
                  }}
                >
                  <Text body1>{t('edit_profile')}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{marginLeft: 5}}
                    enableRTL={true}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.profileItem,
                    {borderBottomColor: colors.border, borderBottomWidth: 1},
                  ]}
                  onPress={() => {
                    navigation.navigate('ChangePassword');
                  }}
                >
                  <Text body1>{t('change_password')}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{marginLeft: 5}}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              style={[
                styles.profileItem,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => {
                navigation.navigate('Currency');
              }}>
              <Text body1>{t('currency')}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text body1 grayColor>
                  USD
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </View>
            </TouchableOpacity>
            {isSuccess && ( // Only show these components when isSuccess is true
              <TouchableOpacity
                style={[
                  styles.profileItem,
                  {borderBottomColor: colors.border, borderBottomWidth: 1},
                ]}
                onPress={() => navigation.navigate('MyPaymentMethod')}>
                <Text body1>{t('my_cards')}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Setting');
              }}>
              <Text body1>{t('setting')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                console.log('web view');
                WebBrowser.openBrowserAsync('https://app.sandbox.midtrans.com/snap/v3/redirection/de3235bb-1e3a-4744-a7ff-164684b976e9')
              }}
              >
              <Text body1>Coba Web View</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </TouchableOpacity>
            {/* <Modal visible={modalVisible} >
              <View style={{backgroundColor:'grey',height:800}}>
                  <WebView
                  source={{ uri : url }}
                  //startInLoadingState
                  //scalesPageToFit
                />
              </View>
            </Modal> */}
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          {isSuccess === false ? (
            // If not logged in, render "Sign In" button
            <Button full onPress={() => onLogin()}>
              {t('sign_in')}
            </Button>
          ) : (
            // If logged in, render "Sign Out" button
            <Button full loading={loading} onPress={() => onLogOut()}>
              {t('sign_out')}
            </Button>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
