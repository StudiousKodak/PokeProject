import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import PokedexScreen from './Screens/PokedexScreen';
import PokemonScreen from './Screens/PokemonScreen';

// Define a stack navigator.
const Stack = createStackNavigator();

// Main app component as a class-based component
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* Define the screens and their respective components. */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Pokedex" component={PokedexScreen} />
          <Stack.Screen name="Pokemon" component={PokemonScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}