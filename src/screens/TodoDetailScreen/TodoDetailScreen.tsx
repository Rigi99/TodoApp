import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import createHomeScreenStyle from './TodoDetailScreen.style';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import SettingsIcon from '../../assets/SVGs/settings.svg';
import TrashIcon from '../../assets/SVGs/trash.svg';
import BackIcon from '../../assets/SVGs/back-button.svg';
import {firebase} from '@react-native-firebase/firestore';
import {DataBaseTodo} from '../../types/dataBaseTodo';

type TodoDetailRouteParams = {
  todoData: DataBaseTodo;
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
  const handleDelete = async () => {
    const {id} = todoData;
    const db = firebase.firestore();
    const todosCollection = db.collection('todos');
    try {
      await todosCollection.doc(id).delete();
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Delete failed!');
    }
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
      <ScrollView>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default TodoDetailScreen;
