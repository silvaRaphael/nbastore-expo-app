import React from 'react';
import { TouchableWithoutFeedback, View, Image, Text } from 'react-native';

import { icons, images, COLORS, SIZES, FONTS } from '../../constants';


const TabBar = ({ navigation, actual }) => {

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SIZES.width,
        height: 80,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.bgDark,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => { navigation.navigate('Home') }}
        style={{
          justifyContent: 'center',
          ...SIZES.icon,
        }}
      >
        <Image
          source={actual == "Home" ? icons.menu_active : icons.menu}
          resizeMode="contain"
        />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => { navigation.navigate('Cart') }}
        style={{
          justifyContent: 'center',
          ...SIZES.icon,
        }}
      >
        <Image
          source={actual == "Cart" ? icons.bag_active : icons.bag}
          resizeMode="contain"
        />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {}}
        style={{
          justifyContent: 'center',
          ...SIZES.icon,
        }}
      >
        <Image
          source={actual == "Search" ? icons.search_active : icons.search}
          resizeMode="contain"
        />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => { navigation.navigate('Profile') }}
        style={{
          justifyContent: 'center',
          ...SIZES.icon,
        }}
      >
        <Image
          source={actual == "Profile" ? icons.profile_active : icons.profile}
          resizeMode="contain"
        />
      </TouchableWithoutFeedback>
      
    </View>
  );
}

export default TabBar;