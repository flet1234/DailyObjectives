import {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.noteView}>
          <Text style={styles.noteText}>Copy or input your objectives</Text>
          <Text style={styles.noteText}>Each should start with a new line</Text>
        </View>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            multiline
            value={userInput}
            onChangeText={setUserInput}
          />
        </View>
        <Button onPress={handleSubmit} title="Create" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    width: '100%',
  },
  noteView: {
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  noteText: {
    color: '#F5F5F5',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 500,
  },
  textInputView: {
    width: '100%',
    minHeight: 100,
    backgroundColor: '#E3F2FD',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
  },
  textInput: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 500,
    width: '80%',
    margin: 'auto',
  },
});
