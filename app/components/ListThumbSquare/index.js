import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from '../Text';
import Image from '../Image';
import styles from './styles';
import PropTypes from 'prop-types';
import {useTheme} from '@config';

export default function ListThumbSquare(props) {
  const {colors} = useTheme();
  const {
    style,
    imageStyle,
    image,
    txtLeftTitle,
    txtContent,
    txtRight,
    unread,
    onPress,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.item, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={[styles.contain, {borderBottomColor: colors.border}]}>
        <Image source={{uri: image}} style={[styles.thumb, imageStyle]} />
        <View style={styles.content}>
          <View style={styles.left}>
            <Text headline semibold>
              {txtLeftTitle}
            </Text>
            <Text
              note
              numberOfLines={1}
              footnote
              grayColor
              style={{
                paddingTop: 5,
              }}>
              {txtContent}
            </Text>
          </View>
          <View style={styles.right}>
            <Text caption2 grayColor numberOfLines={1}>
              {txtRight}
            </Text>
            {unread && ( // Conditionally render the unread icon
              <View style={styles.unreadIcon}>
                <Text small whiteColor>
                  1
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

ListThumbSquare.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageStyle: PropTypes.object,
  image: PropTypes.node.isRequired,
  txtLeftTitle: PropTypes.string,
  txtContent: PropTypes.string,
  txtRight: PropTypes.string,
  onPress: PropTypes.func,
};

ListThumbSquare.defaultProps = {
  style: {},
  imageStyle: {},
  image: '',
  txtLeftTitle: '',
  txtContent: '',
  txtRight: '',
  onPress: () => {},
};
