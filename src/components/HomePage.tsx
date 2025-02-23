import {Button, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function HomePage() {
  const navigation = useNavigation();
  return (
    <View>
      <Button onPress={() => navigation.navigate('Day', {id:null})} title="New Day" />
      <Button
        onPress={() => navigation.navigate('AllDaysList')}
        title="All days list"
      />
    </View>
  );
}
