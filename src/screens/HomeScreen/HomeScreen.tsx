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
import {Todos} from '../../todos/todos';
import {Todo} from '../../types/todo';
import createHomeScreenStyle from './HomeScreen.style';
import {StackNavigationProp} from '@react-navigation/stack';

type HomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const today = new Date();
  const styles = createHomeScreenStyle();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    time: '',
  });
  const [showTextInput, setShowTextInput] = useState(false);
  const [showTimePickerFrom, setShowTimePickerFrom] = useState(false);
  const [showTimePickerTo, setShowTimePickerTo] = useState(false);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState(new Date());
  const [selectedTimeTo, setSelectedTimeTo] = useState(new Date());

  useEffect(() => {
    const filtered = Todos.filter(
      todo => todo.date === selectedDate.toLocaleDateString(),
    );
    filtered.sort((a, b) => {
      return a.time.localeCompare(b.time);
    });
    setFilteredTodos(filtered);
  }, [selectedDate, selectedTimeFrom, navigation]);
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

  const addTodo = () => {
    if (
      newTodo.title &&
      newTodo.description &&
      selectedTimeFrom &&
      selectedTimeTo
    ) {
      const newTodoItem = {
        id: String(Math.random()),
        date: selectedDate.toLocaleDateString(),
        ...newTodo,
        time: `${formatTime(selectedTimeFrom)}-${formatTime(selectedTimeTo)}`,
      };
      Todos.push(newTodoItem);
      setFilteredTodos([...filteredTodos, newTodoItem]);
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

  const handleCardPress = (todoData: Todo) => {
    navigation.navigate('TodoDetailScreen', {todoData});
  };

  const handleTextInputFocus = () => {
    setShowTimePickerFrom(false);
    setShowTimePickerTo(false);
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
          <TouchableOpacity key={todo.id} onPress={() => handleCardPress(todo)}>
            <TodoCard
              key={todo.id}
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

function formatTime(time: Date) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}
