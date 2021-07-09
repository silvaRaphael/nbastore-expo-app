import { StatusBar } from 'expo-status-bar';
import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/loginScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductScreen from './src/screens/ProductScreen';
import CartScreen from './src/screens/CartScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AddAddressScreen from './src/screens/AddAddressScreen';
import AddCardScreen from './src/screens/AddCardScreen';

import AuthContext from './src/context/authContext';

const Stack = createStackNavigator();

export default function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [logged, setLogged] = React.useState(false);

  const authContext = React.useMemo(() => ({
    signIn: async ({ email, password }) => {

      let api_users = await AsyncStorage.getItem('api_users')
      api_users = JSON.parse(api_users) || []

      const userEmail = api_users.filter(item => item.email == email)

      if(userEmail.length > 0) {

        if(userEmail[0].email == email &&
          userEmail[0].password == password) {

          let item = {
            userId: userEmail[0].userId,
            name: userEmail[0].name,
            email: userEmail[0].email,
          }

          await AsyncStorage.setItem('userInfo', JSON.stringify(item));
          
          setLogged(true)
        } else if (userEmail[0].email == email &&
          userEmail[0].password != password) {
            console.log('Password is Incorrect!')
          }
      } else {
        console.log('User Not Exists!')
      }
    },
    signUp: async ({ name, email, password }) => {

      let api_users = await AsyncStorage.getItem('api_users')
      api_users = JSON.parse(api_users) || []

      const userEmail = api_users.filter(item => item.email == email)

      if(userEmail.length == 0) {

        let d = new Date()
        let r = d.getTime()
        
        let item = {
          userId: r.toString(),
          name: name,
          email: email,
          password: password
        }

        api_users.push(item);

        await AsyncStorage.setItem('api_users', JSON.stringify(api_users));
        
        setLogged(true)
      } else {
        console.log('This Email is Already in use!')
      }
    },
    signOut: async () => {

      await AsyncStorage.removeItem('userInfo');

      setLogged(false)
    }
  }), []);

  React.useEffect(() => {
    async function getDadosUsuarioLogin() {

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if(userInfo != null) {
        setLogged(true)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    }
    getDadosUsuarioLogin();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      {!isLoading && (
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            {logged ? (
              <Stack.Screen name="AppRoute" component={AppRoute} />
            ) : (
              <Stack.Screen name="AuthRoute" component={AuthRoute} />
            )}
          </Stack.Navigator>
          <StatusBar style="light" />
        </NavigationContainer>
      )}
    </AuthContext.Provider>
  );
}

const AuthRoute = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
    </Stack.Navigator>
  )
}

const AppRoute = () => {

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
    </Stack.Navigator>
  )
}
