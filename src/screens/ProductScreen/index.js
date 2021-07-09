import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import Carousel from "react-native-carousel-control";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { icons, images, COLORS, SIZES, FONTS } from '../../../constants';
import { products } from '../../../api';
import ColorButton from '../../components/colorButton';
import Button from '../../components/button';
import SizeButton from '../../components/sizeButton';

const ProductScreen = ({ navigation, route }) => {

  const [userId, setUserId] = React.useState("");

  React.useEffect(() => {
    async function userData() {
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo) || []
      const { userId } = userInfo

      setUserId(userId)
    }
    userData()
  }, [])
  
  const itemData = JSON.parse(route.params.data);

  const [colorSelected, setColorSelected] = React.useState(itemData.colors[0]);
  const [colorsProducts, setColorsProducts] = React.useState(itemData.colors);

  const [sizeSelected, setSizeSelected] = React.useState(itemData.sizes[0]);
  const [sizesProducts, setSizesProducts] = React.useState(itemData.sizes);

  async function addToCart() {

    let currentCartInfo = await AsyncStorage.getItem('cartProducts');
    currentCartInfo = JSON.parse(currentCartInfo) || []

    const productInfo = {
      userId: userId,
      id: itemData.id,
      image: itemData.image,
      code: itemData.code,
      name: itemData.name,
      price: itemData.price,
      color: colorSelected,
      size: sizeSelected
    }

    currentCartInfo.push(productInfo);

    await AsyncStorage.setItem('cartProducts', JSON.stringify(currentCartInfo));
    
    await Alert.alert(`${productInfo.name} Added to Cart!`, 
    `Size ${productInfo.size} 
    \nColor ${productInfo.color.name} 
    \nPrice $${productInfo.price}`)
  }

  const width = SIZES.width * .75 - SIZES.padding * 2;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: itemData.backgroundColor,
        paddingTop: 30
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ flex: 1 }}
      >
        <HeaderBar navigation={navigation} />
        <View style={{ height: SIZES.width }}>
          <Carousel
            // pageWidth={SIZES.width}
          >
            <Image
              source={itemData.image}
              resizeMode="contain"
              style={{
                alignSelf: 'center',
                maxWidth: SIZES.width - SIZES.padding * 2,
                height: SIZES.width,
              }}
            />
            <Image
              source={itemData.image}
              resizeMode="contain"
              style={{
                alignSelf: 'center',
                maxWidth: SIZES.width - SIZES.padding * 2,
                height: SIZES.width,
              }}
            />
          </Carousel>
        </View>

        <View
          style={{
            flex: 1,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: COLORS.bgLight,
            padding: SIZES.padding,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.margin
            }}
          >
            <View>
              <View>
                <Text
                  style={{
                    ...FONTS.bigTitle,
                    color: COLORS.white
                  }}
                >
                  {itemData.name}
                </Text>
              </View>
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
                  {itemData.price}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {colorsProducts.map((color, index) => {
                return (
                  <ColorButton
                    id={index}
                    name={color.name}
                    color={color.value}
                    onPress={() => {
                      let colorInfo = {
                        name: color.name,
                        value: color.value
                      }
                      setColorSelected(colorInfo)
                    }}
                    active={colorSelected.value == color.value}
                  />
                )
              })}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.margin * 2
            }}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              {sizesProducts.length == 0 ? (
                <SizeButton
                  size="UNIQUE SIZE"
                  onPress={() => {
                    setSizeSelected("UNIQUE SIZE")
                  }}
                  active={true}
                />
              ) : sizesProducts.map(size => {
                return (
                  <SizeButton
                    size={size}
                    onPress={() => {
                      setSizeSelected(size)
                    }}
                    active={sizeSelected == size}
                  />
                )
              })}
            </View>
            <View
              style={{
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  backgroundColor: COLORS.miniButton
                }}
                onPress={() => { navigation.navigate('Cart') }}
              >
                <Text
                  style={{
                    ...FONTS.fontInfo,
                    color: COLORS.white,
                    paddingHorizontal: 12,
                    paddingVertical: 5
                  }}
                >
                  See Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginVertical: SIZES.padding * 2,
            }}
            >
            <Button
              style="solid"
              text="Add to Card"
              onPress={() => {
                addToCart()
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProductScreen;

const HeaderBar = ({ navigation }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: SIZES.width,
      height: 80,
      paddingHorizontal: SIZES.padding
    }}
  >
    <TouchableOpacity
      onPress={() => { navigation.goBack() }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF15',
        width: 40,
        height: 40,
        borderRadius: 10
      }}
    >
      <Image
        source={icons.back}
        resizeMode="contain"
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => {}}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={icons.info}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>
)