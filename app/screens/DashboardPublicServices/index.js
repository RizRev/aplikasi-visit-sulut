import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { BaseStyle, BaseColor, Images, useTheme } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  TextInput,
  EventCard,
  EventItem,
  FnbCard,
  PublicServicesCard,
} from '@components';
import { EventListData } from '@data';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { getFnb } from '../../data/fnb';
import { getPublicServices } from '../../data/publicservices';
import { getPoliceStation } from '../../data/policestation';
import { getHospital } from '../../data/hospital';
import { getPark } from '../../data/park';
import { getShoppingCenter } from '../../data/shoppingcenter';
import { getPublicTransport } from '../../data/publictransport';


export default function DashboardPublicServices({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [fnbs, setFnbs] = useState([]);
  const [publicservices, setPublicServices] = useState([]);
  const [policestations, setPoliceStation] = useState([]);
  const [hospitals, setHospital] = useState([]);
  const [parks, setPark] = useState([]);
  const [shoppingcenters, setShoppingCenter] = useState([]);
  const [publictransports, setPublicTransport] = useState([]);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [recommend] = useState(EventListData);
  const [services] = useState([
    // ...
  ]);
  const [relate] = useState([
    // ...
  ]);

  /**
   * onSearch change
   * @param {*} keyword
   */
  const onSearch = (keyword) => {};

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPublicServices();
      const policestation = await getPoliceStation();
      const hospital = await getHospital();
      const park = await getPark();
      const shoppingcenter = await getShoppingCenter();
      const publictransport = await getPublicTransport();
      setPublicServices(data);
      setPoliceStation(policestation);
      setHospital(hospital);
      setPark(park);
      setShoppingCenter(shoppingcenter);
      setPublicTransport(publictransport);
    };

    fetchData();
  }, []);

  // console.log("Data Polisi : ",policestations);

  const renderIconService = () => {
    return (
      <FlatList
        data={services}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemService}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate(item.route);
              }}
            >
              <View
                style={[
                  styles.iconContent,
                  { backgroundColor: colors.card },
                ]}
              >
                <Icon
                  name={item.icon}
                  size={18}
                  color={colors.primary}
                  solid
                />
              </View>
              <Text footnote grayColor numberOfLines={1}>
                {t(item.name)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
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
            return (
              <ActivityIndicator
                size="small"
                color={colors.primary}
              />
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}
      >
        <ScrollView>
          <View>
            <View style={{ padding: 20 }}>
              <TextInput
                onChangeText={(text) => setSearch(text)}
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
                    style={styles.btnClearSearch}
                  >
                    <Icon
                      name="times"
                      size={18}
                      color={BaseColor.grayColor}
                    />
                  </TouchableOpacity>
                }
              />
            </View>
            {renderIconService()}
            <Text title3 semibold style={{ padding: 20 }}>
              Police Station
            </Text>
            <View>
              <FlatList
                contentContainerStyle={{
                  paddingRight: 20,
                  paddingLeft: 5,
                }}
                horizontal={true}
                data={policestations.filter(
                  (item) => item.category === 'Police Station'
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <PublicServicesCard
                    key={index}
                    image={item.imageSrc[0]?.url}
                    name={item.name}
                    openHour={`${item.open_hour} AM - ${item.close_hour} PM`}
                    onPress={() =>
                      navigation.navigate('PublicServicesDetail', { item })
                    }
                    style={{ marginLeft: 15 }}
                  />
                )}
              />
            </View>
            <Text title3 semibold style={{ padding: 20 }}>
              Hospital
            </Text>
            <View>
              <FlatList
                contentContainerStyle={{
                  paddingRight: 20,
                  paddingLeft: 5,
                }}
                horizontal={true}
                data={hospitals.filter(
                  (item) => item.category === 'Hospital'
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <PublicServicesCard
                    key={index}
                    image={item.imageSrc[0]?.url}
                    name={item.name}
                    openHour={`${item.open_hour} AM - ${item.close_hour} PM`}
                    onPress={() =>
                      navigation.navigate('PublicServicesDetail', {
                        item,
                      })
                    }
                    style={{ marginLeft: 15 }}
                  />
                )}
              />
            </View>
            <Text title3 semibold style={{ padding: 20 }}>
              Park
            </Text>
            <View>
              <FlatList
                contentContainerStyle={{
                  paddingRight: 20,
                  paddingLeft: 5,
                }}
                horizontal={true}
                data={parks.filter(
                  (item) => item.category === 'Park'
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <PublicServicesCard
                    key={index}
                    image={item.imageSrc[0]?.url}
                    name={item.name}
                    openHour={`${item.open_hour} AM - ${item.close_hour} PM`}
                    onPress={() =>
                      navigation.navigate('PublicServicesDetail', {
                        item,
                      })
                    }
                    style={{ marginLeft: 15 }}
                  />
                )}
              />
            </View>
            <Text title3 semibold style={{ padding: 20 }}>
              Shopping Center
            </Text>
            <View>
              <FlatList
                contentContainerStyle={{
                  paddingRight: 20,
                  paddingLeft: 5,
                }}
                horizontal={true}
                data={shoppingcenters.filter(
                  (item) => item.category === 'Shopping Center'
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <PublicServicesCard
                    key={index}
                    image={item.imageSrc[0]?.url}
                    name={item.name}
                    openHour={`${item.open_hour} AM - ${item.close_hour} PM`}
                    onPress={() =>
                      navigation.navigate('PublicServicesDetail', {
                        item,
                      })
                    }
                    style={{ marginLeft: 15 }}
                  />
                )}
              />
            </View>
            <Text title3 semibold style={{ padding: 20 }}>
              Public Transport
            </Text>
            <View>
              <FlatList
                contentContainerStyle={{
                  paddingRight: 20,
                  paddingLeft: 5,
                }}
                horizontal={true}
                data={publictransports.filter(
                  (item) => item.category === 'Public Transport'
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <PublicServicesCard
                    key={index}
                    image={item.imageSrc[0]?.url}
                    name={item.name}
                    openHour={`${item.open_hour} AM - ${item.close_hour} PM`}
                    onPress={() =>
                      navigation.navigate('PublicServicesDetail', {
                        item,
                      })
                    }
                    style={{ marginLeft: 15 }}
                  />
                )}
              />
            </View>
            <Text title3 semibold style={{ padding: 20 }}>
              Food Court
            </Text>
            <View>
              <FlatList
                contentContainerStyle={{
                  paddingRight: 20,
                  paddingLeft: 5,
                }}
                horizontal={true}
                data={publicservices.filter(
                  (item) => item.category === 'Food Court'
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <PublicServicesCard
                    key={index}
                    image={item.imageSrc[0]?.url}
                    name={item.name}
                    openHour={`${item.open_hour} AM - ${item.close_hour} PM`}
                    onPress={() =>
                      navigation.navigate('PublicServicesDetail', {
                        item,
                      })
                    }
                    style={{ marginLeft: 15 }}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
  
}
