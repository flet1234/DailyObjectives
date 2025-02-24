import {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch} from '../redux/features/daysData/hooks';
import {
  addNewDay,
  addObjectives,
} from '../redux/features/daysData/daysDataSlice';
import uuid from 'react-native-uuid';
import {stringToObjectives} from '../utils/objectiveTransform';
import {useNavigation} from '@react-navigation/native';

export default function ObjectivesInput({
  route,
}: {
  route: {
    params: {
      id: string | null;
      date: string;
    };
  };
}) {
  const [userInput, setUserInput] = useState('');
  const {id, date} = route.params;
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (id === null) {
      const newId = uuid.v4();
      dispatch(
        addNewDay({
          id: newId,
          date: date,
          objectives: stringToObjectives(userInput),
        }),
      );
      navigation.navigate('Day', {id: newId, date: date});
    } else if (id) {
      dispatch(
        addObjectives({
          id: id,
          date: date,
          objectives: stringToObjectives(userInput),
        }),
      );
      navigation.navigate('Day', {id: id, date: date});
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'grey',
        }}>
        <Text>
          Hello {id} {date}
        </Text>
        <TextInput
          style={{fontSize: 16}}
          multiline
          value={userInput}
          placeholder="Copy or input your objectives each should start with new line, and then press Submit Button"
          onChangeText={setUserInput}
        />
        <Button onPress={handleSubmit} title="Submit" />
      </View>
    </SafeAreaView>
  );
}
