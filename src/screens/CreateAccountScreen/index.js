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

const CreateAccountScreen = ({ navigation }) => {

  const { signUp } = React.useContext(AuthContext);
  
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [msg, setMsg] = React.useState(null);
  
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
          Enjoy right now!
        </Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.primary}
          placeholder="Name"
          onChangeText={text => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.primary}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={[styles.input, { marginBottom: 70 }]}
          placeholderTextColor={COLORS.primary}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Text
          style={{
            ...FONTS.fontInfo,
            color: COLORS.white,
            padding: SIZES.padding,
            textAlign: 'center',
            display: !msg ? 'none' : 'flex'
          }}
        >
          {msg}
        </Text>
        <Button
          text="Create Account"
          style="solid"
          onPress={() => {
            let userData = {
              name: name,
              email: email,
              password: password
            }
            signUp(userData)
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Login') }}
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
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </ScrollView>
  );
}

export default CreateAccountScreen;

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