import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Match = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { matchData } = params;
//   console.log("matchData : ",matchData);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.matchImage}
          source={{ uri: 'https://links.papareact.com/mg9' }}
        />
      </View>

      <Text style={styles.matchText}>
        You Got Match!!!
      </Text>

      <View style={styles.imagesContainer}>
        <Image
          style={styles.userImage}
          source={{ uri: matchData["swiper"].image }}
        />
        <Image
          style={styles.userImage}
          source={{ uri: matchData["swipee"].image }}
        />
      </View>

      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => {
          navigation.goBack();
          navigation.navigate('MessengerTraveller', {matchData});
        }}
      >
        <Text style={styles.buttonText}>Chat Now!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db', // Blue background color
    paddingTop: 20,
    opacity: 0.89,
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  matchImage: {
    marginTop: 200,
    height: 90,
    width: '100%',
  },
  matchText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 18,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  userImage: {
    height: 96,
    width: 96,
    borderRadius: 48,
  },
  chatButton: {
    backgroundColor: 'white',
    margin: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Match;
