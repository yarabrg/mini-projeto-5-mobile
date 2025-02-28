import 'react-native-get-random-values'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import EditActivityScreen from './screens/EditActivityScreen';
import ActivityInfoScreen from './screens/ActivityInfoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Sistema Acadêmico' }} 
        />
        <Stack.Screen 
          name="AddActivity" 
          component={AddActivityScreen} 
          options={{ title: 'Nova Atividade' }} 
        />
        <Stack.Screen 
          name="EditActivity" 
          component={EditActivityScreen} 
          options={{ title: 'Editar Atividade' }} 
        />
        <Stack.Screen 
          name="ActivityInfo" 
          component={ActivityInfoScreen} 
          options={{ title: 'Detalhes da Atividade' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
