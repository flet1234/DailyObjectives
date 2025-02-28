import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text} from 'react-native';

export const HeaderRightButton = ({id, date}: {id: string; date: string}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.button}
      onPress={() =>
        navigation.navigate('ObjectivesInput', {
          id: id,
          date: date,
        })
      }>
      <Text style={styles.text}>+</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    height: 'auto',
    width: 40,
    marginLeft: 40,
    padding: 4,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#0D47A1',
    boxShadow: 'rgba(0, 0, 255, 0.3) 0px 2px 4px',
  },
  text: {
    color: '#F5F5F5',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 500,
  },
});

export default HeaderRightButton;
