import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Image,
  ProfileDescription,
} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import { useDispatch } from 'react-redux';
import {ApplicationActions} from '@actions';

export default function Options({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  let mode;

  const handleOptionPressAlone = () => {
    mode = 'Alone';
    dispatch(ApplicationActions.onAddMode(mode));
    navigation.navigate('LanguageFront');
  };
  const handleOptionPressGroup = () => {
    mode = 'Group';
    dispatch(ApplicationActions.onAddMode(mode));
    navigation.navigate('LanguageFront');
  };
  const handleOptionPressGuide = () => {
    mode = 'Guide';
    dispatch(ApplicationActions.onAddMode(mode));
    navigation.navigate('LanguageFront');
  };
  
  return (
    <View style={{flex: 1}}>
      <Header
        title="Tour"
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
        <ScrollView>
          {/* <View>
            <Image source={Images.trip4} style={{width: '100%', height: 135}} /> */}
            <View style={{marginTop: 20, marginLeft: 20}}>
              <Text title3 semibold >
                How do you like to travel?
              </Text>
              <View style={{marginTop: 10}}></View>
              <Text subhead >
                These 3 options let us 
                understand you for a
                personalized travel
                recommendations
                tailored to you.
              </Text>
              <View style={{marginTop: 20}}></View>
              <Text title3 semibold >
                Pick one,
              </Text>
            </View>
          {/* </View> */}
          <View style={{padding: 20}}>
            {/* Package */}
            <TouchableOpacity
                onPress={handleOptionPressAlone}
                style={{ marginTop: 10 }}>
                <Image
                  source={Images.trip1}
                  style={{width: '100%', height: 100}}
                />
                <View
                  style={[
                    styles.titleAbout,
                    {
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                    },
                  ]}>
                  <Icon
                    name="user"
                    solid
                    size={24}
                    color={BaseColor.whiteColor}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text title3 semibold whiteColor>
                      Alone
                    </Text>
                    <Text footnote whiteColor numberOfLines={2}>
                      Travel alone and explore every places at your own pace.
                    </Text>
                  </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleOptionPressGroup}
                style={{ marginTop: 10 }}>
              <Image
                source={Images.trip2}
                style={{width: '100%', height: 100}}
              />
              <View
                style={[
                  styles.titleAbout,
                  {
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                  },
                ]}>
                <Icon
                  name="users"
                  solid
                  size={24}
                  color={BaseColor.whiteColor}
                />
                <View style={{marginLeft: 10}}>
                  <Text title3 semibold whiteColor>
                    Group
                  </Text>
                  <Text footnote whiteColor numberOfLines={2}>
                    Andaz Tokyo Toranomon Hills is one of the newest luxury
                    hotels in Tokyo. Located in one of the uprising areas of
                    Tokyo
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleOptionPressGuide}
                style={{ marginTop: 10 }}>
              <Image
                source={Images.trip3}
                style={{width: '100%', height: 100}}
              />
              <View
                style={[
                  styles.titleAbout,
                  {
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                  },
                ]}>
                <Icon
                  name="globe"
                  solid
                  size={24}
                  color={BaseColor.whiteColor}
                />
                <View style={{marginLeft: 10}}>
                  <Text title3 semibold whiteColor>
                    Guide's Recommendation
                  </Text>
                  <Text footnote whiteColor numberOfLines={2}>
                    Andaz Tokyo Toranomon Hills is one of the newest luxury
                    hotels in Tokyo. Located in one of the uprising areas of
                    Tokyo
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
