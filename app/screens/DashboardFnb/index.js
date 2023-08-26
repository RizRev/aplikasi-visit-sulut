import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  TextInput,
  EventCard,
  EventItem,
  FnbCard,
  FnbItem
} from '@components';
import {EventListData} from '@data';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import { getFnb } from '../../data/fnb';

export default function DashboardFnb({navigation}) {
  const [fnbs, setFnbs] = useState([]);
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const [loading] = useState(false);
  const [recommend] = useState(EventListData);
  const [services] = useState([
    {
      id: '1',
      color: colors.primaryLight,
      icon: 'compass',
      name: 'all',
    },
    {
      id: '2',
      color: BaseColor.pinkColor,
      icon: 'star',
      name: 'shows',
    },
    {
      id: '3',
      color: colors.primary,
      icon: 'bullseye',
      name: 'discounts',
    },
  ]);
  const [relate] = useState([
    {
      id: '0',
      image: Images.event4,
      title: 'BBC Music Introducing',
      time: 'Thu, Oct 31, 9:00am',
      location: 'Tobacco Dock, London',
    },
    {
      id: '1',
      image: Images.event5,
      title: 'Bearded Theory Spring Gathering',
      time: 'Thu, Oct 31, 9:00am',
      location: 'Tobacco Dock, London',
    },
  ]);

  /**
   * onSearch change
   * @param {*} keyword
   */
  const onSearch = keyword => {};

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFnb();
      setFnbs(data);
    };

    fetchData();
  }, []); // run this effect once on component mount

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('search')}
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
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <ScrollView>
          <View style={{padding: 20}}>
            <TextInput
              onChangeText={text => setSearch(text)}
              placeholder={t('search')}
              value={search}
              onSubmitEditing={() => {
                onSearch(search);
              }}
              icon={
                <TouchableOpacity
                  onPress={() => {
                    setSearch('');
                  }}
                  style={styles.btnClearSearch}>
                  <Icon name="times" size={18} color={BaseColor.grayColor} />
                </TouchableOpacity>
              }
            />
          </View>
          {/* <FlatList
            data={services}
            horizontal={true}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.serviceItem}
                  onPress={() => {
                    navigation.navigate('Event');
                  }}>
                  <View
                    style={[
                      styles.serviceCircleIcon,
                      {backgroundColor: item.color},
                    ]}>
                    <Icon
                      name={item.icon}
                      size={20}
                      color={BaseColor.whiteColor}
                      solid
                    />
                  </View>
                  <Text
                    footnote
                    style={{
                      marginTop: 5,
                    }}>
                    {t(item.name)}
                  </Text>
                </TouchableOpacity>
              );
            }}
          /> */}
          <Text title3 semibold style={{padding: 20}}>
            Tenant {t('promos_today')}
          </Text>
          <View>
            <FlatList
              contentContainerStyle={{
                paddingRight: 20,
                paddingLeft: 5,
              }}
              horizontal={true}
              data={fnbs}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <FnbCard
                  image={item.imageSrc[0]?.url}
                  title={item.name}
                  openHour={`${item.open_hour} AM - ${item.close_hour} PM`}
                  rate={item.rateCount}
                  onPress={() => navigation.navigate('FnbDetail', { item })}
                  style={{ marginLeft: 15 }}
                />
              )}
            />
          </View>
          <Text title3 semibold style={{padding: 20}}>
            {/* {t('recommend_for_you')} */}
            Recommend Menu For You
          </Text>
          <FlatList
            contentContainerStyle={{
              paddingRight: 20,
              paddingLeft: 5,
              paddingBottom: 20,
            }}
            horizontal={true}
            data={fnbs}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: 'row' }}>
                {item.menu.map((menu, menuIndex) => (
                  <FnbItem
                    key={menuIndex} // Add the key prop here
                    grid
                    image={menu.imageSrc?.[menuIndex]?.url}
                    title={menu.name}
                    tracking={item.tracking}
                    rate={item.rate}
                    time={item.time}
                    liked={item.liked}
                    style={{
                      marginLeft: menuIndex === 0 ? 15 : 10,
                      marginRight: 10,
                      width: 200,
                    }}
                    onPress={() => navigation.navigate('FnbDetail', { item })}
                    onPressTag={() => navigation.navigate('Review', { item })}
                  />
                ))}
              </View>
            )}
            />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
