import React from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, View, Image, Text } from 'react-native';

import { icons, images, COLORS, SIZES, FONTS } from '../../constants';


const HeaderBar = ({ goBack, navigation, onPress }) => {

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SIZES.width,
        height: 80,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.header
      }}
    >

      {goBack ? (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
            }}
          >
          <Image
            source={icons.back}
            resizeMode="contain"
          />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {}}
          style={{
            justifyContent: 'center',
            ...SIZES.icon,
          }}
        >
          <Image
            source={icons.drawer_icon}
            resizeMode="contain"
            style={{
              opacity: 0
            }}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile')
        }}
        style={{
          borderRadius: 20,
          width: 40,
          height: 40,
        }}
      >
        <View
          style={{
            borderRadius: 20,
            width: 40,
            height: 40,
          }}
        >
          <Image
            source={images.default_profile_pic}
            resizeMode="contain"
            style={{
              borderRadius: 20,
              width: 40,
              height: 40,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default HeaderBar;