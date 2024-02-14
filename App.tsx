import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import CreateEditScreen from './src/screens/create-edit-screen.tsx';
import TaskScreenScreen from './src/screens/task-screen-screen.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskList">
          <Stack.Screen
            name="TaskScreenScreen"
            component={TaskScreenScreen}
            options={{title: 'Task List'}}
          />
          <Stack.Screen
            name="CreateEditScreen"
            component={CreateEditScreen}
            options={{title: 'Add/Edit Task'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
