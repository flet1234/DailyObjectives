import {Button, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomePage() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Button
          onPress={() =>
            navigation.navigate('ObjectivesInput', {
              id: null,
              date: new Date().toLocaleDateString(),
            })
          }
          title="New objectives for today"
        />
        <Button
          onPress={() => navigation.navigate('AllDaysList')}
          title="All days list"
        />
      </View>
    </SafeAreaView>
  );
}
