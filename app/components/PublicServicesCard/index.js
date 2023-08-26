import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import StarRating from '../StarRating';
import Tag from '../Tag';
import PropTypes from 'prop-types';
import Image from '../Image'
import Text from '../Text'
import {Images, useTheme, BaseColor} from '@config';


export default function PublicServicesCard(props) {
  const {colors} = useTheme();
  const {style, name, location, time, image, rate, openHour, closeHour, onPress, onPressTag} = props;
  return (
    <TouchableOpacity
      style={[styles.content, {borderColor: colors.border}, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <Image source={{uri: image}} style={styles.imageBanner} />
      
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text body2 semibold numberOfLines={1}>
            {name}
          </Text>
          {/* <Text overline semibold grayColor style={{marginVertical: 5}}>
            Open: {openHour}
          </Text> */}
          <Text overline grayColor style={{marginVertical: 5}}>
            Open: {openHour}
          </Text>
          <View style={styles.girdRowRate}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Tag onPress={onPressTag} rateSmall style={{marginRight: 5}}>
              {rate}
            </Tag>
            <StarRating
              disabled={false}
              starSize={10}
              maxStars={5}
              rating={rate}
              selectedStar={onPressTag}
              fullStarColor={BaseColor.yellowColor}
            />
          </View>
          <Text caption2 grayColor numberOfLines={1}>
            {/* 3 Km */}
          </Text>
        </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

PublicServicesCard.propTypes = {
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  time: PropTypes.string,
  rate: PropTypes.number,
  openHour: PropTypes.string,
  closeHour: PropTypes.string,
  location: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};

PublicServicesCard.defaultProps = {
  image: Images.profile2,
  name: 'BBC Music Introducing',
  time: 'Thu, Oct 31, 9:00am',
  rate: 4.5,
  openHour: '9:00 AM',
  closeHour: '5:00 PM',
  location: 'Tobacco Dock, London',
  style: {},
  onPress: () => {},
  onPressTag: () => {},
};
