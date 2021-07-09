import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { icons, images, COLORS, SIZES, FONTS } from '../../../constants';
import { products } from '../../../api';

import ProductCardCart from '../../components/productCardCart';
import CategoryButton from '../../components/categoryButton';
import HeaderBar from '../../components/header';
import TabBar from '../../components/tab';

const CartScreen = ({ navigation }) => {

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

  const [cartProducts, setCartProducts] = React.useState(null);
  const [total, setTotal] = React.useState(0);
  
  async function getProducts() {

    let cartData = await AsyncStorage.getItem('cartProducts');
    cartData = JSON.parse(cartData) || []

    cartData = cartData.filter(item => item.userId == userId)
    
    if(cartData.length > 0) {

      setCartProducts(cartData)
    
      const prices = cartData.map(item => item.price)

      const total = prices.reduce((acc, curr) => {
        return (Number(acc) + Number(curr)).toFixed(2)
      })

      setTotal(total)
    } else {
      setTotal(0)
      setCartProducts(null)
    }
  }

  async function removeItem(id) {

    let item = cartProducts.find((item, index) => {
      return item.id == id
    })

    const index = cartProducts.indexOf(item)
    cartProducts.splice(index, 1)

    await AsyncStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }

  React.useEffect(() => { getProducts() }, [userId, cartProducts])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.bgDark,
        paddingTop: 30
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          width: SIZES.width,
          paddingBottom: 80
        }}
      >
        <View
          style={{
            paddingBottom: SIZES.padding,
            backgroundColor: COLORS.bgDark
          }}
        >
          <HeaderBar />
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: SIZES.padding
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
                  ...FONTS.price,
                  color: COLORS.white,
                }}
              >
                {total}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center'
              }}
            >
              {total != 0 && (
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
                    backgroundColor: COLORS.miniButton
                  }}
                  onPress={() => {
                    navigation.push('Payment',{
                      data: JSON.stringify(cartProducts)
                    })
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.fontInfo,
                      color: COLORS.white,
                      paddingHorizontal: 12,
                      paddingVertical: 5
                    }}
                  >
                    Pay Now
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              marginHorizontal: SIZES.margin,
              paddingTop: SIZES.padding / 2
            }}
          >
            <Text
              style={{
                ...FONTS.bigTitle,
                color: COLORS.white,
              }}
            >
              Your Cart
            </Text>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: SIZES.margin
          }}
        >
          {cartProducts && cartProducts.map((item, index) => {

            return (
              <ProductCardCart
                key={index.toString()}
                id={item.id}
                name={item.name}
                image={item.image}
                backgroundColor={item.backgroundColor}
                price={item.price}
                sizes={item.sizes}
                colors={item.colors}
                onPress={() => {
                  removeItem(item.id)
                }}
              />
            )
          })}
        </View>
        
      </ScrollView>
      <TabBar actual="Cart" navigation={navigation} />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
export default CartScreen;

