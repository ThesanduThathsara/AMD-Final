import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TaskProvider } from './context/TaskContext';
import TaskListScreen from './screens/TaskListScreen';
import TaskFormScreen from './screens/TaskFormScreen';
import { COLORS } from './constants/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // TaskProvider wraps the whole navigator so both screens can read/write tasks
    <TaskProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="TaskList"
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.card },
            headerTitleStyle: { color: COLORS.text, fontWeight: '700' },
            headerShadowVisible: false,
            headerTintColor: COLORS.primary,
          }}
        >
          <Stack.Screen
            name="TaskList"
            component={TaskListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="TaskForm" component={TaskFormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}
