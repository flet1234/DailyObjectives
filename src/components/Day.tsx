import {Button, FlatList, Pressable, Text, TextInput, View} from 'react-native';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../redux/features/daysData/hooks';
import {useNavigation} from '@react-navigation/native';
import {Objective} from '../interfaces-and-types/interfacesAndTypes';
import {
  deleteObjective,
  editOneObjective,
} from '../redux/features/daysData/daysDataSlice';
import HeaderTightButton from './ui/HeaderTightButton';

export default function Day({
  route,
}: {
  route: {params: {id: string | null; date: string}};
}) {
  const [dayObjectives, setDayObjectives] = useState<Objective[]>([]);
  const {id, date} = route.params;
  const data = useAppSelector(state => state.daysDataReducer.data);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      const thisDay = data.filter(day => day.id === id);
      setDayObjectives(thisDay[0].objectives);
    }
  }, [id, data]);

  useEffect(() => {
    if (id === null) {
      navigation.navigate('ObjectivesInput', {id: id, date: date});
    }
  }, [id, date, navigation]);

  useEffect(() => {
    if (id) {
      const headerRight = () => <HeaderTightButton id={id} date={date} />;

      navigation.setOptions({
        headerRight,
      });
    }
  }, [navigation, dayObjectives, id, date]);

  const handleDelete = (item: Objective) => {
    if (id) {
      dispatch(deleteObjective({id: id, objectiveId: item.id}));
      setDayObjectives(prev =>
        prev?.filter(objective => objective.id !== item.id),
      );
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
      <Text style={{textAlign: 'center'}}>Day</Text>
      {id && (
        <FlatList
          data={dayObjectives}
          renderItem={({item}) => (
            <Item item={item} id={id} handleDelete={() => handleDelete(item)} />
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text>There is no objectives</Text>}
        />
      )}
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
      style={{
        margin: 2,
        backgroundColor: objective.completed ? 'green' : 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Pressable
        onPress={handleShortObjectivePress}
        onLongPress={handleLongObjectivePress}>
        {editMode ? (
          <TextInput
            value={objectiveTitle}
            onEndEditing={handleTitleEdit}
            onChangeText={text => setObjectiveTitle(text)}
          />
        ) : (
          <Text>{objectiveTitle}</Text>
        )}
      </Pressable>
      <Button onPress={handleDelete} title={'X'} />
    </View>
  );
};
