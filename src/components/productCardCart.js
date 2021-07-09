import React from 'react';
import { View, TouchableWithoutFeedback, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { icons, images, COLORS, SIZES, FONTS } from '../../constants';

const ProductCardCart= ({
  id, name, image, price, sizes, onPress
}) => {

  return (
    <TouchableWithoutFeedback
      key={id.toString()}
    >
      <View
        style={{
          flex: 1,
          borderRadius: SIZES.radius,
          ...SIZES.borderActive,
          padding: SIZES.padding,
          marginVertical: SIZES.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Image
          source={image}
          resizeMode="contain"
          style={{
            alignSelf: 'center',
            maxWidth: SIZES.width / 3,
            height: SIZES.width / 3,
          }}
        />
        <View>
          <View>
            <Text
              style={{
                ...FONTS.bigTitle,
                color: COLORS.textButton
              }}
            >
              {name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: SIZES.margin
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.textButton,
                  marginRight: 5
                }}
              >
                $ 
              </Text>
              <Text
                style={{
                  ...FONTS.price,
                  color: COLORS.textButton,
                }}
              >
                {price}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onPress}
            >
              <Image
                source={icons.trash}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ProductCardCart;