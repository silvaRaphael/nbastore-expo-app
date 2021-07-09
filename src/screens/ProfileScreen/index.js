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
import { users } from '../../../api';

import HeaderBar from '../../components/header';
import TabBar from '../../components/tab';
import AddressButton from '../../components/addressButton';
import PaymentButton from '../../components/paymentButton';
import PaymentTimesButton from '../../components/paymentTimesButton';
import Button from '../../components/button';

import AuthContext from '../../context/authContext';

const ProfileScreen = ({ navigation }) => {

  const { signOut } = React.useContext(AuthContext);

  const [userId, setUserId] = React.useState("");

  React.useEffect(() => {
    async function userData() {
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo) || []
      const { userId } = userInfo

      setUserId(userId)
    }
    userData()
    getInfo()
  }, [])

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
  }

  React.useEffect(() => {
    getInfo()
  }, [currentAddressInfo, currentCardInfo])

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
              Your Address
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
                />
              )
            })}
            <AddressButton
              country="Add Address"
              add
              onPress={() => {
                navigation.push('AddAddress')
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
              Your Payment Methods
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
                />
              )
            })}
            <PaymentButton
              bank="Add Card"
              add
              onPress={() => {
                navigation.push('AddCard')
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
              Profile Picture
            </Text>
          </View>
          
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.padding,
            }}
          >
            <View
              style={{
                ...SIZES.borderActive,
                borderRadius: SIZES.width / 2,
                height: SIZES.width / 2 - SIZES.padding * 2,
                width: SIZES.width / 2 - SIZES.padding * 2,
              }}
            >
              <Image
                source={images.default_profile_pic}
                resizeMode="cover"
                style={{
                  borderRadius: SIZES.width / 2,
                  height: SIZES.width / 2 - SIZES.padding * 2,
                  width: SIZES.width / 2 - SIZES.padding * 2,
                }}
              />
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'stretch',
                flex: 1,
                marginLeft: SIZES.margin,
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLORS.button,
                  borderRadius: SIZES.radius,
                  paddingVertical: SIZES.padding,
                }}
              >
                <Text
                  style={{
                    ...FONTS.title2,
                    color: COLORS.textButton
                  }}
                >
                  Add Photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLORS.button,
                  borderRadius: SIZES.radius,
                  paddingVertical: SIZES.padding,
                }}
              >
                <Text
                  style={{
                    ...FONTS.title2,
                    color: COLORS.textButton
                  }}
                >
                  Remove Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginVertical: SIZES.margin * 2,
              paddingHorizontal : SIZES.padding
            }}
          >
            <TouchableOpacity
              onPress={() => {
                signOut()
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.button,
                borderRadius: SIZES.radius,
                paddingVertical: SIZES.padding / 2,
              }}
            >
              <Text
                style={{
                  ...FONTS.title2,
                  color: COLORS.textButton
                }}
              >
                LogOut
              </Text>
            </TouchableOpacity>
          </View>

        </View>
        
      </ScrollView>
      <TabBar actual="Profile" navigation={navigation} />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
export default ProfileScreen;

