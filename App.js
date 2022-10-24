import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PokedexList from './screens/PokedexList';
import NewPokemon from './screens/NewPokemon';
import EditPokemon from './screens/EditPokemon';

const App = function () {

  const Stack = createStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pokedex" component={PokedexList} />
        <Stack.Screen name="NewPokemon" component={NewPokemon} options={{ title: 'Novo Pokémon' }} />
        <Stack.Screen name="EditPokemon" component={EditPokemon} options={{ title: 'Editar Pokémon' }} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App;