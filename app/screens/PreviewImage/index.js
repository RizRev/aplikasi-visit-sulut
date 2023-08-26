import React, {useState, useRef} from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import Swiper from 'react-native-swiper';
import {Image, Header, SafeAreaView, Icon, Text} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import { useRoute } from '@react-navigation/native';


export default function PreviewImage({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const route = useRoute();
  const { item } = route.params;
  const swiperRef = useRef(null); 

  // Extract image URLs from the item object
  const imageUrls = item.imageSrc.map((image) => image.url);
  // const dots = Array.from({ length: Math.min(images.length, 5) });


  let flatListRef = null;
  // let swiperRef = null;

  const [images, setImages] = useState(
    imageUrls.map((url, index) => ({
      id: `${index + 1}`,
      image: { uri: url },
      selected: index === 0,
    }))
  );
  // console.log("DATA IMAGES : ",images);
  const [indexSelected, setIndexSelected] = useState(0);
  // console.log("Data IMAGE: ",JSON.stringify(images.));
  /**
   * call when select image
   *
   * @param {*} indexSelected
   */
  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
    setImages(
      images.map((item, index) => {
        if (index == indexSelected) {
          return {
            ...item,
            selected: true,
          };
        } else {
          return {
            ...item,
            selected: false,
          };
        }
      }),
    );
    flatListRef.scrollToIndex({
      animated: true,
      index: indexSelected,
    });
  };

  /**
   * @description Called when image item is selected or activated
   * @author Lutfi <aldinugroholutfi@gmail.com>
   * @date 2023
   * @param {*} touched
   * @returns
   */
  const onTouchImage = (touched) => {
    if (touched === indexSelected) return;
    swiperRef.current.scrollBy(touched - indexSelected, false);
  };

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {images.map((item, index) => {
          if (index < 5) {
            return (
              <TouchableOpacity
                key={`dot_${item.id}`} // Add a unique prefix to the key
                style={[
                  styles.dot,
                  { backgroundColor: index === indexSelected ? colors.primary : BaseColor.dividerColor },
                ]}
                onPress={() => onSelect(index)}
              />
            );
          } else if (index === 5) {
            return <Text key="dots">...</Text>; // Use a unique key for the "..." element
          }
          return null;
        })}
      </View>
    );
  };
  

  const styles = StyleSheet.create({
    pagination: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginHorizontal: 4,
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Header
        title=""
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.whiteColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        barStyle="light-content"
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}
      >
        <Swiper
          ref={swiperRef}
          loop={false}
          onIndexChanged={(index) => onSelect(index)}
          showsPagination={false} // Disable default pagination
        >
          {images.map((item) => (
            <Image
              key={item.id}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
              source={item.image}
            />
          ))}
        </Swiper>
        {renderPagination()}
        <View style={{ paddingVertical: 10 }}>
          <View style={styles.lineText}>
            <Text body2 whiteColor>
              {item.about}
            </Text>
            <Text body2 whiteColor style={{marginLeft: 350, marginBottom: 12}}>
              {indexSelected + 1}/{images.length}
            </Text>
          </View>
          <FlatList
            ref={(ref) => {
              flatListRef = ref;
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={(item) => item.id} // Use item.id as the keyExtractor
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  onTouchImage(index);
                }}
                activeOpacity={0.9}
              >
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    marginLeft: 20,
                    borderRadius: 8,
                    borderColor:
                      index === indexSelected
                        ? colors.primaryLight
                        : BaseColor.grayColor,
                    borderWidth: 1,
                  }}
                  source={item.image}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
