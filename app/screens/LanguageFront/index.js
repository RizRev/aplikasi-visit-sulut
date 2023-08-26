import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {View, TouchableOpacity, Switch, ScrollView, Button} from 'react-native';
import {BaseStyle, BaseSetting, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import {useTranslation} from 'react-i18next';
import * as Utils from '@utils';
import styles from './styles';

export default function LanguageFront({navigation}) {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const category = useSelector(state => state.application.category);

  return (
    <View style={{flex: 1}}>
      <Header
         title={t('setting')}
        
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <ScrollView contentContainerStyle={styles.contain}>
          <TouchableOpacity
            style={[
              styles.profileItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => {
              navigation.navigate('ChangeLanguageFront');
            }}>
            <Text body1>{t('language')}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text body1 grayColor>
                {Utils.languageFromCode(i18n.language)}
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
          <TouchableOpacity
            style={[
              styles.profileItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => {
              navigation.navigate('CategorySelector');
            }}>
            <Text body1>{t('travel')}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text body1 grayColor>
              {category || "Default"}
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
        </ScrollView>
        <Button
          title={t('apply')}
          onPress={() => navigation.navigate('Main')}
          // onPress={() => console.log('Button pressed')}
        />
      </SafeAreaView>
    </View>
  );
}
