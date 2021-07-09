import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { icons, images, COLORS, SIZES, FONTS } from '../../constants';

const AddressButton = ({
  id, country, street, selected, add, onPress
}) => {

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
          alignItems: add ? 'center' : 'flex-start'
        }}
        onPress={onPress}
      >
        <Text
          style={{
            ...FONTS.title2,
            color: selected ? COLORS.white : COLORS.textButton,
            marginBottom: SIZES.margin,
            paddingHorizontal: add ? SIZES.padding : null,
          }}
        >
          {country}
        </Text>
        {!add && (
          <Text
            style={{
              ...FONTS.title2,
              color: selected ? COLORS.white : COLORS.textButton,
            }}
          >
            {street}
          </Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default AddressButton;