import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

const createTodoDetailScreenStyle = () => {
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
  });
};

export default createTodoDetailScreenStyle;
