import React, {useEffect} from 'react';
import {StatusBar, Platform, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {useTheme, BaseSetting} from '@config';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {useSelector} from 'react-redux';

/* Main Stack Navigator */
import Main from 'app/navigation/main';
import MainTourGuide from 'app/navigation/maintourguide';
/* Modal Screen only affect iOS */
import Loading from '@screens/Loading';
import Filter from '@screens/Filter';
import FlightFilter from '@screens/FlightFilter';
import BusFilter from '@screens/BusFilter';
import Search from '@screens/Search';
import SearchHistory from '@screens/SearchHistory';
import PreviewImage from '@screens/PreviewImage';
import SelectBus from '@screens/SelectBus';
import SelectCruise from '@screens/SelectCruise';
import CruiseFilter from '@screens/CruiseFilter';
import EventFilter from '@screens/EventFilter';
import SelectDarkOption from '@screens/SelectDarkOption';
import SelectFontOption from '@screens/SelectFontOption';
import CategorySelector from '@screens/CategorySelector';
import LanguageFront from '@screens/LanguageFront';
import ChangeLanguageFront from '@screens/ChangeLanguageFront';
import TourGuideLanguage from '@screens/TourGuideLanguage';
import { onChangeCategory } from '../actions/application';
import LandingPage from '@screens/LandingPage';
import TravelSelection from '@screens/TravelSelection';
import Options from '@screens/Options';
import TourAlone from '@screens/TourAlone';
import Match from '@screens/Match';
import ChatAlone from '@screens/ChatAlone';
import SignIn from '@screens/SignIn';
import SignUp from '@screens/SignUp';
import Messages from '@screens/Messages';
import Messenger from '@screens/Messenger';
import Walkthrough from '@screens/Walkthrough';
import useAuth from '../../hooks/useAuth';


const RootStack = createStackNavigator();

export default function Navigator() {
  const travelType = useSelector(state => state.application.travel);
  const language = useSelector(state => state.application.language);
  const category = useSelector(state => state.application.category);
  const {theme, colors} = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  /**
   * init language
   */
  useEffect(() => {
    i18n.use(initReactI18next).init({
      resources: BaseSetting.resourcesLanguage,
      lng: BaseSetting.defaultLanguage,
      fallbackLng: BaseSetting.defaultLanguage,
      compatibilityJSON: 'v3',
    });
  }, []);

  /**
   * when reducer language change
   */
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  /**
   * when reducer category change
   */
 
  /**
   * when theme change
   */
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.primary, true);
    }
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
  }, [colors.primary, isDarkMode]);

  // Conditionally render the appropriate component based on the travelType
  // const AppContainer = travelType === 'tourguide' ? MainTourGuide : Main;

  return (
    <NavigationContainer theme={theme}>
      
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Loading">
        <RootStack.Screen
          name="Loading"
          component={Loading}
          options={{gestureEnabled: false}}
        />
        {/* Languange selection and Questioner Insert here */}
        <RootStack.Screen name="SignIn" component={SignIn} />
        <RootStack.Screen name="SignUp" component={SignUp} />
        <RootStack.Screen name="LanguageFront" component={LanguageFront} />
        <RootStack.Screen name="ChangeLanguageFront" component={ChangeLanguageFront} />
        <RootStack.Screen name="TourGuideLanguage" component={TourGuideLanguage} />
        <RootStack.Screen name="LandingPage" component={LandingPage}/>
        <RootStack.Screen name="TravelSelection" component={TravelSelection} />
        <RootStack.Screen name="Options" component={Options} />
        <RootStack.Screen name="TourAlone" component={TourAlone} />
        <RootStack.Screen name="Match" component={Match} />
        <RootStack.Screen name="ChatAlone" component={ChatAlone} />
        <RootStack.Screen name="Walkthrough" component={Walkthrough} />
        <RootStack.Screen name="MainTourGuide" component={MainTourGuide} />
        <RootStack.Screen name="Main" component={Main} 
        options={{
          gestureEnabled: false,
          headerLeft: null
        }}
        />
        <RootStack.Screen name="Filter" component={Filter} />
        <RootStack.Screen name="FlightFilter" component={FlightFilter} />
        <RootStack.Screen name="BusFilter" component={BusFilter} />
        <RootStack.Screen name="Search" component={Search} />
        <RootStack.Screen name="SearchHistory" component={SearchHistory} />
        <RootStack.Screen name="PreviewImage" component={PreviewImage} />
        <RootStack.Screen name="SelectBus" component={SelectBus} />
        <RootStack.Screen name="SelectCruise" component={SelectCruise} />
        <RootStack.Screen name="CruiseFilter" component={CruiseFilter} />
        <RootStack.Screen name="EventFilter" component={EventFilter} />
        <RootStack.Screen name="Messages" component={Messages} />
        {/* <RootStack.Screen name="Messenger" component={Messenger}/> */}
        <RootStack.Screen
          name="CategorySelector"
          component={CategorySelector}
          options={{
            presentation: 'transparentModal',
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
            gestureEnabled: false,
          }}
        />
        <RootStack.Screen
          name="SelectDarkOption"
          component={SelectDarkOption}
          options={{
            presentation: 'transparentModal',
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
            gestureEnabled: false,
          }}
        />
        <RootStack.Screen
          name="SelectFontOption"
          component={SelectFontOption}
          options={{
            presentation: 'transparentModal',
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
