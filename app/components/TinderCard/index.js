import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import Layout from '../../data/layout';

const BOTTOM_BAR_HEIGHT = 29;

export const TinderCard = ({ name, language, imageSrc }) => {
  
  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageSrc }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.caption}>Language: {language}</Text>
      </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
      width: '100%',
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -50
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 30,
  },
  cardContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  caption: {
    fontSize: 16,
    color: 'white',
  },
});
