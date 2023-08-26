import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

const sendPushNotification = async (expoPushToken, title, body) => {
    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: expoPushToken,
          title: title,
          body: body,
          data: { message: body }, // You can add any additional data here
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send push notification');
      }
  
      console.log('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  

export default sendPushNotification;
