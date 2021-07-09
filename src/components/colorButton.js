import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { icons, images, COLORS, SIZES, FONTS } from '../../constants';

const width = SIZES.width - SIZES.margin * 2;

const ColorButton = ({ id, name, color, onPress, active }) => {

  function firstLUp(string) {
    let firstL = string.charAt(0).toUpperCase()
    let restL = string.slice(1, string.length)
    let resL = firstL + restL
    return resL
  }

  return (
    <TouchableOpacity
      key={id + ''}
      onPress={onPress}
      style={{
        alignSelf: 'flex-end'
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 10,
          height: 20,
          backgroundColor: active ? COLORS.miniButton : null
        }}
      >
        <Text
          style={{
            ...FONTS.fontInfo,
            color: COLORS.bgLight,
            paddingHorizontal: 10
          }}
        >
          {firstLUp(name)}
        </Text>
        <View
          style={{
            backgroundColor: color.toLowerCase(),
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 50,
            width: 20,
            height: 20
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

export default ColorButton;