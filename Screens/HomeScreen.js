import React, { Component } from 'react';
import {View, Button, StyleSheet} from 'react-native';

export default class HomeScreen extends Component {

    render() {
        return (
            <View>
                <Button title="Enter Pokedex" onPress={() => this.props.navigation.navigate('Pokedex')}/>
            </View>
        );
    }
}