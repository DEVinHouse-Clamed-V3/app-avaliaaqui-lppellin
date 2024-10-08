import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

import Intro from './src/pages/Intro';
import AvaliaProduto from './src/pages/AvaliaProduto';
import ListaProdutos from './src/pages/ListaProdutos';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Intro" >

        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{ header: () => <></> }}
        />

        <Stack.Screen
          name="AvaliaProduto"
          component={AvaliaProduto}
          options={{ header: () => <></> }}
        />

        <Stack.Screen
          name="ListaProdutos"
          component={ListaProdutos}
          options={{ header: () => <></> }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
