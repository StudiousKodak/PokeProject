import React, { Component } from 'react';
import {View, Button, StyleSheet, FlatList, Text} from 'react-native';

export default class PokedexScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokedex: [],
            pokemon: []
        };
    }


    componentDidMount() {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=493`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ pokedex: data.results });
            })    
    }

    pressed(item) {
        fetch(item.url)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ pokemon: data});
            })
            .catch(() => {
                this.setState({ error: "Failed to fetch pokemon data" });
            });

    };

    render() {

        const { pokedex, pokemon } = this.state;

        return (
            
            <View>
                <Text>{pokedex.length}</Text>
                <FlatList 
                    data={pokedex}
                    numColumns={3}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <Button
                            title={item.name}
                            // Navigate to RecipeScreen when a recipe is clicked.
                            onPress={() => { this.pressed, this.props.navigation.navigate('Pokemon', { pokemon: item })}}
                        />
                    )}
                />
            </View>
        );
    }
}