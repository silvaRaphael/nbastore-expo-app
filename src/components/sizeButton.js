import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { icons, images, COLORS, SIZES, FONTS } from '../../constants';

const width = SIZES.width - SIZES.margin * 2;

const SizeButton = ({ size, onPress, active }) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginRight: SIZES.margin
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: active ? COLORS.primary : COLORS.secondary,
          borderWidth: 1,
          borderRadius: 10,
          minWidth: 40,
          height: 40,
        }}
      >
        <Text
          style={{
            ...FONTS.default,
            color: active ? COLORS.primary : COLORS.secondary,
            paddingHorizontal: 10
          }}
        >
          {size.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default SizeButton;