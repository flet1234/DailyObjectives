import { StyleSheet, Text, Pressable, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomePage() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2196F3" />
      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate('ObjectivesInput', {
            id: null,
            date: new Date().toLocaleDateString(),
          })
        }>
        <Text style={styles.text}>New objectives for today</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('AllDaysList')}>
        <Text style={styles.text}>All days list</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#2196F3',
    width: '35%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderWidth: 4,
    borderRadius: 15,
    borderColor: '#0D47A1',
    boxShadow: 'rgba(0, 0, 255, 0.3) 0px 2px 4px',
  },
  text: {
    color: '#F5F5F5',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 500,
  },
});
