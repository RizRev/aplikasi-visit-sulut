import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity,Button, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { Images, BaseColor, useTheme } from '@config';
import { Image } from '@components';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';

export default function LandingPage({ navigation }) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const travelType = useSelector(state => state.application.travel);
  const user = useSelector(state => state.auth.login.client);

  const onProcess = async () => {
    await Font.loadAsync({
      // Load your fonts here
    });
    setIsLoading(false);
  };

  useEffect(() => {
    onProcess();
  }, []);

  const handleButtonPress = () => {
    // console.log("Anjrit");
    // console.log("User id : ",user.id);
    if (travelType === 'tourguide' && user?.id) {
      // Navigate to Messanger when travelType is 'tourguide' and user.id is not undefined
      navigation.navigate('MainTourGuide');
    } else {
      // Navigate to TravelSelection for other cases
      navigation.navigate('TravelSelection');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: BaseColor.whiteColor }]}>
      <SafeAreaView>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={BaseColor.primaryColor}
            />
          ) : (
            <>
             <TouchableOpacity
                    onPress={handleButtonPress}>
            <View style={styles.button_get_started}>
             
                      <Text>Get Started</Text>
                    
            </View>
            </TouchableOpacity>
              
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
