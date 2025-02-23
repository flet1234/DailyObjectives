import {useEffect, useState} from 'react';
import {Modal, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {stringToObjectives} from '../utils/objectiveTransmorf';

export default function ObjectivesInput({
  objectivesString,
  modalVisible,
  setModalVisible,
  setObjectives,
}: {
  objectivesString: string;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setObjectives: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [userInput, setUserInput] = useState(objectivesString);

    console.log('setModalVisible', modalVisible);
    
    
  useEffect(() => {
    setObjectives(stringToObjectives(userInput));
      }, [userInput]);
    
  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}>
          <Text>Hello Modal</Text>
          {/* <TextInput
            style={{fontSize: 20}}
            value={userInput}
            placeholder="Copy or input your objectives one by one divided by space"
            onChangeText={setUserInput}
          /> */}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
