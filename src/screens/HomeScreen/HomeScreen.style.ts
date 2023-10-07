import {StyleSheet} from 'react-native';

const createHomeScreenStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    addTodoContainer: {
      padding: 16,
      alignItems: 'center',
    },
    addButton: {
      backgroundColor: 'green',
      borderRadius: 100,
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
    plusSign: {
      color: 'white',
      fontSize: 40,
    },
    timePickerButton: {
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
    },
  });
};

export default createHomeScreenStyle;
