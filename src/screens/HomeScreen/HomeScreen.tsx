import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TodoCard from '../../components/TodoCard/TodoCard';
import {Todo} from '../../types/todo';
import createHomeScreenStyle from './HomeScreen.style';
import {StackNavigationProp} from '@react-navigation/stack';
import {firebase} from '@react-native-firebase/firestore';
import {DataBaseTodo} from '../../types/dataBaseTodo';
import {useIsFocused} from '@react-navigation/native';
import {formatTime} from '../../utils/helperFunctions';

type HomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const today = new Date();
  const styles = createHomeScreenStyle();
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    time: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [filteredTodos, setFilteredTodos] = useState<DataBaseTodo[]>([]);
  const [showTextInput, setShowTextInput] = useState(false);
  const [showTimePickerFrom, setShowTimePickerFrom] = useState(false);
  const [showTimePickerTo, setShowTimePickerTo] = useState(false);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState(new Date());
  const [selectedTimeTo, setSelectedTimeTo] = useState(new Date());
  const [fireBaseTodos, setFireBaseTodos] = useState<DataBaseTodo[]>([]);
  const [dataFetched, setDataFetched] = useState(false);
  const isInFocus = useIsFocused();

  useEffect(() => {
    if (!dataFetched) {
      getTodos().then(() => setDataFetched(true));
    }
    const filtered = fireBaseTodos.filter(
      todo => todo.date === selectedDate.toLocaleDateString(),
    );
    filtered.sort((a, b) => {
      return a.time.localeCompare(b.time);
    });
    setFilteredTodos(filtered);
  }, [
    selectedDate,
    selectedTimeFrom,
    navigation,
    fireBaseTodos,
    dataFetched,
    isInFocus,
  ]);
  const onChangeDate = (_event: any, selected: Date | undefined) => {
    if (selected) {
      setSelectedDate(selected);
    }
    setShowDatePicker(false);
    setShowTimePickerFrom(false);
    setShowTimePickerTo(false);
    setShowTextInput(false);
  };

  const toggleTextInput = () => {
    setShowTextInput(!showTextInput);
    setShowTimePickerFrom(false);
    setShowTimePickerTo(false);
  };

  const addTodo = async () => {
    if (
      newTodo.title &&
      newTodo.description &&
      selectedTimeFrom &&
      selectedTimeTo
    ) {
      const newTodoItem = {
        date: selectedDate.toLocaleDateString(),
        ...newTodo,
        time: `${formatTime(selectedTimeFrom)}-${formatTime(selectedTimeTo)}`,
      };
      const db = firebase.firestore();
      const todosCollection = db.collection('todos');
      try {
        await todosCollection.add(newTodoItem);
        setNewTodo({
          title: '',
          description: '',
          time: '',
        });
        setShowTextInput(!showTextInput);
        setShowTimePickerFrom(false);
        setShowTimePickerTo(false);
        setSelectedTimeFrom(new Date());
        setSelectedTimeTo(new Date());
      } catch (error) {
        console.log(error);
        Alert.alert('Failed to add todo!');
      }
    } else {
      Alert.alert('Incomplete TODO');
    }
  };

  const cancelAddTodo = () => {
    setShowTextInput(!showTextInput);
    setShowTimePickerFrom(false);
    setShowTimePickerTo(false);
    setSelectedTimeFrom(new Date());
    setSelectedTimeTo(new Date());
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

  const openTimePicker = (pickerType: 'from' | 'to') => {
    if (pickerType === 'from') {
      setShowTimePickerFrom(true);
    } else if (pickerType === 'to') {
      setShowTimePickerTo(true);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleCardPress = (todoData: DataBaseTodo) => {
    navigation.navigate('TodoDetailScreen', {todoData});
  };

  const handleTextInputFocus = () => {
    setShowTimePickerFrom(false);
    setShowTimePickerTo(false);
  };

  const getTodos = async () => {
    const todos: DataBaseTodo[] = [];
    const db = firebase.firestore();
    const todosCollection = db.collection('todos');
    try {
      const querySnapshot = await todosCollection.get();
      querySnapshot.forEach(doc => {
        const todoData = doc.data() as Todo;
        const todoWithId = {...todoData, id: doc.id};
        todos.push(todoWithId);
      });
      setFireBaseTodos(todos);
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to fetch data from server!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={openDatePicker} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>{selectedDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <ScrollView>
        {filteredTodos.map(todo => (
          <TouchableOpacity
            key={todo.title}
            onPress={() => handleCardPress(todo)}>
            <TodoCard
              key={todo.title}
              title={todo.title}
              time={todo.time}
              description={todo.description}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {showTextInput ? (
        <View style={styles.addTodoContainer}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="Title"
            value={newTodo.title}
            onChangeText={text => setNewTodo({...newTodo, title: text})}
            onFocus={handleTextInputFocus}
          />
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="Description"
            value={newTodo.description}
            onChangeText={text => setNewTodo({...newTodo, description: text})}
            onFocus={handleTextInputFocus}
          />
          <View style={styles.timePickersContainer}>
            <TouchableOpacity
              onPress={() => openTimePicker('from')}
              style={styles.timePickerButton}>
              <Text style={styles.selectTime}>
                {formatTime(selectedTimeFrom)}
              </Text>
            </TouchableOpacity>
            <Text style={styles.selectTime}>to</Text>
            <TouchableOpacity
              onPress={() => openTimePicker('to')}
              style={styles.timePickerButton}>
              <Text style={styles.selectTime}>
                {formatTime(selectedTimeTo)}
              </Text>
            </TouchableOpacity>
          </View>
          {showTimePickerFrom && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="spinner"
              onChange={(_event, selected) =>
                handleTimeChange('from', selected)
              }
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
          <TouchableOpacity onPress={addTodo} style={styles.addButton}>
            <Text style={styles.plusSign}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancelAddTodo} style={styles.cancelButton}>
            <Text style={styles.plusSign}>X</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.addTodoContainer}>
          <TouchableOpacity onPress={toggleTextInput} style={styles.addButton}>
            <Text style={styles.plusSign}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
