import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { icons, images, COLORS, SIZES, FONTS } from '../../constants';

const PaymentButton = ({
  bank, id, validate, type, number, selected, add, onPress
}) => {

  let cardNumber = number && number.substr(number.length - 4, number.length)

  return (
    <LinearGradient
      key={id}
      colors={
        selected ? [COLORS.topGradient, COLORS.bottomGradient] : [COLORS.button, COLORS.button]
      }
      style={{
        borderRadius: SIZES.radius,
        marginRight: SIZES.margin
      }}
    >
      <TouchableOpacity
        style={{
          padding: SIZES.padding,
          flex: 1,
          justifyContent: 'center',
          alignItems: add ? 'center' : null
        }}
        onPress={onPress}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              ...FONTS.title2,
              color: selected ? COLORS.white : COLORS.textButton,
              marginBottom: SIZES.margin,
              paddingHorizontal: add ? SIZES.padding * 2 : null,
            }}
          >
            {bank}
          </Text>
          {!add && (
            <Text
              style={{
                ...FONTS.title2,
                color: selected ? COLORS.white : COLORS.textButton,
                marginBottom: SIZES.margin,
                paddingHorizontal: add ? SIZES.padding : null,
              }}
            >
              {validate}
            </Text>
          )}
        </View>
        {!add && (
          <>
          <Text
            style={{
              ...FONTS.fontInfo,
              color: selected ? COLORS.white : COLORS.textButton,
            }}
          >
            {type}
          </Text>
        
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end'
            }}
          >
            <Text
              style={{
                ...FONTS.title2,
                color: selected ? COLORS.white : COLORS.textButton,
                marginBottom: 5,
                marginRight: 10
              }}
            >
              . . . .
            </Text>
            <Text
              style={{
                ...FONTS.title2,
                color: selected ? COLORS.white : COLORS.textButton,
                marginTop: SIZES.margin,
                paddingHorizontal: add ? SIZES.padding : null,
                marginRight: SIZES.margin * 4,
                maxWidth: SIZES.width - SIZES.padding * 2
              }}
            >
              {cardNumber}
            </Text>
            <Image
              source={icons.card_mark}
              resizeMode="contain"
            />
          </View>
          </>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default PaymentButton;