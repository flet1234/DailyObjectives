import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';

export const HeaderTightButton = ({id, date}: {id: string; date: string}) => {
  const navigation = useNavigation();
  return (
    <Button
      title="Add objectives"
      onPress={() =>
        navigation.navigate('ObjectivesInput', {
          id: id,
          date: date,
        })
      }
    />
  );
};

export default HeaderTightButton;
