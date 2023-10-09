import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import TodoDetailScreen from '../screens/TodoDetailScreen/TodoDetailScreen';
import TodoEditScreen from '../screens/TodoEditScreen/TodoEditScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TodoDetailScreen"
        component={TodoDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TodoEditScreen"
        component={TodoEditScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
