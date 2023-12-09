import React, { Component } from 'react';
import {View, StyleSheet, ImageBackground, TouchableOpacity, Text} from 'react-native';
import background from '../assets/pokedexCover.png'


export default class HomeScreen extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <ImageBackground source = {background} resizeMode = 'contain' style = {styles.image}>
                    <View style = {styles.button}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Pokedex')}>
                            <Text style = {styles.titleStyle}>Enter</Text>
                        </TouchableOpacity>
                    </View>    
                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    // screen
    container: {
        flex: 1,
        backgroundColor: '#db1c2c'
    },
    // bg image
    image: {
        flex: 1,
    },
    // touchable opacity button
    button: {
        position: 'absolute',
        bottom: 148,
        left: 75,
    },
    // touchable text style
    titleStyle: {
        color: '#fac30d',
        fontWeight: '600',
        fontSize: 20,
        fontStyle: 'italic'
    }
})