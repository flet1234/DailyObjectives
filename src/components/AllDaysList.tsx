import {Button, FlatList, Pressable, Text, View} from 'react-native';
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
    <SafeAreaView>
      <View>
        <Text>All days</Text>
        <FlatList
          data={allDays}
          renderItem={({item}) => (
            <Item
              date={item.date}
              id={item.id}
              notCompletedObjectives={
                item.objectives.filter(
                  objective => objective.completed === false,
                ).length
              }
            />
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text>There is no saved days</Text>}
        />
      </View>
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
      onPress={() => {
        navigation.navigate('Day', {id: id, date: date});
      }}>
      <View>
        <Text>{date}</Text>
        <Text>
          {notCompletedObjectives
            ? `${notCompletedObjectives} to solve`
            : 'All done'}{' '}
        </Text>
        <Button onPress={handleDelete} title="X"/>
      </View>
    </Pressable>
  );
};
