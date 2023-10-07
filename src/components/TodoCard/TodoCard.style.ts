import {StyleSheet} from 'react-native';

const createTodoCardStyle = () => {
  return StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      margin: 16,
      shadowColor: '#000',
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
      color: '#000',
    },
    description: {
      fontSize: 16,
      color: '#555',
    },
    time: {
      fontSize: 16,
      color: '#000',
      marginBottom: 8,
    },
  });
};

export default createTodoCardStyle;
