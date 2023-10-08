import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

const createTodoCardStyle = () => {
  return StyleSheet.create({
    card: {
      backgroundColor: Colors.LIGHT_GREY,
      borderRadius: 8,
      padding: 16,
      margin: 16,
      shadowColor: Colors.BLACK,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      color: Colors.BLACK,
    },
    description: {
      fontSize: 16,
      color: Colors.GREY,
    },
    time: {
      fontSize: 16,
      color: Colors.BLACK,
      marginBottom: 8,
    },
  });
};

export default createTodoCardStyle;
