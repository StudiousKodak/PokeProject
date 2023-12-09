import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import PokedexScreen from './Screens/PokedexScreen';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName = 'Home'>
          <Stack.Screen options = {{ headerShown: false }} name = 'Home' component = {HomeScreen} />
          <Stack.Screen options = {{ headerStyle: {backgroundColor: '#FB1B1B'}, headerTintColor: 'white', headerTitleStyle: {} }}name = 'Pokedex' component = {PokedexScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}