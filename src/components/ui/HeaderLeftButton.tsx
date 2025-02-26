import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';

export const HeaderLeftButton = () => {
  const navigation = useNavigation();
  return (
    <Button
      title="Go Home"
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        })
      }
    />
  );
};

export default HeaderLeftButton;
