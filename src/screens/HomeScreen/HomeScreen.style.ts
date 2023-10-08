import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

const createHomeScreenStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.BACKGROUND,
    },
    addTodoContainer: {
      padding: 16,
      alignItems: 'center',
      position: 'relative',
    },
    addButton: {
      backgroundColor: Colors.GREEN,
      borderRadius: 100,
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
    cancelButton: {
      backgroundColor: Colors.RED,
      borderRadius: 100,
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      position: 'absolute',
      bottom: 10,
      left: 10,
    },
    plusSign: {
      color: Colors.LIGHT_GREY,
      fontSize: 40,
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
      color: Colors.BLACK,
      margin: 5,
    },
    textInput: {
      backgroundColor: Colors.LIGHT_GREY,
      color: Colors.BLACK,
      fontSize: 16,
      width: '100%',
      paddingHorizontal: 8,
      marginBottom: 10,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.BROWN,
    },
    dateButton: {
      backgroundColor: Colors.BROWN,
      padding: 10,
      borderRadius: 10,
      margin: 10,
      alignItems: 'center',
    },
    dateButtonText: {
      color: Colors.LIGHT_GREY,
      fontSize: 20,
    },
    timePickersContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
  });
};

export default createHomeScreenStyle;
