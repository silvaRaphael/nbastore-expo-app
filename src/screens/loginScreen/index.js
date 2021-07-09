import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { icons, images, COLORS, SIZES, FONTS } from '../../../constants';

import Button from '../../components/button';

import AuthContext from '../../context/authContext';

const width = SIZES.width - SIZES.margin * 2;

const LoginScreen = ({ navigation }) => {

  const { signIn } = React.useContext(AuthContext);
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text
          style={{
            ...FONTS.bigTitle,
            color: COLORS.white,
            textAlign: 'left',
            width: width,
            marginBottom: 88,
          }}
        >
          Welcome to the Store!
        </Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.primary}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.primary}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Button
          text="Sign In"
          style="solid"
          onPress={() => {
            let userData = {
              email: email,
              password: password 
            }
            signIn(userData)
          }}
        />
      </View>
      <View>
        <Text
          style={{
            ...FONTS.fontInfo,
            color: COLORS.white,
            padding: SIZES.padding,
            textAlign: 'center',
            marginTop: 15,
          }}
        >
          Don’t you have an account yet?
        </Text>
        <Button
          text="Create Account"
          style="border"
          fullWidth
          onPress={() => {
            navigation.navigate('CreateAccount')
          }}
        />
        <TouchableOpacity
          onPress={() => {}}
        >
          <Text
            style={{
              ...FONTS.fontInfo,
              color: COLORS.white,
              padding: SIZES.padding,
              textAlign: 'center',
              marginBottom: 15
            }}
          >
            More Info
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </ScrollView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgLight,
    width: SIZES.width,
    paddingHorizontal: SIZES.margin,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  input: {
    width: width,
    ...SIZES.borderActive,
    borderRadius: SIZES.radius,
    ...FONTS.default,
    color: COLORS.primary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    marginBottom: 28
  },
});