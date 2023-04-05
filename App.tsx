import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActivityScreen from './Screens/Activity';
import ExploreScreen from './Screens/Explore';
import ClosetScreen from './Screens/Closet';
import ScanScreen from './Screens/Scan';
import ShopScreen from './Screens/Shop';
import MainScreen from './Screens/Main';
import React from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import RegisterScreen from './Screens/Auth/Register';
import LoginScreen from './Screens/Auth/Login';
 
const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Register">
        <RootStack.Screen name="Main" component={MainScreen} />
        <RootStack.Screen name="Register" component={RegisterScreen} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Closet" component={ClosetScreen} />
        <RootStack.Screen name="Activity" component={ActivityScreen} />
        <RootStack.Screen name="Explore" component={ExploreScreen} />
        <RootStack.Screen name="Scan" component={ScanScreen} />
        <RootStack.Screen name="Shop" component={ShopScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    secondary: 'light blue',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150.
  },
});
