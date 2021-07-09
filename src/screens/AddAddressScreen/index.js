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

const AddAddressScreen = ({ navigation }) => {

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

  const [country, setCoutry] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");

  async function saveAddress() {

    let currentAddressInfo = await AsyncStorage.getItem('addressInfo');
    currentAddressInfo = JSON.parse(currentAddressInfo) || []

    const addressInfo = {
      userId: userId,
      country: country,
      address: address,
      zipCode: zipCode
    }

    currentAddressInfo.push(addressInfo);

    if(country && address && zipCode) {
      await AsyncStorage.setItem('addressInfo', JSON.stringify(currentAddressInfo));
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
              Add Address
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
            placeholder="Country"
            onChangeText={text => setCoutry(text)}
            value={country}
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
            multiline
            numberOfLines={2}
            placeholderTextColor={COLORS.primary}
            placeholder="Address"
            onChangeText={text => setAddress(text)}
            value={address}
          />
          <TextInput
            style={[{
              width: width,
              ...SIZES.borderActive,
              borderRadius: SIZES.radius,
              ...FONTS.default,
              color: COLORS.primary,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding / 2,
              marginBottom: 28
            }]}
            placeholderTextColor={COLORS.primary}
            placeholder="Zip Code, Number"
            onChangeText={text => setZipCode(text)}
            value={zipCode}
          />
          <Button
            text="Save Address"
            style="solid"
            onPress={() => {
              saveAddress()
            }}
          />
        </View>
      </ScrollView>
      <TabBar actual="Profile" navigation={navigation} />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
export default AddAddressScreen;

