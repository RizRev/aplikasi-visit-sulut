import React, {useEffect, useState, useRef} from 'react';
import {store, persistor} from 'app/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigator from './navigation';
import * as Notifications from 'expo-notifications'; // Import Notifications
import { AuthProvider } from '../hooks/useAuth';
import registerNNPushToken from 'native-notify';


console.disableYellowBox = true;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  registerNNPushToken(10715, '7P4LhbDCRWDvxZv5IZv175');
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
