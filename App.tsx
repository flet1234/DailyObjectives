import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomePage from './src/components/HomePage';
import Day from './src/components/Day';
import Settings from './src/components/Settings';
import AllDayList from './src/components/AllDaysList';
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
type RootStackParamList = {
  Home: undefined;
  Day: undefined;
  AllDaysList: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Day" component={Day} />
        <Stack.Screen name="AllDaysList" component={AllDayList} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
