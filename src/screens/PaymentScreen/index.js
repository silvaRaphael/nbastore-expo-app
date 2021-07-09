import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { icons, images, COLORS, SIZES, FONTS } from '../../../constants';
import { products } from '../../../api';

import HeaderBar from '../../components/header';
import TabBar from '../../components/tab';
import AddressButton from '../../components/addressButton';
import PaymentButton from '../../components/paymentButton';
import PaymentTimesButton from '../../components/paymentTimesButton';
import Button from '../../components/button';

const PaymentScreen = ({ navigation, route }) => {

  const [userId, setUserId] = React.useState("");
  const [userData, setUserData] = React.useState("");

  React.useEffect(() => {
    async function userData() {
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo) || []
      const { userId } = userInfo

      setUserId(userId)
      setUserData(userInfo)
    }
    userData()
    getInfo()
  }, [])

  const itemData = JSON.parse(route.params.data);

  const [address, setAddress] = React.useState(0);
  const [payment, setPayment] = React.useState(0);
  const [method, setMethod] = React.useState("");
  const [quotas, setQuotas] = React.useState([]);

  const [modalVisible, setModalVisible] = React.useState(false);

  const [total, setTotal] = React.useState(0);
  const [paymentValue, setPaymentValue] = React.useState(0);
  const [paymentTimes, setPaymentTimes] = React.useState(1);


  const [currentAddressInfo, setCurrentAddressInfo] = React.useState([]);
  const [currentCardInfo, setCurrentCardInfo] = React.useState([]);

  async function getInfo() {

    let mult = await AsyncStorage.multiGet(['addressInfo', 'cardInfo'])

    let addressData = JSON.parse(mult[0][1]) || []
    addressData = addressData.filter(item => item.userId == userId)
    
    let cardData = JSON.parse(mult[1][1]) || []
    cardData = cardData.filter(item => item.userId == userId)

    setCurrentAddressInfo(addressData)
    setCurrentCardInfo(cardData)
    cardData != null && cardData.length > 0 && method == "" && setMethod(cardData[0].type)
  }

  React.useEffect(() => {
    getInfo()
  }, [currentAddressInfo, currentCardInfo])

  async function finishPayment() {

    if(itemData != null && address != null && payment != null && paymentValue != null && paymentTimes != null) {

      const finishData = {
        user: userData,
        address: currentAddressInfo[address],
        card: currentCardInfo[payment],
        total: total,
        parcelValue: paymentValue,
        parcelTimes: paymentTimes,
        method: method,
        products: itemData
      }
      
      console.log(finishData)

      await AsyncStorage.setItem('cartProducts', '[]')

      navigation.navigate('Home')
    }
  }

  React.useEffect(() => {

    if(itemData) {
      const prices = itemData.map(item => (
        item.price
      ))
  
      const total = prices.reduce((acc, curr) => {
        return (Number(acc) + Number(curr)).toFixed(2)
      })
  
      let parcels  = 0
  
      if(total > 50 && total < 100) {
        parcels = 2
      } else if(total > 100 && total < 200) {
        parcels = 3
      } else if(total > 200 && total < 300) {
        parcels = 4
      } else if(total > 300 && total < 400) {
        parcels = 5
      } else {
        parcels = 6
      }
  
      let quotaArr = []
  
      for(let parcelTimes = 1; parcelTimes <= parcels; parcelTimes++) {
  
        let parcelValue = ((total / parcelTimes) + (parcelTimes * 1.1)).toFixed(2)
        let parcelTotal = (parcelValue * parcelTimes).toFixed(2)
  
        let obj = {
          parcelTimes,
          parcelValue,
          parcelTotal
        }
        quotaArr.push(obj)
      }
  
      setQuotas(quotaArr)
  
      if(method == 'Debit') {
        setTotal(total)
        setPaymentValue(total)
        setPaymentTimes(1)
      } else {
        setTotal(quotaArr[0].parcelTotal)
        setPaymentValue(quotaArr[0].parcelTotal)
        setPaymentTimes(quotaArr[0].parcelTimes)
      }
    }
  }, [method])
  
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
        <HeaderBar
          goBack
          navigation={navigation}
        />

        <View>

          <View style={{ marginLeft: SIZES.margin, paddingVertical: SIZES.padding }} >
            <Text
              style={{
                ...FONTS.title2,
                color: COLORS.white
              }}
            >
              Select Address
            </Text>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: SIZES.padding }}
          >
            {currentAddressInfo && currentAddressInfo.map((item, index) => {
              return (
                <AddressButton
                  key={index + ''}
                  id={index + ''}
                  country={`${item.country}, ${item.zipCode}`}
                  street={item.address}
                  selected={address == index}
                  onPress={() => {
                    setAddress(index)
                  }}
                />
              )
            })}
            <AddressButton
              country="Add Address"
              add
              onPress={() => {
                navigation.navigate('AddAddress')
              }}
            />
            
          </ScrollView>

          <View style={{ marginLeft: SIZES.margin, paddingVertical: SIZES.padding }} >
            <Text
              style={{
                ...FONTS.title2,
                color: COLORS.white
              }}
            >
              Select Payment Method
            </Text>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: SIZES.padding }}
          >
            {currentCardInfo && currentCardInfo.map((item, index) => {
              return (
                <PaymentButton
                  key={index + ''}
                  id={index + ''}
                  bank="Bank"
                  validate={item.expiration}
                  type={item.type}
                  number={item.cardNumber}
                  selected={index == payment}
                  onPress={() => {
                    setPayment(index)
                    setMethod(item.type)
                  }}
                />
              )
            })}
            <PaymentButton
              bank="Add Card"
              add
              onPress={() => {
                navigation.navigate('AddCard')
              }}
            />
          </ScrollView>

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
          </View>

          <View
            style={{
              paddingHorizontal: SIZES.padding
            }}
          >
            <View
              style={{
                paddingTop: SIZES.padding,
                paddingBottom: SIZES.padding / 2
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,
                }}
              >
                {method} Selected
              </Text>
            </View>

            <View
              style={{
                position: 'relative',
              }}
            >
              <PaymentTimesButton
                value={paymentValue}
                times={paymentTimes}
                onPress={() => {
                  method == 'Credit' && setModalVisible(true)
                }}
              />
            </View>
            
            <Modal
              transparent
              animationType="fade"
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false)
            }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  setModalVisible(false)
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00000099'
                  }}
                >
                  <View
                    style={{
                      borderRadius: SIZES.radius,
                      paddingVertical: SIZES.padding / 2,
                      backgroundColor: COLORS.modalBg,
                      alignSelf: 'center',
                    }}
                  >
                    {quotas && quotas.map(item => {
                      return (
                        <PaymentTimesButton
                          key={item.parcelTimes.toString()}
                          value={item.parcelValue}
                          times={item.parcelTimes}
                          options
                          onPress={() => {
                            setModalVisible(false)
                            setPaymentValue(item.parcelValue)
                            setPaymentTimes(item.parcelTimes)
                            setTotal(item.parcelTotal)
                          }}
                        />
                      )
                    })}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>

          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.margin,
              marginTop: SIZES.margin * 2
            }}
          >
            <Button
              text="Finish Payment"
              onPress={() => {
                finishPayment()
              }}
            />
          </View>
          
        </View>
        
      </ScrollView>
      <TabBar actual="Cart" navigation={navigation} />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
export default PaymentScreen;

