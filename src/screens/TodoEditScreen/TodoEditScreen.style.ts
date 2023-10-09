import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

const createTodoEditScreenStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.BACKGROUND,
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 10,
      color: Colors.BLACK,
      backgroundColor: Colors.LIGHT_GREY,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.BROWN,
      padding: 2,
    },
    description: {
      fontSize: 24,
      color: Colors.BLACK,
      textAlign: 'center',
      margin: 10,
      backgroundColor: Colors.LIGHT_GREY,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.BROWN,
      padding: 2,
    },
    time: {
      fontSize: 20,
      color: Colors.BLACK,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 10,
      backgroundColor: Colors.LIGHT_GREY,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.BROWN,
      padding: 2,
    },
    customHeader: {
      backgroundColor: Colors.BACKGROUND,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    timePickersContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    timePickerButton: {
      padding: 10,
      borderWidth: 3,
      borderColor: Colors.BROWN,
      borderRadius: 5,
      backgroundColor: Colors.LIGHT_GREY,
    },
    selectTime: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.BLACK,
      margin: 5,
    },
    saveButton: {
      backgroundColor: Colors.GREEN,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
    buttonText: {
      color: Colors.LIGHT_GREY,
      fontSize: 40,
    },
    dateButton: {
      margin: 10,
      backgroundColor: Colors.LIGHT_GREY,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.BROWN,
      padding: 2,
    },
    dateButtonText: {
      color: Colors.BLACK,
      fontSize: 20,
      textAlign: 'center',
    },
  });
};

export default createTodoEditScreenStyle;
