import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../redux/features/daysData/hooks';
import {useNavigation} from '@react-navigation/native';
import {DayObject, Objective} from '../interfaces-and-types/interfacesAndTypes';
import {
  deleteObjective,
  editOneObjective,
} from '../redux/features/daysData/daysDataSlice';
import HeaderRightButton from './ui/HeaderRightButton';
import HeaderLeftButton from './ui/HeaderLeftButton';

export default function Day({
  route,
}: {
  route: {params: {id: string; date: string}};
}) {
  const [dayObjectives, setDayObjectives] = useState<Objective[]>([]);
  const {id, date} = route.params;
  const data = useAppSelector(state => state.daysDataReducer.data);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const thisDay = data.find((day: DayObject) => day.id === id);

    if (thisDay) {
      setDayObjectives(thisDay.objectives);
    }
  }, [id, data]);

  useEffect(() => {
    const headerRight = () => <HeaderRightButton id={id} date={date} />;
    const headerLeft = () => <HeaderLeftButton />;

    navigation.setOptions({
      headerRight,
      headerLeft,
    });
  }, [navigation, dayObjectives, id, date]);

  const handleDelete = (item: Objective) => {
    dispatch(deleteObjective({id: id, objectiveId: item.id}));
    setDayObjectives(prev =>
      prev?.filter(objective => objective.id !== item.id),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderLeftButton />
        <Text style={styles.headerText}>{date}</Text>
        <HeaderRightButton id={id} date={date} />
      </View>
      <Text style={styles.hintText}>
        Press to toggle completion, Hold to edit objective
      </Text>
      <FlatList
        removeClippedSubviews={false}
        style={styles.listContainer}
        data={dayObjectives}
        renderItem={({item}) => (
          <Item item={item} id={id} handleDelete={() => handleDelete(item)} />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>There is no objectives</Text>}
      />
    </SafeAreaView>
  );
}

const Item = ({
  item,
  id,
  handleDelete,
}: {
  item: Objective;
  id: string;
  handleDelete: () => void;
}) => {
  const [objective, setObjective] = useState<Objective>(item);
  const [objectiveTitle, setObjectiveTitle] = useState(item.title);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();

  const handleShortObjectivePress = () => {
    // Short press change completion status
    dispatch(
      editOneObjective({
        id: id,
        objective: {...objective, completed: !objective.completed},
      }),
    );
    setObjective({...objective, completed: !objective.completed});
  };

  const handleLongObjectivePress = () => {
    setEditMode(true);
  };

  const handleTitleEdit = () => {
    dispatch(
      editOneObjective({
        id: id,
        objective: {...objective, title: objectiveTitle},
      }),
    );
    setEditMode(false);
  };

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...styles.itemContainer,
        backgroundColor: objective.completed ? '#4CAF50' : '#2196F3',
      }}>
      <Pressable
        hitSlop={20}
        style={styles.itemTextContainer}
        onPress={handleShortObjectivePress}
        onLongPress={handleLongObjectivePress}>
        {editMode ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <TextInput
                style={styles.itemInput}
                value={objectiveTitle}
                onEndEditing={handleTitleEdit}
                autoFocus
                onChangeText={text => setObjectiveTitle(text)}
                selectionColor={'#f5f5f5'}
              />
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        ) : (
          <Text style={styles.itemText}>{objectiveTitle}</Text>
        )}
      </Pressable>
      <Pressable style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>x</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    height: '7.3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingBlock: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 700,
    color: '#f5f5f5',
  },
  hintText: {
    color: '#2196F3',
    textAlign: 'center',
    marginTop: 4,
    fontSize: 16,
    fontWeight: 500,
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom:10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 4,
    borderRadius: 15,
    borderColor: '#0D47A1',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  itemTextContainer: {
    width: '90%',
  },
  itemInput: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: 500,
  },
  itemText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: 500,
  },
  button: {
    width: '10%',
    height: 33,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderWidth: 4,
    borderRadius: 15,
    borderColor: '#E57373',
  },
  buttonText: {
    flex: 6,
    color: '#E57373',
    fontSize: 16,
    fontWeight: 500,
  },
});
