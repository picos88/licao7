import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput, Headline, Subheading, Caption, Badge, Avatar, Button as MaterialButton, Card, Title, Paragraph, Divider, BottomNavigation } from 'react-native-paper';

import Axios from 'axios';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const NewPokemon = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState(0);
    const [isFireSelected, setFireSelection] = useState(false);
    const [isWaterSelected, setWaterSelection] = useState(false);
    const [isNormalSelected, setNormalSelection] = useState(false);
    const [isFlyingSelected, setFlyingSelection] = useState(false);
    const [isPoisonSelected, setPoisonSelection] = useState(false);
    const [isGroundSelected, setGroundSelection] = useState(false);
    const [isGrassSelected, setGrassSelection] = useState(false);
    const [isRockSelected, setRockSelection] = useState(false);

    const navigation = useNavigation();

    function insertPokemon() {
        Axios.post("http://10.0.2.2:3000/data/", 
        {
            "id" : number,
            "name": {
                "english" : name
            },
            "type" : getPokemonType(),
            "base": {},
        }).then((res) => {
            alert("Novo Pokémon de id #" + number + " inserido.")
            navigation.navigate("Pokedex")
        }).catch((erro) => alert("Erro ao inserir Pokémon #" + number + ": " + erro))
    }

    function getPokemonType() {
        let types = []
        if(isFireSelected) types.push("Fire")
        if(isFlyingSelected) types.push("Flying")
        if(isGroundSelected) types.push("Ground")
        if(isNormalSelected) types.push("Normal")
        if(isPoisonSelected) types.push("Poison")
        if(isRockSelected) types.push("Rock")
        if(isWaterSelected) types.push("Water")
        if(isGrassSelected) types.push("Grass")
        return types
    }

    return (
        <View>
            <TextInput
                mode='outlined'
                style={styles.input}
                textContentType='creditCardNumber'
                label="Número"
                value={number}
                onChangeText={number => setNumber(number)}
            />
            <TextInput
                style={styles.input}
                mode='outlined'
                label="Nome"
                value={name}
                onChangeText={name => setName(name)}
            />

            <Headline style={styles.headline}>Tipos:</Headline>

            <View style={styles.typeItem}>
                <Title>
                    <CheckBox
                        value={isFireSelected}
                        onValueChange={setFireSelection}
                        style={styles.checkbox}
                    />
                    Fire
                </Title>
            </View>

            <View style={styles.typeItem}>
                <Title>
                    <CheckBox
                        value={isWaterSelected}
                        onValueChange={setWaterSelection}
                        style={styles.checkbox}
                    />
                    Water
                </Title>
            </View>

            <View style={styles.typeItem}>
                <Title>
                    <CheckBox
                        value={isNormalSelected}
                        onValueChange={setNormalSelection}
                        style={styles.checkbox}
                    />
                    Normal
                </Title>
            </View>

            <View style={styles.typeItem}>
                <Title>
                    <CheckBox
                        value={isFlyingSelected}
                        onValueChange={setFlyingSelection}
                        style={styles.checkbox}
                    />
                    Flying
                </Title>
            </View>

            <View style={styles.typeItem}>
                <Title>
                    <CheckBox
                        value={isPoisonSelected}
                        onValueChange={setPoisonSelection}
                        style={styles.checkbox}
                    />
                    Poison
                </Title>
            </View>

            <View style={styles.typeItem}>
                <Title>
                    <CheckBox
                        value={isGroundSelected}
                        onValueChange={setGroundSelection}
                        style={styles.checkbox}
                    />
                    Ground
                </Title>
            </View>

            <View style={styles.typeItem}>
                <Title>
                    <CheckBox
                        value={isRockSelected}
                        onValueChange={setRockSelection}
                        style={styles.checkbox}
                    />
                    Rock
                </Title>
            </View>

            <View style={styles.typeItem}>
                <Title>
                    <CheckBox
                        value={isGrassSelected}
                        onValueChange={setGrassSelection}
                        style={styles.checkbox}
                    />
                    Grass
                </Title>
            </View>

            <MaterialButton mode="contained"
                onPress={() => insertPokemon() }> Adicionar Pokémon </MaterialButton>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    headline: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    checkbox: {
        alignSelf: "baseline",
    },
    typeItem: {
    }
})

export default NewPokemon;