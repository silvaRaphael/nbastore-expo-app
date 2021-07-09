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
  TextInput,
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

const width = SIZES.width - SIZES.margin * 2;

const AddCardScreen = ({ navigation }) => {

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

  const [numberLimit, setNumerLimit] = React.useState(16);
  const [expirationLimit, setExpirationLimit] = React.useState(4);

  const [owner, setOwner] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiration, setExpiration] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [type, setType] = React.useState('Debit');

  function handleCardNumber(text) {
    let num = text
    if(text.length == 16 && text.search('/') == -1) {
      let a = text.slice(0, 4)
      let b = text.slice(4, 8)
      let c = text.slice(8, 12)
      let d = text.slice(12, 16)
      num = `${a} ${b} ${c} ${d}`
      setNumerLimit(19)
      setCardNumber(num)
    } else {
      let textArr = text.split(' ')
      textArr = textArr.join('')
      setCardNumber(textArr)
      setNumerLimit(16)
    }
  }

  function handleExpiration(text) {
    let num = text
    if(text.length == 4 && text.search('/') == -1) {
      let a = text.slice(0, 2)
      let b = text.slice(2, 4)
      num = `${a}/${b}`
      setExpirationLimit(5)
      setExpiration(num)
    } else {
      let textArr = text.split('/')
      textArr = textArr.join('')
      setExpiration(textArr)
      setExpirationLimit(4)
    }
  }

  async function saveCard() {

    let currentCardInfo = await AsyncStorage.getItem('cardInfo');
    currentCardInfo = JSON.parse(currentCardInfo) || []

    const cardInfo = {
      userId: userId,
      owner: owner,
      cardNumber: cardNumber,
      expiration: expiration,
      cvv: cvv,
      type: type
    }

    currentCardInfo.push(cardInfo);

    if(owner && cardNumber && expiration && cvv && type) {
      await AsyncStorage.setItem('cardInfo', JSON.stringify(currentCardInfo));
      await navigation.goBack();
    }
  }
  
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

        <View
          style={{
            marginHorizontal: SIZES.margin,
          }}
        >
          <View style={{ paddingVertical: SIZES.padding }} >
            <Text
              style={{
                ...FONTS.title2,
                color: COLORS.white
              }}
            >
              Add Card
            </Text>
          </View>
          <TextInput
            style={{
              width: width,
              ...SIZES.borderActive,
              borderRadius: SIZES.radius,
              ...FONTS.default,
              color: COLORS.primary,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding / 2,
              marginBottom: 28
            }}
            placeholderTextColor={COLORS.primary}
            placeholder="Owner"
            onChangeText={text => setOwner(text)}
            value={owner}
          />
          <TextInput
            style={{
              width: width,
              ...SIZES.borderActive,
              borderRadius: SIZES.radius,
              ...FONTS.default,
              color: COLORS.primary,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding / 2,
              marginBottom: 28,
            }}
            maxLength={numberLimit}
            keyboardType="numeric"
            placeholderTextColor={COLORS.primary}
            placeholder="Card Number"
            onChangeText={text => handleCardNumber(text)}
            value={cardNumber}
          />
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={[{
                flex: 1,
                ...SIZES.borderActive,
                borderRadius: SIZES.radius,
                ...FONTS.default,
                color: COLORS.primary,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.padding / 2,
                marginBottom: 28,
                marginRight: SIZES.margin / 2
              }]}
              maxLength={expirationLimit}
              keyboardType="numeric"
              placeholderTextColor={COLORS.primary}
              placeholder="Expiration Date"
              onChangeText={text => handleExpiration(text)}
              value={expiration}
            />
            <TextInput
              style={[{
                flex: 1,
                ...SIZES.borderActive,
                borderRadius: SIZES.radius,
                ...FONTS.default,
                color: COLORS.primary,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.padding / 2,
                marginBottom: 28,
                marginLeft: SIZES.margin / 2
              }]}
              maxLength={4}
              keyboardType="numeric"
              placeholderTextColor={COLORS.primary}
              placeholder="CVV"
              onChangeText={text => setCvv(text)}
              value={cvv}
            />
          </View>
          <View style={{ flexDirection: 'row', marginBottom: SIZES.margin }}>
            <View style={{ marginRight: SIZES.margin / 2, flex: 1 }}>
              <Button
                text="Debit"
                style={type == 'Debit' && 'solid'}
                onPress={() => {
                  setType('Debit')
                }}
              />
            </View>
            <View style={{ marginLeft: SIZES.margin / 2, flex: 1 }}>
              <Button
                text="Credit"
                style={type == 'Credit' && 'solid'}
                onPress={() => {
                  setType('Credit')
                }}
              />
            </View>
          </View>
          <Button
            text="Save Card"
            style="solid"
            onPress={() => {
              saveCard()
            }}
          />
        </View>
      </ScrollView>
      <TabBar actual="Profile" navigation={navigation} />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
export default AddCardScreen;

