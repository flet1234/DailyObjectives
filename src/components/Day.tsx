/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {Modal, Text, TextInput, View} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {addNewDay} from '../redux/features/dasyData/daysDataSlice';
import {useAppDispatch, useAppSelector} from '../redux/features/dasyData/hooks';
import uuid from 'react-native-uuid';

export default function Day({ route }: { route: { params: { id: string | null, date?: string } } }) {
  const [objectives, setObjectives] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const objectivesString = useRef('');

  const {id, date} = route.params;
  const data = useAppSelector(state => state.daysDataReducer.data);
  const dispatch = useAppDispatch();
  console.log('objectives', objectives);

  useEffect(() => {
    if (id === null && objectives.length === 0) {
      console.log('====================================');
      console.log('1');
      console.log('====================================');
      setModalVisible(true);
    } else if (id === null && objectives.length > 0) {
      dispatch(
        addNewDay({
          date: date,
          id: uuid.v4(),
          objectives: objectives,
        }),
      );
      console.log('====================================');
      console.log(data);
      console.log('====================================');
    } else {
    }
  }, [id, objectives]);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
      <Text style={{textAlign: 'center'}}>Day</Text>
    </SafeAreaView>
  );
}
