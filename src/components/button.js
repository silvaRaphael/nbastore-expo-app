import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { icons, images, COLORS, SIZES, FONTS } from '../../constants';

const width = SIZES.width - SIZES.margin * 2;

const Button = props => {

  const solid = {
    // flex: 1,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    alignItems: 'center'
  }

  const border = {
    flex: props.fullWidth ? null : 1,
    width: props.fullWidth ? SIZES.width - SIZES.padding * 2 : null,
    borderRadius: SIZES.radius,
    ...SIZES.borderActive,
    alignItems: 'center'
  }
  
  const styleOp = props.style == 'solid' ? solid : border;

  return (
    <TouchableOpacity
      style={styleOp}
      onPress={props.onPress}
    >
      <Text
        style={{
          ...FONTS.default,
          color: props.style == 'solid' ? COLORS.white : COLORS.primary,
          padding: SIZES.padding
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;