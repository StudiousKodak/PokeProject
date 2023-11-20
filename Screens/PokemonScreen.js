import React, { Component } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default class PokedexScreen extends Component {
    
    render() {
        const { pokemon } = this.props.route.params;       

        return(
            <View>
                <Text>Name: {pokemon.name}</Text>
                <Text>{pokemon.length}</Text>
                <Text>Height: {pokemon.height}</Text>
            </View>
        );
    }
}