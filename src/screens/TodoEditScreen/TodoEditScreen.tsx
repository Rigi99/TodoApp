import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import BackIcon from '../../assets/SVGs/back-button.svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import createTodoEditScreenStyle from './TodoEditScreen.style';
import {formatTime} from '../../utils/helperFunctions';
import {DataBaseTodo} from '../../types/dataBaseTodo';
import {firebase} from '@react-native-firebase/firestore';

type TodoEditRouteParams = {
  todoData: DataBaseTodo;
};

type TodoEditScreenProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any, 'TodoEditScreen'> & {params: TodoEditRouteParams};
};

const TodoEditScreen: React.FC<TodoEditScreenProps> = ({navigation, route}) => {
  const styles = createTodoEditScreenStyle();
  const {todoData} = route.params;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date(todoData.date.split('/').reverse().join('-') + 'T00:00:00Z'),
  );
  const [showTimePickerFrom, setShowTimePickerFrom] = useState(false);
  const [showTimePickerTo, setShowTimePickerTo] = useState(false);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState(new Date());
  const [selectedTimeTo, setSelectedTimeTo] = useState(new Date());
  const [updatedTitle, setUpdatedTitle] = useState(todoData.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    todoData.description,
  );
  const todoTimeParts = todoData.time.split('-');
  const startTime = todoTimeParts[0];
  const endTime = todoTimeParts[1];

  const handleBack = () => {
    navigation.navigate('TodoDetailScreen', {todoData});
  };

  const openTimePicker = (pickerType: 'from' | 'to') => {
    if (pickerType === 'from') {
      setShowTimePickerFrom(true);
    } else if (pickerType === 'to') {
      setShowTimePickerTo(true);
    }
  };

  const handleTimeChange = (
    pickerType: 'from' | 'to',
    selected: Date | undefined,
  ) => {
    if (selected) {
      if (pickerType === 'from') {
        setSelectedTimeFrom(selected);
      } else if (pickerType === 'to') {
        setSelectedTimeTo(selected);
      }
    }
    setShowTimePickerFrom(false);
    setShowTimePickerTo(false);
  };

  const save = async () => {
    const {id} = todoData;
    const db = firebase.firestore();
    const todosCollection = db.collection('todos');
    const updateTodo = {
      title: updatedTitle,
      description: updatedDescription,
      time: `${formatTime(selectedTimeFrom)}-${formatTime(selectedTimeTo)}`,
      date: selectedDate.toLocaleDateString(),
    };
    try {
      await todosCollection.doc(id).update(updateTodo);
      navigation.navigate('TodoDetailScreen', {todoData: updateTodo});
    } catch (error) {
      console.log(error);
      Alert.alert('Update failed!');
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onChangeDate = (_event: any, selected: Date | undefined) => {
    if (selected) {
      setSelectedDate(selected);
    }
    setShowDatePicker(false);
    setShowTimePickerFrom(false);
    setShowTimePickerTo(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={handleBack}>
          <BackIcon width={40} height={40} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TextInput
          style={styles.title}
          multiline={true}
          numberOfLines={undefined}
          value={updatedTitle}
          onChangeText={text => setUpdatedTitle(text)}
        />
        <TextInput
          style={styles.description}
          multiline={true}
          numberOfLines={undefined}
          value={updatedDescription}
          onChangeText={text => setUpdatedDescription(text)}
        />
        <View style={styles.timePickersContainer}>
          <TouchableOpacity
            onPress={() => openTimePicker('from')}
            style={styles.timePickerButton}>
            <Text style={styles.selectTime}>{startTime}</Text>
          </TouchableOpacity>
          <Text style={styles.selectTime}>to</Text>
          <TouchableOpacity
            onPress={() => openTimePicker('to')}
            style={styles.timePickerButton}>
            <Text style={styles.selectTime}>{endTime}</Text>
          </TouchableOpacity>
        </View>
        {showTimePickerFrom && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="spinner"
            onChange={(_event, selected) => handleTimeChange('from', selected)}
          />
        )}
        {showTimePickerTo && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="spinner"
            onChange={(_event, selected) => handleTimeChange('to', selected)}
          />
        )}
        <TouchableOpacity
          onPress={() => openDatePicker()}
          style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            {selectedDate.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <TouchableOpacity onPress={save} style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TodoEditScreen;
