import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Animated, FlatList, TouchableOpacity, View} from 'react-native';
import {FnbCard, HotelItem, Icon, Image, PublicServicesCard, SafeAreaView, Text} from '@components';
import {BaseStyle, Images, useTheme} from '@config';
import * as Utils from '@utils';
import styles from './styles';
import {PromotionData, TourData} from '@data';
import {useTranslation} from 'react-i18next';
import {getHotels} from '../../data/hotel';
import {getFnb} from '../../data/fnb';
import {getPublicServices} from '../../data/publicservices';
import * as Location from 'expo-location';
import {useSelector} from 'react-redux';

export default function Home({navigation}) {
    const userId = useSelector(state => state.auth.login.user);
    const clientId = useSelector(state => state.auth.login.client);
    const mode = useSelector(state => state.application.mode);
    const route = userId && mode === 'Alone' ? 'TourAlone' : 'TinderTour';
    const [publicservices, setPublicServices] = useState([]);
    const [fnbs, setFnbs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    const {t} = useTranslation();
    const {colors} = useTheme();
    const [icons] = useState([{
        icon: 'hotel', name: 'hotels', route: 'Hotel',
    }, {
        icon: 'suitcase', name: 'tours', route: route,
    }, {
        icon: 'hamburger', name: 'Gift Shop', // route: 'OverViewCar',
        route: 'DashboardFnb',
    }, {
        icon: 'map-marked-alt', name: 'Public Services', // route: 'FlightSearch',
        route: 'DashboardPublicServices',
    }, // {
        //   icon: 'ship',
        //   name: 'cruise',
        //   route: 'CruiseSearch',
        // },
        // {
        //   icon: 'bus',
        //   name: 'bus',
        //   route: 'BusSearch',
        // },
        // {
        //   icon: 'star',
        //   name: 'event',
        //   route: 'DashboardEvent',
        // },
        {
            icon: 'ellipsis-h', name: 'more', route: 'More',
        },]);
    const [relate] = useState([{
        id: '0',
        image: Images.event4,
        title: 'BBC Music Introducing',
        time: 'Thu, Oct 31, 9:00am',
        location: 'Tobacco Dock, London',
    }, {
        id: '1',
        image: Images.event5,
        title: 'Bearded Theory Spring Gathering',
        time: 'Thu, Oct 31, 9:00am',
        location: 'Tobacco Dock, London',
    },]);
    const [promotion] = useState(PromotionData);
    const [tours] = useState(TourData);
    const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
    const deltaY = new Animated.Value(0);
    const [location, setLocation] = React.useState(null);
    const [locationPermissionStatus, setLocationPermissionStatus] = useState(null); // Add this state variable

    const checkLocationPermission = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        setLocationPermissionStatus(status);
    };

    const fetchLocation = async () => {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
    };

    const fetchDataHotel = async () => {
        const data = await getHotels();
        setHotels(data);
        // console.log("DATA HOTEL NEW : ",JSON.stringify(data));
        // console.log("Cek Price : ",data.roomType[0].price);
    };

    const fetchDataFnb = useCallback(async () => {
        try {
            const data = await getFnb();
            setFnbs(data);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    }, []);

    const fetchDataPublicServices = useCallback(async () => {
        try {
            const data = await getPublicServices();
            setPublicServices(data);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {


        checkLocationPermission();
        fetchDataHotel();
        fetchDataFnb();
        fetchDataPublicServices();
    }, []);

    useEffect(() => {
        if (locationPermissionStatus !== 'granted') {
            // Handle permission denied
            return;
        }

        fetchLocation();
    }, [locationPermissionStatus]);

    const renderFnbItem = ({item}) => (<FnbCard
        image={item.imageSrc[0]?.url}
        title={item.name}
        openHour={`${item.open_hour} AM - ${item.close_hour} PM`}
        rate={item.rateCount}
        onPress={() => navigation.navigate('FnbDetail', {item})}
        style={{marginLeft: 15}}
    />);

    const renderPublicServicesItem = ({item}) => (<PublicServicesCard
        image={item.imageSrc?.[0]?.url}
        name={item.name}
        openHour={`${item.open_hour} AM - ${item.close_hour} PM`}
        onPress={() => navigation.navigate('PublicServicesDetail', {item})}
        style={{marginLeft: 15}}
    />);

    const formatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR'
        }).format(price);
        return formattedPrice.replace(",00", "");
    };


    /**
     * @description Show icon services on form searching
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @returns
     */
    const renderIconService = () => {
        return (<FlatList
            data={icons}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
                return (<TouchableOpacity
                    style={styles.itemService}
                    activeOpacity={0.9}
                    onPress={() => {
                        navigation.navigate(item.route);
                    }}>
                    <View
                        style={[styles.iconContent, {backgroundColor: colors.card}]}>
                        <Icon name={item.icon} size={18} color={colors.primary} solid/>
                    </View>
                    <Text footnote grayColor numberOfLines={1}>
                        {t(item.name)}
                    </Text>
                </TouchableOpacity>);
            }}
        />);
    };

    const heightImageBanner = Utils.scaleWithPixel(140);
    const marginTopBanner = heightImageBanner - heightHeader;

    return (<View style={{flex: 1}}>
        <Animated.Image
            source={Images.trip12}
            style={[styles.imageBackground, {
                height: deltaY.interpolate({
                    inputRange: [0, Utils.scaleWithPixel(100), Utils.scaleWithPixel(100),],
                    outputRange: [heightImageBanner, heightHeader, 0],
                }),
            },]}
        />
        <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
            <FlatList
                onScroll={Animated.event([{
                        nativeEvent: {
                            contentOffset: {y: deltaY},
                        },
                    },], {useNativeDriver: false} // Add an empty object as the second argument
                )}
                onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
                scrollEventThrottle={8}
                ListHeaderComponent={<View style={{paddingHorizontal: 20, paddingVertical: 80}}>
                    <View
                        style={[styles.searchForm, {
                            marginTop: marginTopBanner,
                            backgroundColor: colors.background,
                            borderColor: colors.border,
                            shadowColor: colors.border,
                        },]}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Search')}
                            activeOpacity={0.9}>
                            <View
                                style={[BaseStyle.textInput, {backgroundColor: colors.card},]}>
                                <Text body1 grayColor>
                                    {t('what_are_you_looking_for')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {renderIconService()}
                    </View>
                </View>}
                ListFooterComponent={<View>
                    <View style={{marginTop: -60}}>
                        <Text title3 semibold style={styles.titleView}>
                            {t('promos_today')}
                        </Text>
                        <View>
                            {loading ? (<ActivityIndicator size="large"/>) : (<FlatList
                                contentContainerStyle={{
                                    paddingRight: 20, paddingLeft: 5,
                                }}
                                horizontal
                                data={fnbs}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderFnbItem}
                            />)}
                        </View>
                        {/* <FlatList
                  contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={promotion}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({item, index}) => (
                    <Card
                      style={[styles.promotionItem, {marginLeft: 15}]}
                      image={item.image}
                      onPress={() => navigation.navigate('HotelDetail')}>
                      <Text subhead whiteColor>
                        {item.title1}
                      </Text>
                      <Text title2 whiteColor semibold>
                        {item.title2}
                      </Text>
                      <View style={styles.contentCartPromotion}>
                        <Button
                          style={styles.btnPromotion}
                          onPress={() => {
                            navigation.navigate('PreviewBooking');
                          }}>
                          <Text body2 semibold whiteColor>
                            {t('book_now')}
                          </Text>
                        </Button>
                      </View>
                    </Card>
                  )}
                /> */}
                    </View>
                    {/* Tour */}
                    {/* <View style={styles.titleView}>
                <Text title3 semibold>
                  {t('tours')}
                </Text>
                <Text body2 grayColor>
                  {t('let_find_tour')}
                </Text>
              </View>
              <FlatList
                contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={tours}
                keyExtractor={(item, index) => item.id}
                renderItem={({item, index}) => (
                  <Card
                    style={[styles.tourItem, {marginLeft: 15}]}
                    image={item.image}
                    onPress={() => navigation.navigate('TourDetail')}>
                    <Text headline whiteColor semibold>
                      {item.name}
                    </Text>
                  </Card>
                )}
              /> */}
                    {/* Public Services*/}
                    <View style={styles.titleView}>
                        <Text title3 semibold>
                            {t('public_services')}
                        </Text>
                        <Text body2 grayColor>
                            {t('public_services_desc')}
                        </Text>
                    </View>
                    <View>
                        {loading ? (<ActivityIndicator size="large"/>) : (<FlatList
                            contentContainerStyle={{
                                paddingRight: 20, paddingLeft: 5,
                            }}
                            horizontal
                            data={publicservices}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderPublicServicesItem}
                        />)}
                    </View>

                    {/* Event*/}
                    {/* <View style={styles.titleView}>
                <Text title3 semibold>
                  {t('comming_event')}
                </Text>
                <Text body2 grayColor>
                  {t('let_find_event')}
                </Text>
              </View>
              
            
              <View>
                <FlatList
                  contentContainerStyle={{
                    paddingRight: 20,
                    paddingLeft: 5,
                  }}
                  horizontal={true}
                  data={relate}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({item, index}) => (
                    <EventCard
                      image={item.image}
                      title={item.title}
                      time={item.time}
                      location={item.location}
                      onPress={() => navigation.navigate('EventDetail')}
                      style={{marginLeft: 15}}
                    />
                  )}
                />
              </View> */}
                    {/* Promotion */}
                    <View style={styles.titleView}>
                        <Text title3 semibold>
                            {t('promotion')}
                        </Text>
                        <Text body2 grayColor>
                            {t('let_find_promotion')}
                        </Text>
                        <Image source={Images.banner1} style={styles.promotionBanner}/>
                        <View style={[styles.line, {backgroundColor: colors.border}]}/>
                    </View>
                    <FlatList
                        columnWrapperStyle={{paddingLeft: 5, paddingRight: 20}}
                        numColumns={2}
                        data={hotels}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({item, index}) => (<HotelItem
                            grid
                            image={item.imageSrc[0]?.url}
                            name={item.title}
                            location={item.address}
                            price={formatPrice(item.roomType[0].price)}
                            available={item.available}
                            rate={item.rateCount}
                            rateStatus={item.rateStatus}
                            numReviews={item.numReviews}
                            services={item.services}
                            style={{marginLeft: 15, marginBottom: 15}}
                            onPress={() => navigation.navigate('HotelDetail', {item})}
                        />)}
                    />
                </View>}
            />
        </SafeAreaView>
    </View>);
}