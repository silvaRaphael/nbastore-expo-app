import React from 'react';
import { View, TouchableWithoutFeedback, Text, Image } from 'react-native';

import { icons, images, COLORS, SIZES, FONTS } from '../../constants';

const width = SIZES.width * .75 - SIZES.padding * 2;

const ProductCard = ({
  id, name, image, backgroundColor, price, sizes, colors,onPress
}) => {
  return (
    <TouchableWithoutFeedback
      key={id + ''}
      onPress={onPress}
    >
      <View
        style={{
          borderRadius: SIZES.radius,
          backgroundColor: backgroundColor,
          width: width,
          padding: SIZES.padding,
          marginVertical: SIZES.margin,
          marginRight: SIZES.margin
        }}
      >
        <View
          style={{
            marginBottom: SIZES.margin,
          }}
        >
          <Image
            source={image}
            resizeMode="contain"
            style={{
              alignSelf: 'center',
              maxWidth: width - SIZES.padding * 2,
              height: width,
            }}
          />
        </View>
        <View>
          <View>
            <Text
              style={{
                ...FONTS.bigTitle,
                color: COLORS.white
              }}
            >
              {name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
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
                  color: COLORS.white,
                  marginRight: 5
                }}
              >
                $ 
              </Text>
              <Text
                style={{
                  ...FONTS.price,
                  color: COLORS.white,
                }}
              >
                {price}
              </Text>
            </View>
            <View>
              <Image
                source={icons.bag_white}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ProductCard;