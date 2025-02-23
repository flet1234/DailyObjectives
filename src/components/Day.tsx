import {Text, View} from 'react-native';
import uuidValidator from '../utils/uuidValidator';
import {useEffect} from 'react';

export default function Day({route}: {route: {params: {id: string | null}}}) {
  const {id} = route.params;

  useEffect(() => {
    if (id === null) {
      // create new objectives
    } else if (uuidValidator(id)) {
      // load objectives
    }
  }, [id]);

  return (
    <View>
      <Text>Day</Text>
    </View>
  );
}
