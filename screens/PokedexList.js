import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

import { useNavigation, useRoute, useFocusEffect, useIsFocused   } from '@react-navigation/native';
import { Appbar, Headline, Subheading, Caption, Badge, Avatar, Button as MaterialButton, Card, Title, Paragraph, Divider, BottomNavigation } from 'react-native-paper';

import Axios from 'axios';

const PokedexList = (props) => {

  function getAllPokemon() {
    Axios.get("http://10.0.2.2:3000/data?_sort=id").then((res) => {
      setPokemonList(res.data)
    }).catch((erro) => alert("Erro ao requisitar os Pokémon: " + erro))
  }

  function deletePokemon(id) {
    Alert.alert(
      "Deletar Pokémon",
      "Tem certeza que deseja deletar o Pokémon #" + id + "?",
      [
        { text: "Cancelar" },
        {
          text: "Deletar", onPress: () =>
            Axios.delete("http://10.0.2.2:3000/data/" + id).then((res) => {
              alert("Pokémon deletado!");
              getAllPokemon();
            }).catch((erro) => alert("Erro ao excluir Pokémon #" + id + ": " + erro))
        }
      ]
    );
  }

  function goToEditPokemon(item) {
    navigation.navigate("EditPokemon", { item })
  }

  const [pokemonList, setPokemonList] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();
  const isVisible = useIsFocused();

  useEffect(() => {
    if(isVisible) {
      getAllPokemon();
    }
  }, [isVisible])

  return (
    <View>

      <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }}>

        <MaterialButton mode="contained" onPress={() => navigation.navigate("NewPokemon")}
          color={'green'}
          style={{ marginVertical: 15 }} >
          <Text style={{ fontSize: 15, color: "white" }}>Cadastrar novo Pokémon</Text>
        </MaterialButton>

      </View>

      <FlatList
        style={{ paddingStart: 15, paddingEnd: 20, paddingBottom: 20 }}
        numColumns={2}
        keyExtractor={(item, index) => item.id.toString()}
        data={pokemonList}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", marginBottom: 5 }}>

            <View style={styles.container}>
              <Badge size={40}>#{item.id}</Badge>
              <Image source={{ uri: "https://cdn.traction.one/pokedex/pokemon/" + item.id + ".png" }} resizeMode="contain" style={{ width: 200, height: 160 }} />
              <Headline>{item.name.english}</Headline>
              <Divider />
              <Paragraph>{item.type?.join(' / ')}</Paragraph>
              <MaterialButton 
                mode="contained" 
                style={{ marginBottom: 5, marginTop: 10 }}
                onPress={() => goToEditPokemon(item)}>Editar
              </MaterialButton>
              <MaterialButton 
                mode="outlined" 
                color='red'
                onPress={() => deletePokemon(item.id)}>Deletar
              </MaterialButton>
            </View>
          </View>

        )} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: '50%',
    padding: 20,
    marginLeft: 5,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  subcontainer: {
    minWidth: 250,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },

})

export default PokedexList;