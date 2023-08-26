import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: '100%',
  },
  imagePreview: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  placeholderImage: {
    width: 150,
    height: 150,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  themeIcon: {
    width: 16,
    height: 16,
  },
  languageButton: {
    marginTop: 10,
    backgroundColor: '#e5e5e5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  languageButtonTouchable: {
    flex: 1,
  },
  languageButtonText: {
    fontSize: 16,
    color: 'gray'
  },
  languageInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    // Add any additional styling you need for the input
  },
});
