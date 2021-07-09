import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

import { icons, images, COLORS, SIZES, FONTS } from '../../constants';

const PaymentTimesButton = ({
  value, times, onPress, options
}) => {

  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: SIZES.width - SIZES.padding * 2,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
          borderRadius: SIZES.radius,
          backgroundColor: options ? null : COLORS.button,
        }}
      >
        <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={icons.card}
              style={{
                marginRight: 15
              }}
            />
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.white,
                marginRight: 5
              }}
            >
              $ 
            </Text>
            <Text
              style={{
                ...FONTS.title,
                color: COLORS.white,
              }}
            >
              {value}
            </Text>
          </View>
        <Text
          style={{
            ...FONTS.title,
            color: COLORS.white,
          }}
        >
          {times}x
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default PaymentTimesButton;