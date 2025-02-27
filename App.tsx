import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomePage from './src/components/HomePage';
import Day from './src/components/Day';
import Settings from './src/components/Settings';
import AllDayList from './src/components/AllDaysList';
import {persistor, store} from './src/redux/store';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ObjectivesInput from './src/components/ObjectivesInput';
import {PersistGate} from 'redux-persist/integration/react';
import Loading from './src/components/ui/Loading';
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
      <PersistGate loading={<Loading />} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#2196F3',
                },
                headerTintColor: '#f5f5f5',
                headerTitleStyle: {
                  fontWeight: 700,
                  fontSize: 18,
                },
                headerTitleAlign: 'center',
              }}>
              <Stack.Screen
                name="Home"
                component={HomePage}
                options={{
                  title: 'Daily Objectives',
                }}
              />
              <Stack.Screen
                name="Day"
                component={Day}
                options={{headerShown:false}}
              />
              <Stack.Screen
                name="AllDaysList"
                component={AllDayList}
                options={{title: 'All saved days'}}
              />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen
                name="ObjectivesInput"
                component={ObjectivesInput}
                options={{presentation: 'modal'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
