import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
// import BackIcon from '../../assets/SVGs/back-button.svg';
import createTodoDetailScreenStyle from '../TodoDetailScreen/TodoDetailScreen.style';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {Todo} from '../../types/todo';
import BackIcon from '../../assets/SVGs/back-button.svg';

type TodoEditRouteParams = {
  todoData: Todo;
};

type TodoEditScreenProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any, 'TodoEditScreen'> & {params: TodoEditRouteParams};
};

const TodoEditScreen: React.FC<TodoEditScreenProps> = ({navigation, route}) => {
  const styles = createTodoDetailScreenStyle();
  const {todoData} = route.params;

  const handleBack = () => {
    navigation.navigate('TodoDetailScreen', {todoData});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={handleBack}>
          <BackIcon width={40} height={40} />
        </TouchableOpacity>
      </View>
      <Text>{todoData.title}</Text>
    </SafeAreaView>
  );
};

export default TodoEditScreen;
