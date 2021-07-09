import React from 'react';
import { TouchableWithoutFeedback, View, Image, Text } from 'react-native';

import { icons, images, COLORS, SIZES, FONTS } from '../../constants';


const CategoryButton = ({name, icon, active, onPress}) => {

  const act = active == name ? true : false
  
  const iconSource = act ? icon + 1 : icon

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      style={{
        justifyContent: 'center',
        ...SIZES.icon,
      }}
    >
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: act ? COLORS.primary : null,
            borderRadius: 50,
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginRight: SIZES.margin
          },
          !act && ({ ...SIZES.borderDisabled })
        ]}
      >
        { icon && (
          <Image
            source={iconSource}
            resizeMode="contain"
            style={{
              ...SIZES.icon,
              marginRight: 10
            }}
          />
        )}
        <Text
          style={{
            ...FONTS.h3,
            color: act ? COLORS.white : COLORS.secondary
          }}
        >
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default CategoryButton;