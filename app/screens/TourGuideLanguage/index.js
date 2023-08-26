import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseStyle, useTheme, BaseSetting, HelperSetting } from '@config';
import { Header, SafeAreaView, TextInput, Icon, Text } from '@components';
import styles from './styles';
import * as Utils from '@utils';
import {ApplicationActions} from '@actions';
import {useDispatch} from 'react-redux';

export default function TourGuideLanguage({ navigation }) {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();

  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState(BaseSetting.languageSupport);
  const [languageSelected, setLanguageSelected] = useState([i18n.language]);
  const [lang, setLang] = useState('');
  const dispatch = useDispatch();


  /**
   * @description Called when setting language is selected
   * @param {string} select
   */

  const onChange = (select) => {
    let updatedLanguages = [...languageSelected];

    if (updatedLanguages.includes(select)) {
      updatedLanguages = updatedLanguages.filter((lang) => lang !== select);
    } else {
      updatedLanguages.push(select);
    }

    setLanguageSelected(updatedLanguages);
  };

  const filterLanguage = (text) => {
    setCountry(text);
    if (text) {
      setLanguage(
        language.filter((item) => Utils.languageFromCode(item).includes(text))
      );
    } else {
      setLanguage(BaseSetting.languageSupport);
    }
  };

  /**
   * Called when apply change language
   */
  const saveLanguage = () => {
    if (!loading) {
      setLoading(true);
      const selectedLanguages = languageSelected.map(lang => Utils.languageFromCode(lang));
      setLang(selectedLanguages.join(', '));
      setTimeout(() => {
        selectedLanguages.forEach(lang => {
          Utils.reloadLocale(lang);
        });
        console.log("Test : ",selectedLanguages);
        dispatch(ApplicationActions.onChangeTourGuideLanguage(selectedLanguages));
        navigation.goBack();
      }, 500);
    }
  };
  
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Select Language"
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
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          } else {
            return (
              <Text headline primaryColor numberOfLines={1}>
                {t('save')}
              </Text>
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={saveLanguage}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}
      >
        <View style={styles.contain}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
            <TextInput
              onChangeText={filterLanguage}
              placeholder={t('search_language')}
              value={country}
            />
          </View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={language}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const selected = languageSelected.includes(item);
              return (
                <TouchableOpacity
                  style={[
                    styles.item,
                    { borderBottomColor: colors.border },
                  ]}
                  onPress={() => onChange(item)}
                >
                  <Text
                    body1
                    style={selected ? { color: colors.primary } : {}}
                  >
                    {Utils.languageFromCode(item)}
                  </Text>
                  {selected && (
                    <Icon name="check" size={14} color={colors.primary} />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
