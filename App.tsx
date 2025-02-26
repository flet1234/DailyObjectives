import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomePage from './src/components/HomePage';
import Day from './src/components/Day';
import Settings from './src/components/Settings';
import AllDayList from './src/components/AllDaysList';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ObjectivesInput from './src/components/ObjectivesInput';
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
type RootStackParamList = {
  Home: undefined;
  Day: {id: string; date: string};
  AllDaysList: undefined;
  Settings: undefined;
  ObjectivesInput: {id: string | null; date: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen
              name="Day"
              component={Day}
              options={({route}) => ({
                title: 'Day' + ' ' + route.params.date,
              })}
            />
            <Stack.Screen name="AllDaysList" component={AllDayList} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen
              name="ObjectivesInput"
              component={ObjectivesInput}
              options={{presentation: 'modal'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
