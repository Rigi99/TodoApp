import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import createHomeScreenStyle from './TodoDetailScreen.style';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import SettingsIcon from '../../assets/SVGs/settings.svg';
import TrashIcon from '../../assets/SVGs/trash.svg';
import BackIcon from '../../assets/SVGs/back-button.svg';
import {Todo} from '../../types/todo';

type TodoDetailRouteParams = {
  todoData: Todo;
};

type TodoDetailScreenProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any, 'TodoDetailScreen'> & {params: TodoDetailRouteParams};
};

const TodoDetailScreen: React.FC<TodoDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const styles = createHomeScreenStyle();
  const {todoData} = route.params;

  const handleEdit = () => {
    navigation.navigate('TodoEditScreen', {todoData});
  };
  const handleDelete = () => {
    console.log(todoData.id);
    navigation.goBack();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={handleBack}>
          <BackIcon width={40} height={40} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit}>
          <SettingsIcon width={40} height={40} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <TrashIcon width={40} height={40} />
        </TouchableOpacity>
      </View>
      {todoData && (
        <>
          <Text style={styles.title}>{todoData.title}</Text>
          <Text style={styles.description}>{todoData.description}</Text>
          <Text style={styles.time}>
            {todoData.date}
            {'\n'}
            {todoData.time}
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default TodoDetailScreen;
