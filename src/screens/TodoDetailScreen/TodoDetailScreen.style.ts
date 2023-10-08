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
      marginTop: 10,
      marginBottom: 30,
      marginLeft: 10,
      marginRight: 10,
      color: Colors.BLACK,
      backgroundColor: Colors.LIGHT_GREY,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.BROWN,
    },
    description: {
      fontSize: 24,
      color: Colors.BLACK,
      textAlign: 'center',
      marginBottom: 30,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: Colors.LIGHT_GREY,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.BROWN,
    },
    time: {
      fontSize: 20,
      color: Colors.BLACK,
      fontWeight: 'bold',
      textAlign: 'center',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 20,
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
