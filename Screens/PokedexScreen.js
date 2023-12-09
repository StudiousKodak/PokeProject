import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


export default class PokedexScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pokedex: [],    // holds name and url of pokemon, used in flatlist
            pokemon: null,  // holds basic information on a clicked pokemon
            entry: null,    // holds clicked pokemons pokedex entry from gen 3
            location: null, // holds how to get clicked pokemon
        };
    }

    // called to capitalize first letter of words that can be done through styling
    capitalize(str) {
        return str.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }

    // called to return a boolen value if a string is completely uppercase
    isUpperCase(str) {
        return str === str.toUpperCase();
    }

    // called to return the length of an array, such as types or abilites
    length(aray) {
        count = 0
        for (count in aray) {
        }
        return count
    }

    // called to adjust weight to pounds
    adjustWeight(num) {
        pounds = num / 4.536
        return pounds.toFixed(1)
    }

    // called to adjust height to inches
    adjustHeight(num) {
        inches = num * 3.937
        return inches.toFixed(1)
    }

    // called to deal with multiple types
    multipleTypes(types) {
        all = ''
        for (x in types) {
            if (x == this.length(types)) {
                all = all + types[x].type.name + ''
            }
            else {
                all = all + types[x].type.name + ', '
            }
        }
        return all
    }

    // called to deal with multiple abilites
    multipleAbilities(abilities) {
        all = ''
        for (x in abilities) {
            if (x == this.length(abilities)) {
                all = all + abilities[x].ability.name + ''
            }
            else {
                all = all + abilities[x].ability.name + ', '
            }
        }
        return all
    }

    // called to filter location of capture for gen 1,2,3
    filterLocation(locations) {
        final = []
        for (x in locations) {
            for (i in locations[x].version_details) {
                z = locations[x].version_details[i].version.name
                if (z == 'red' || z == 'blue' || z == 'gold' || z == 'silver' || z == 'ruby' || z == 'sapphire') {   
                    where = locations[x].location_area.name
                    where = where.split('-').join(' ')
                    how = locations[x].version_details[i].encounter_details[0].method.name
                    final = final + z + '\n\t-' + where + '\n\t-' + how + '\n'
                }
            }
        }
        // if there is no place of capture or gift, it must be evolved
        if (this.length(final) == 0) {
            final = 'Evolved'
        }
        return final
    }

    // fetches location of capture for a pokemon selected
    fetchLocation(item) {
        fetch('https://pokeapi.co/api/v2/pokemon/' + item + '/encounters')
            .then(response => { return response.json()})
            .then(data => {
                this.setState({ location: data });
            })
            .catch((error) => { 
                console.error(error); 
            });
    }

    // called to filter the entries for emerald, than filter the entry for optimal display
    filterEntry(entries) {
        temp = ''
        final = ''
        for (x in entries) {
            if ('emerald' == entries[x].version.name) {
                temp = entries[x].flavor_text
                temp = temp.split('\n').join(' ')
                decapitalize = temp.split(' ')
                for (i in decapitalize) {
                    if (this.isUpperCase(decapitalize[i])) {
                        decapitalize[i] = this.capitalize(decapitalize[i])
                    }
                    final = final + decapitalize[i] + ' '
                }
            }
        }
        return final
    }    

    // fetches all of a pokemons pokedex entry
    fetchEntry(item) {
        fetch('https://pokeapi.co/api/v2/pokemon-species/' + item)
            .then(response => { return response.json()})
            .then(data => {
                this.setState({ entry: data });
            })
            .catch((error) => { 
                console.error(error); 
            }); 
    }

    // fetches a specific pokemons details
    fetchPokemon(item) {
        fetch(item)
            .then(response => { return response.json()})
            .then(data => {
                this.setState({ pokemon: data });
            })
            .catch((error) => { 
                console.error(error); 
            })   
    }

    // fetches basic pokemon data (name, url), populates flatlist of custom buttons
    genSelect(picker) {
        fetch(`https://pokeapi.co/api/v2/pokemon?` + picker)
            .then(response => { return response.json()})
            .then(data => {
                this.setState({ pokedex: data.results });
            })  
            .catch((error) => { 
                console.error(error); 
            });       
    }


    render() {

        const {pokedex, pokemon, entry, location} = this.state;

        return (
            
            <View style = {styles.screen}>
                {/* container for drop down picker */}
                <View style = {styles.dropDownContainer}>
                    {/* dropdown select for generation will populate flatlist*/}
                    <RNPickerSelect 
                        onValueChange = {(value) => {this.genSelect(value)}}
                        placeholder={{
                            label: 'Select a gen...',
                            value: null,
                        }}
                        style={styles.pickerItems}
                        items = {[
                            {label: 'Gen 1', value: 'limit=151'},
                            {label: 'Gen 2', value: 'limit=100&offset=151'},
                            {label: 'Gen 3', value: 'limit=135&offset=251'}
                        ]}
                    />       
                </View>   
                {/* container for rest of screen to display side by side */}
                <View style = {styles.pokedex}>    
                    {/* container for pokedex flatlist of buttons (left side of screen) */}
                    <View style = {styles.pokedexContainer}>
                        {/* flat list of custom buttons, when pressed will fetch the specific pokemons data using the url or name*/}
                        <FlatList 
                            data = {pokedex}
                            numColumns = {1}
                            keyExtractor = {(item) => item.name}
                            renderItem = {({ item }) => (
                                <View>
                                    <TouchableOpacity onPress = {() => {this.fetchPokemon(item.url), this.fetchEntry(item.name), this.fetchLocation(item.name)}}>
                                        <Text style = {styles.flatlistName}>{this.capitalize(item.name)}</Text>
                                    </TouchableOpacity>
                                </View>    
                            )}
                        />
                        
                    </View>

                    {/* container for pokedex entry (right side of screen) */}
                    <View style = {styles.pokemonContainer}>
                    {pokemon && (
                        <View>
                            {/* container for name and id */}
                            <View style = {styles.nameContainer}>
                                <Text style = {styles.name}>#{pokemon.id}{'\t\t'}{pokemon.name}</Text>
                            </View>

                            {/* container for sprites */}
                            <View style = {styles.spriteContainer}>
                                <Image source = {{ uri: pokemon.sprites.front_default }} style = {styles.sprite} />
                                <Image source = {{ uri: pokemon.sprites.front_shiny }} style = {styles.sprite} />
                            </View> 
                            
                            {/* container for basic pokemon information */}
                            <View style = {styles.basicInfoContainer}>
                                <Text style = {styles.pokeDetails}>Height: {this.adjustHeight(pokemon.height)}in{'   '}Weight: {this.adjustWeight(pokemon.weight)}lbs</Text>
                                <Text style = {styles.pokeDetails}>Types: {this.multipleTypes(pokemon.types)}</Text> 
                                <Text style = {styles.pokeDetails}>Abilities: {this.multipleAbilities(pokemon.abilities)}</Text>
                            </View>    
                        </View>
                    )}    
                    {/* container for pokemons pokedex entry */}    
                    {entry && (
                        <View style = {styles.entryContainer}>
                            <Text style = {styles.entry}>{this.filterEntry(entry.flavor_text_entries)}</Text>
                        </View>
                    )}  

                    {/* container for pokemons method of capture */}    
                    {location && (
                        <View>
                            <Text style = {styles.title}>Location of Capture:</Text>
                            <View style = {styles.entryContainer}>
                                <ScrollView style = {styles.scrollView}>
                                    <Text style = {styles.location}>{this.capitalize(this.filterLocation(location))}</Text>
                                </ScrollView>  
                            </View>    
                        </View>  
                    )}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // whole screen
    screen: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FB1B1B'
    },
    // top container to hold drop down list of gens
    dropDownContainer: {
        padding: 20,
        borderBottomWidth: 1
    },
    // screen below drop down, has two sides
    pokedex: {
        flexDirection: 'row',
        backgroundColor: '#FB1B1B'
    },
    // flatlist side 
    pokedexContainer: {
        flex: .3,
        borderRightWidth: 2,
        marginRight: 25
    },
    // flatlist items
    flatlistName:{
        color: 'white',
        fontSize: 16,
        padding: 5
    },
    // information side
    pokemonContainer: {
        flex: .65,
        justifyContent: 'center'
    },
    // base info (name and id)
    nameContainer: {
        borderBottomWidth: 2,
        height: 50,
        marginBottom: 10,
    },
    // name of pokemon
    name: {
        fontSize: 20,
        marginBottom: 20,
        textTransform: 'capitalize',
        color: 'white'
    },
    // container for sprites
    spriteContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 100,
        marginBottom: 10,
        borderWidth: 3
    },
    // sprites
    sprite: {
        width: 100,
        height: 100,
        marginBottom: 20,
        flex: .5
    },
    // container for pokemon information
    basicInfoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    // pokemon information
    pokeDetails: {
        textTransform: 'capitalize',
        color: 'white',
        lineHeight: 30
    },
    // pokemon entry container
    entryContainer: {
        borderWidth: 2,
        padding: 5
    },
    // title of location
    title: {
        fontSize: 14,
        textTransform: 'capitalize',
        color: 'white',
        lineHeight: 30
    },
    // scroll view for location
    scrollView: {
        height: 120,
        flexGrow: 0
    },
    // entry
    entry: {
        color: 'white'
    },
    // caputure location
    location: {
        color: 'white',
        textTransform: 'capitalize',
        fontSize: 12
    }
})