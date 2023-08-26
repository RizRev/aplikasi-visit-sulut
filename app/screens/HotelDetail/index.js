import React, {useEffect, useState} from 'react';
import {Animated, FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {Button, Header, HelpBlock, Icon, PostListItem, RoomType, SafeAreaView, StarRating, Text,} from '@components';
import * as Utils from '@utils';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './styles';
import {HelpBlockData} from '@data';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';

const HotelDetail = ({navigation}) => {
    const {colors} = useTheme();
    const {t} = useTranslation();
    const route = useRoute();
    const {item} = route.params;
    const price = item.price;
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(item.roomType[0].price).replace(",00", "");

    // console.log(formattedPrice); // Output: Rp. 1.000.000,00


    // useEffect(() => {
    //     console.log('Selected Hotel:', JSON.stringify(item));
    // }, []);


    const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
    const [renderMapView, setRenderMapView] = useState(false);
    const [region] = useState({
        latitude: item.lat,
        longitude: item.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    });

    const [todo] = useState([
        {
            id: '1',
            title: 'South Travon',
            image: Images.trip1,
        },
        {
            id: '2',
            title: 'South Travon',
            image: Images.trip2,
        },
        {
            id: '3',
            title: 'South Travon',
            image: Images.trip3,
        },
        {
            id: '4',
            title: 'South Travon',
            image: Images.trip4,
        },
        {
            id: '5',
            title: 'South Travon',
            image: Images.trip5,
        },
    ]);
    const [helpBlock] = useState(HelpBlockData);
    const deltaY = new Animated.Value(0);

    useEffect(() => {
        setRenderMapView(true);
    }, []);

    const heightImageBanner = Utils.scaleWithPixel(250, 1);
    const marginTopBanner = heightImageBanner - heightHeader - 40;

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        deltaY.setValue(offsetY);
    };
  return (
    <View style={{ flex: 1 }}>
        <ScrollView
            style={{ flex: 1 }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
        >
            <Animated.Image
                source={{uri: item.roomType[0]?.imageSrc[0]?.url}}
                style={[
                    styles.imgBanner,
                    {
                        height: deltaY.interpolate({
                            inputRange: [
                                0,
                                Utils.scaleWithPixel(200),
                                Utils.scaleWithPixel(200),
                            ],
                            outputRange: [heightImageBanner, heightHeader, heightHeader],
                        }),
                    },
                ]}
            />
            {/* Header */}
            <Header
                title=""
                renderLeft={() => {
                    return (
                        <Icon
                            name="arrow-left"
                            size={20}
                            color={BaseColor.whiteColor}
                            enableRTL={true}
                        />
                    );
                }}
                renderRight={() => {
                    return <Icon name="images" size={20} color={BaseColor.whiteColor} />;
                }}
                onPressLeft={() => {
                    navigation.goBack();
                }}
                onPressRight={() => {
                    navigation.navigate('PreviewImage', {item});
                }}
            />
            <SafeAreaView style={{ flex: 1 }} edges={['right', 'left', 'bottom']}>
                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    nestedScrollEnabled={true}
                    ListHeaderComponent={
                        <>
                            {/* Information */}
                            <View
                                style={[
                                    styles.contentBoxTop,
                                    {
                                        marginTop: marginTopBanner,
                                        backgroundColor: colors.card,
                                        shadowColor: colors.border,
                                        borderColor: colors.border,
                                    },
                                ]}
                            >
                                <Text title2 semibold style={{ marginBottom: 5 }}>
                                    {item.title}
                                </Text>
                                <StarRating
                                    disabled={true}
                                    starSize={14}
                                    maxStars={5}
                                    rating={4.5}
                                    selectedStar={(rating) => {}}
                                    fullStarColor={BaseColor.yellowColor}
                                />
                                <Text body2 style={{ marginTop: 5, textAlign: 'center' }}>
                                    {item.roomType[0]?.name}
                                </Text>
                            </View>

                            {/* Information content */}

                            {/* Rating Review */}
                            <View
                                style={[styles.blockView, { borderBottomColor: colors.border }]}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.circlePoint,
                                            { backgroundColor: colors.primary },
                                        ]}
                                    >
                                        <Text title3 whiteColor>
                                            {item.rateCount}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text title3 primaryColor style={{ marginBottom: 3 }}>
                                            {item.rateStatus}
                                        </Text>
                                        <Text body2>See {item.numReviews} reviews</Text>
                                    </View>
                                </View>
                                <View style={styles.contentRateDetail}>
                                    <View style={[styles.contentLineRate, { marginRight: 10 }]}>
                                        <View style={{ flex: 1 }}>
                                            <Text caption2 grayColor style={{ marginBottom: 5 }}>
                                                Interio Design
                                            </Text>
                                            <View style={styles.lineBaseRate} />
                                            <View
                                                style={[
                                                    styles.linePercent,
                                                    { backgroundColor: colors.accent },
                                                    { width: '40%' },
                                                ]}
                                            />
                                        </View>
                                        <Text caption2 style={{ marginLeft: 15 }}>
                                            4
                                        </Text>
                                    </View>
                                    <View style={styles.contentLineRate}>
                                        <View style={{ flex: 1 }}>
                                            <Text caption2 grayColor style={{ marginBottom: 5 }}>
                                                Server Quality
                                            </Text>
                                            <View style={styles.lineBaseRate} />
                                            <View
                                                style={[
                                                    styles.linePercent,
                                                    { backgroundColor: colors.accent },
                                                    { width: '70%' },
                                                ]}
                                            />
                                        </View>
                                        <Text caption2 style={{ marginLeft: 15 }}>
                                            7
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.contentRateDetail}>
                                    <View style={[styles.contentLineRate, { marginRight: 10 }]}>
                                        <View style={{ flex: 1 }}>
                                            <Text caption2 grayColor style={{ marginBottom: 5 }}>
                                                Interio Design
                                            </Text>
                                            <View style={styles.lineBaseRate} />
                                            <View
                                                style={[
                                                    styles.linePercent,
                                                    { backgroundColor: colors.accent },
                                                    { width: '50%' },
                                                ]}
                                            />
                                        </View>
                                        <Text caption2 style={{ marginLeft: 15 }}>
                                            5
                                        </Text>
                                    </View>
                                    <View style={styles.contentLineRate}>
                                        <View style={{ flex: 1 }}>
                                            <Text caption2 grayColor style={{ marginBottom: 5 }}>
                                                Server Quality
                                            </Text>
                                            <View style={styles.lineBaseRate} />
                                            <View
                                                style={[
                                                    styles.linePercent,
                                                    { backgroundColor: colors.accent },
                                                    { width: '60%' },
                                                ]}
                                            />
                                        </View>
                                        <Text caption2 style={{ marginLeft: 15 }}>
                                            6
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={[styles.blockView, { borderBottomColor: colors.border }]}
                            >
                                {/* Rating Review content */}
                            </View>
                            {/* Description */}
                            <View
                                style={[styles.blockView, { borderBottomColor: colors.border }]}
                            >
                                <Text headline semibold>
                                    {t('hotel_description')}
                                </Text>
                                <Text body2 style={{ marginTop: 5 }}>
                                    {item.description}
                                </Text>
                            </View>
                            <View
                                style={[styles.blockView, { borderBottomColor: colors.border }]}
                            >
                                {/* Description content */}
                            </View>
                            {/* Facilities Icon */}
                            <View
                                style={[
                                    styles.contentService,
                                    { borderBottomColor: colors.border },
                                ]}
                            >
                                {item.services.map((service, index) => (
                                    <View style={{ alignItems: 'center' }} key={'service' + index}>
                                        <Icon name={service.icon} size={24} color={colors.accent} />
                                        <Text overline grayColor style={{ marginTop: 4 }}>
                                            {service.name}
                                        </Text>
                                    </View>
                                ))}

                            </View>
                            <View
                                style={[styles.contentService, {borderBottomColor: colors.border}]}
                            >
                                {/* Facilities Icon content */}
                            </View>
                            {/* Map location */}
                            <View
                                style={[styles.blockView, {borderBottomColor: colors.border}]}
                            >
                                <Text headline style={{marginBottom: 5}} semibold>
                                    {t('location')}
                                </Text>
                                <Text body2 numberOfLines={2}>
                                    {item.address}
                                </Text>
                                <View style={{height: 180, width: '100%', marginTop: 10}}>
                                    {renderMapView && (
                                        <MapView
                                            provider={PROVIDER_GOOGLE}
                                            style={styles.map}
                                            region={region}
                                            onRegionChange={() => {
                                            }}
                                        >
                                            <Marker
                                                coordinate={{
                                                    latitude: item.lat,
                                                    longitude: item.lng,
                                                }}
                                            />
                                        </MapView>
                                    )}
                                </View>
                            </View>
                            <View
                                style={[styles.blockView, {borderBottomColor: colors.border}]}
                            >
                                {/* Map location content */}
                            </View>
                            {/* Open Time */}
                            <View
                                style={[styles.blockView, {borderBottomColor: colors.border}]}
                            >
                                <Text headline semibold>
                                    {t('good_to_know')}
                                </Text>
                                <View style={{flexDirection: 'row', marginTop: 5}}>
                                    <View style={{flex: 1, justifyContent: 'center'}}>
                                        <Text body2 grayColor>{t('check_in_from')}</Text>
                                        <Text body2 accentColor semibold>
                                            14:00 PM
                                        </Text>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center'}}>
                                        <Text body2 grayColor>{t('check_out_from')}</Text>
                                        <Text body2 accentColor semibold>
                                            12:00 AM
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={[styles.blockView, {borderBottomColor: colors.border}]}
                            >
                                {/* Open Time content */}
                            </View>
                            {/* Rooms */}
                            <View
                                style={[styles.blockView, {borderBottomColor: colors.border}]}
                            >
                                <Text headline semibold>
                                    {t('room_type')}
                                </Text>
                                <FlatList
                                    data={item.roomType}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({item}) => (
                                        <RoomType
                                            image={item.imageSrc[0]?.url}
                                            name={item.name}
                                            price={formattedPrice}
                                            available={`available ${item.available} rooms`}
                                            services={JSON.parse(item.services)}
                                            style={{marginTop: 10}}
                                            onPress={() => {
                                                navigation.navigate('HotelInformation');
                                            }}
                                        />
                                    )}
                                />


                            </View>
                            <View
                                style={[styles.blockView, {borderBottomColor: colors.border}]}
                            >
                                {/* Rooms content */}
                            </View>
                            {/* Todo Things */}
                            {/* <View
                                style={[styles.blockView, {borderBottomColor: colors.border}]}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginBottom: 10,
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <Text headline semibold>
                                        {t('todo_things')}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('Post', {item});
                                        }}
                                    >
                                        <Text caption1 grayColor>
                                            {t('show_more')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={todo}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({item}) => (
                                        <PostListItem
                                            style={{marginRight: 15}}
                                            title="South Travon"
                                            date="6 Deals Left"
                                            description="Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo"
                                            image={item.image}
                                            onPress={() => {
                                                navigation.navigate('PostDetail');
                                            }}
                                        />
                                    )}
                                />
                            </View> */}
                            <View
                                style={[styles.blockView, {borderBottomColor: colors.border}]}
                            >
                                {/* Todo Things content */}
                            </View>
                            {/* Help Block Information */}
                            <View
                                style={[styles.blockView, {borderBottomColor: colors.border}]}
                            >
                                <HelpBlock
                                    title={helpBlock.title}
                                    description={helpBlock.description}
                                    phone={item.phone}
                                    email={helpBlock.email}
                                    style={{margin: 20}}
                                    onPress={() => {
                                        navigation.navigate('ContactUs', {item});
                                    }}
                                />
                            </View>
                            <View
                                style={[styles.blockView, {borderBottomColor: colors.border}]}
                            >
                                {/* Help Block Information content */}
                            </View>
                            {/* Other Information */}
                            {/* <View style={{paddingVertical: 10}}>
                                <Text headline semibold>4 Reason To Choose Us</Text>
                                <View style={styles.itemReason}>
                                    <Icon
                                        name="map-marker-alt"
                                        size={18}
                                        color={colors.accent}
                                    />
                                    <View style={{marginLeft: 10}}>
                                        <Text subhead semibold>Good Location</Text>
                                        <Text body2>
                                            Andaz Tokyo Toranomon Hills is one of the newest luxury
                                            hotels in Tokyo. Located in one of the uprising areas of
                                            Tokyo
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.itemReason}>
                                    <Icon name="pagelines" size={18} color={colors.accent}/>
                                    <View style={{marginLeft: 10}}>
                                        <Text subhead semibold>Great Food</Text>
                                        <Text body2>
                                            Excellent cuisine, typical dishes from the best Romagna
                                            tradition and more!
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.itemReason}>
                                    <Icon name="servicestack" size={18} color={colors.accent}/>
                                    <View style={{marginLeft: 10}}>
                                        <Text subhead semibold>Private Beach</Text>
                                        <Text body2>
                                            Excellent cuisine, typical dishes from the best Romagna
                                            tradition and more!
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.itemReason}>
                                    <Icon name="trophy" size={18} color={colors.accent}/>
                                    <View style={{marginLeft: 10}}>
                                        <Text subhead semibold>5 Stars Hospitality</Text>
                                        <Text body2>Romagna hospitality, typical and much</Text>
                                    </View>
                                </View>
                            </View> */}
                            <View style={{paddingVertical: 10}}>
                                {/* Other Information content */}
                            </View>
                        </>
                    }
                    data={[]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <View/>}
                />
                {/* Pricing & Booking Process */}
                <View
                    style={[
                        styles.contentButtonBottom,
                        {borderTopColor: colors.border},
                    ]}
                >
                    <View>
                        <Text caption1 semibold>{t('price')}</Text>
                        <Text title3 primaryColor semibold>
                            {formattedPrice}
                        </Text>
                        <Text caption1 semibold style={{marginTop: 5}}>
                            {t('avg_night')}
                        </Text>
                    </View>
                    {/* <Button onPress={() => navigation.navigate('PreviewBooking', {item})}>
                        {t('book_now')}
                    </Button> */}
                </View>
                <View
                    style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}
                >
                    {/* Pricing & Booking Process content */}
                </View>
            </SafeAreaView>
        </ScrollView>

    </View>
    );
};

export default HotelDetail;
