import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {BaseColor, useTheme, useFont} from '@config';
import {useTranslation} from 'react-i18next';
import {Icon} from '@components';
/* Stack Screen */
import Profile1 from '@screens/Profile1';
import Profile2 from '@screens/Profile2';
import Profile3 from '@screens/Profile3';
import Profile4 from '@screens/Profile4';
import Profile5 from '@screens/Profile5';
import Profile6 from '@screens/Profile6';
import Profile7 from '@screens/Profile7';
import Profile8 from '@screens/Profile8';
import More from '@screens/More';
import Tour from '@screens/Tour';
import TinderTour from '@screens/TinderTour';
import Car from '@screens/Car';
import OverViewCar from '@screens/OverViewCar';
import Hotel from '@screens/Hotel';
import Review from '@screens/Review';
import Feedback from '@screens/Feedback';
import Messages from '@screens/Messages';
import Notification from '@screens/Notification';
import Walkthrough from '@screens/Walkthrough';
import SignUp from '@screens/SignUp';
import SignIn from '@screens/SignIn';
import ResetPassword from '@screens/ResetPassword';
import ChangePassword from '@screens/ChangePassword';
import ProfileEdit from '@screens/ProfileEdit';
import ProfileExample from '@screens/ProfileExample';
import TourGuideLanguage from '@screens/TourGuideLanguage';
import ChangeLanguage from '@screens/ChangeLanguage';
import ChangeLanguageFront from '@screens/ChangeLanguageFront';
import HotelInformation from '@screens/HotelInformation';
import CheckOut from '@screens/CheckOut';
import Currency from '@screens/Currency';
import Coupons from '@screens/Coupons';
import HotelDetail from '@screens/HotelDetail';
import ContactUs from '@screens/ContactUs';
import PreviewBooking from '@screens/PreviewBooking';
import PricingTable from '@screens/PricingTable';
import PricingTableIcon from '@screens/PricingTableIcon';
import BookingDetail from '@screens/BookingDetail';
import PostDetail from '@screens/PostDetail';
import TourDetail from '@screens/TourDetail';
import CarDetail from '@screens/CarDetail';
import AboutUs from '@screens/AboutUs';
import OurService from '@screens/OurService';
import Options from '@screens/Options';
import FlightSearch from '@screens/FlightSearch';
import SelectFlight from '@screens/SelectFlight';
import FlightResult from '@screens/FlightResult';
import FlightSummary from '@screens/FlightSummary';
import FlightTicket from '@screens/FlightTicket';
import CruiseSearch from '@screens/CruiseSearch';
import Cruise from '@screens/Cruise';
import CruiseDetail from '@screens/CruiseDetail';
import BusSearch from '@screens/BusSearch';
import BusList from '@screens/BusList';
import BusSelectSeat from '@screens/BusSelectSeat';
import PreviewBusBooking from '@screens/PreviewBusBooking';
import BusTicket from '@screens/BusTicket';
import Event from '@screens/Event';
import EventDetail from '@screens/EventDetail';
import FnbDetail from '@screens/FnbDetail';
import PublicServicesDetail from '@screens/PublicServicesDetail';
import EventPreviewBooking from '@screens/EventPreviewBooking';
import DashboardEvent from '@screens/DashboardEvent';
import DashboardFnb from '@screens/DashboardFnb';
import DashboardPublicServices from '@screens/DashboardPublicServices';
import EventTicket from '@screens/EventTicket';
import PaymentMethod from '@screens/PaymentMethod';
import MyPaymentMethod from '@screens/MyPaymentMethod';
import AddPayment from '@screens/AddPayment';
import PaymentMethodDetail from '@screens/PaymentMethodDetail';
import PreviewPayment from '@screens/PreviewPayment';
import Setting from '@screens/Setting';
import ThemeSetting from '@screens/ThemeSetting';
import NotFound from '@screens/NotFound';
/* Bottom Screen */
import Home from '@screens/Home';
import Booking from '@screens/Booking';
import Messenger from '@screens/Messenger';
import MessengerTraveller from '@screens/MessengerTraveller';
import Post from '@screens/Post';
import Profile from '@screens/Profile';
import LanguageFront from '@screens/LanguageFront';
import LandingPage from '@screens/LandingPage';
import TravelSelection from '@screens/TravelSelection';

const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Main() {

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="BottomTabNavigator">
     
        <MainStack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />

      {/* Other screens... */}
      <MainStack.Screen name="Profile1" component={Profile1} />
      <MainStack.Screen name="Profile2" component={Profile2} />
      <MainStack.Screen name="Profile3" component={Profile3} />
      <MainStack.Screen name="Profile4" component={Profile4} />
      <MainStack.Screen name="Profile5" component={Profile5} />
      <MainStack.Screen name="Profile6" component={Profile6} />
      <MainStack.Screen name="Profile7" component={Profile7} />
      <MainStack.Screen name="Profile8" component={Profile8} />
      <MainStack.Screen name="More" component={More} />
      <MainStack.Screen name="Tour" component={Tour} />
      <MainStack.Screen name="TinderTour" component={TinderTour} />
      <MainStack.Screen name="Car" component={Car} />
      <MainStack.Screen name="OverViewCar" component={OverViewCar} />
      <MainStack.Screen name="Hotel" component={Hotel} />
      <MainStack.Screen name="Review" component={Review} />
      <MainStack.Screen name="Feedback" component={Feedback} />
      <MainStack.Screen name="Messages" component={Messages} />
      <MainStack.Screen name="Notification" component={Notification} />
      <MainStack.Screen name="Walkthrough" component={Walkthrough} />
      <MainStack.Screen name="SignUp" component={SignUp} />
      <MainStack.Screen name="SignIn" component={SignIn} />
      <MainStack.Screen name="ResetPassword" component={ResetPassword} />
      <MainStack.Screen name="ChangePassword" component={ChangePassword} />
      <MainStack.Screen name="ProfileEdit" component={ProfileEdit} />
      <MainStack.Screen name="ProfileExample" component={ProfileExample} />
      <MainStack.Screen name="TourGuideLanguage" component={TourGuideLanguage} />
      <MainStack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <MainStack.Screen name="ChangeLanguageFront" component={ChangeLanguageFront} />
      <MainStack.Screen name="LandingPage" component={LandingPage} />
      <MainStack.Screen name="TravelSelection" component={TravelSelection} />
      <MainStack.Screen name="HotelInformation" component={HotelInformation} />
      <MainStack.Screen name="CheckOut" component={CheckOut} />
      <MainStack.Screen name="Currency" component={Currency} />
      <MainStack.Screen name="Coupons" component={Coupons} />
      <MainStack.Screen name="HotelDetail" component={HotelDetail} />
      <MainStack.Screen name="ContactUs" component={ContactUs} />
      <MainStack.Screen name="PreviewBooking" component={PreviewBooking} />
      <MainStack.Screen name="PricingTable" component={PricingTable} />
      <MainStack.Screen name="PricingTableIcon" component={PricingTableIcon} />
      <MainStack.Screen name="BookingDetail" component={BookingDetail} />
      <MainStack.Screen name="PostDetail" component={PostDetail} />
      <MainStack.Screen name="TourDetail" component={TourDetail} />
      <MainStack.Screen name="CarDetail" component={CarDetail} />
      <MainStack.Screen name="AboutUs" component={AboutUs} />
      <MainStack.Screen name="OurService" component={OurService} />
      <MainStack.Screen name="Options" component={Options} />
      <MainStack.Screen name="FlightSearch" component={FlightSearch} />
      <MainStack.Screen name="SelectFlight" component={SelectFlight} />
      <MainStack.Screen name="FlightResult" component={FlightResult} />
      <MainStack.Screen name="FlightSummary" component={FlightSummary} />
      <MainStack.Screen name="FlightTicket" component={FlightTicket} />
      <MainStack.Screen name="CruiseSearch" component={CruiseSearch} />
      <MainStack.Screen name="Cruise" component={Cruise} />
      <MainStack.Screen name="CruiseDetail" component={CruiseDetail} />
      <MainStack.Screen name="BusSearch" component={BusSearch} />
      <MainStack.Screen name="BusList" component={BusList} />
      <MainStack.Screen name="BusSelectSeat" component={BusSelectSeat} />
      <MainStack.Screen
        name="PreviewBusBooking"
        component={PreviewBusBooking}
      />
      <MainStack.Screen name="BusTicket" component={BusTicket} />
      <MainStack.Screen name="Event" component={Event} />
      <MainStack.Screen name="EventDetail" component={EventDetail} />
      <MainStack.Screen name="FnbDetail" component={FnbDetail} />
      <MainStack.Screen name="PublicServicesDetail" component={PublicServicesDetail} />
      <MainStack.Screen
        name="EventPreviewBooking"
        component={EventPreviewBooking}
      />
      <MainStack.Screen name="DashboardEvent" component={DashboardEvent} />
      <MainStack.Screen name="DashboardFnb" component={DashboardFnb} />
      <MainStack.Screen name="DashboardPublicServices" component={DashboardPublicServices} />
      <MainStack.Screen name="EventTicket" component={EventTicket} />
      <MainStack.Screen name="PaymentMethod" component={PaymentMethod} />
      <MainStack.Screen name="MyPaymentMethod" component={MyPaymentMethod} />
      <MainStack.Screen name="AddPayment" component={AddPayment} />
      <MainStack.Screen
        name="PaymentMethodDetail"
        component={PaymentMethodDetail}
      />
      <MainStack.Screen name="PreviewPayment" component={PreviewPayment} />
      <MainStack.Screen name="Setting" component={Setting} />
      <MainStack.Screen name="ThemeSetting" component={ThemeSetting} />
      <MainStack.Screen name="NotFound" component={NotFound} />
    </MainStack.Navigator>
  );
}

function BottomTabNavigator() {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const font = useFont();
  const login = useSelector(state => state.auth.login);
  const user = useSelector(state => state.auth.login.user);
  const client = useSelector(state => state.auth.login.client);

  // console.log("APA : ",login);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveTintColor: BaseColor.grayColor,
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: font,
          paddingBottom: 2,
        },
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: t('home'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="home" size={20} solid />;
          },
        }}
      />
      {/* <BottomTab.Screen
        name="Booking"
        component={Booking}
        options={{
          title: t('booking'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="bookmark" size={20} solid />;
          },
        }}
      /> */}
      {user && !client && (
        <BottomTab.Screen
          name="MessengerTraveller"
          component={MessengerTraveller}
          options={{
            title: t('message'),
            tabBarIcon: ({color}) => {
              return <Icon solid color={color} name="envelope" size={20} />;
            },
          }}
        />
      )}
      {client && (
        <BottomTab.Screen
          name="Messenger"
          component={Messenger}
          options={{
            title: t('message'),
            tabBarIcon: ({color}) => {
              return <Icon solid color={color} name="envelope" size={20} />;
            },
          }}
        />
      )}
      <BottomTab.Screen
        name="Profile"
        component={login.success ? Profile : Walkthrough}
        options={{
          title: t('account'),
          tabBarIcon: ({color}) => {
            return <Icon solid color={color} name="user-circle" size={20} />;
          },
        }}
      />
      {user && !client && (
        <BottomTab.Screen
          name="Notification"
          component={Notification}
          options={{
            title: 'Notification',
            tabBarIcon: ({color}) => {
              return <Icon color={color} name="bell" size={20} solid />;
            },
          }}
        />
      )} 
      {client && (
         <BottomTab.Screen
         name="Notification"
         component={Notification}
         options={{
           title: 'Notification',
           tabBarIcon: ({color}) => {
             return <Icon color={color} name="bell" size={20} solid />;
           },
         }}
       />
      )}
    </BottomTab.Navigator>

  );
};