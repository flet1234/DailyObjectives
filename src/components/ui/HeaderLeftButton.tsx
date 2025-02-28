import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text} from 'react-native';

export const HeaderLeftButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.button}
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        })
      }>
      <Text style={styles.text}>Back</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    height: 'auto',
    width: 70,
    padding: 4,
    paddingHorizontal:10,
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

export default HeaderLeftButton;
