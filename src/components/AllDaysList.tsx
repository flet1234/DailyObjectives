import {FlatList, Pressable, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../redux/features/daysData/hooks';
import {useEffect, useState} from 'react';
import {DayObject} from '../interfaces-and-types/interfacesAndTypes';
import {useNavigation} from '@react-navigation/native';
import {deleteDay} from '../redux/features/daysData/daysDataSlice';

export default function AllDayList() {
  const [allDays, setAllDays] = useState<DayObject[]>([]);

  const data = useAppSelector(state => state.daysDataReducer.data);

  useEffect(() => {
    setAllDays(data);
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={allDays}
        renderItem={({item}) => (
          <Item
            date={item.date}
            id={item.id}
            notCompletedObjectives={
              item.objectives.filter(objective => objective.completed === false)
                .length
            }
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyHeader}>Empty</Text>
        }
      />
    </SafeAreaView>
  );
}

const Item = ({
  date,
  id,
  notCompletedObjectives,
}: {
  date: string;
  id: string;
  notCompletedObjectives: number;
}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteDay({id}));
  };

  return (
    <Pressable
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate('Day', {id: id, date: date});
      }}>
      <Text style={styles.itemHeader}>{date}</Text>
      <Text style={styles.itemText}>
        {notCompletedObjectives
          ? `${notCompletedObjectives} to solve`
          : 'All done'}{' '}
      </Text>
      <Pressable style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>x</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  listContainer: {
    flex: 1,
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
    backgroundColor: '#2196F3',
  },
  itemHeader: {
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
  emptyHeader: {
    color: '#2196F3',
    fontSize: 20,
    fontWeight: 800,
    textAlign: 'center',
    marginTop: 50,
  },
});
