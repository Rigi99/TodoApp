import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
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

const HomeScreen: React.FC = () => {
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
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const filtered = Todos.filter(
      todo => todo.date === selectedDate.toLocaleDateString(),
    );
    filtered.sort((a, b) => {
      return a.time.localeCompare(b.time);
    });
    setFilteredTodos(filtered);
  }, [selectedDate, selectedTime]);
  const onChangeDate = (_event: any, selected: Date | undefined) => {
    if (selected) {
      setSelectedDate(selected);
    }
    setShowDatePicker(false);
    setShowTimePicker(false);
    setShowTextInput(false);
  };

  const toggleTextInput = () => {
    setShowTextInput(!showTextInput);
    setShowTimePicker(false);
  };

  const addTodo = () => {
    if (newTodo.title && newTodo.description && selectedTime) {
      const newTodoItem = {
        id: String(Math.random()),
        date: selectedDate.toLocaleDateString(),
        ...newTodo,
        time: formatTime(selectedTime),
      };
      Todos.push(newTodoItem);
      setFilteredTodos([...filteredTodos, newTodoItem]);
      setNewTodo({
        title: '',
        description: '',
        time: '',
      });
      setSelectedTime(new Date());
      setShowTextInput(!showTextInput);
      setShowTimePicker(false);
    } else {
      Alert.alert('Incomplete TODO');
    }
  };

  const handleTimeChange = (_event: any, selected: Date | undefined) => {
    if (selected) {
      setSelectedTime(selected);
    }
    setShowTimePicker(false);
  };

  const openTimePicker = () => {
    setShowTimePicker(true);
  };

  return (
    <SafeAreaView>
      <Button
        title={selectedDate.toDateString()}
        onPress={() => setShowDatePicker(true)}
      />
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
          <TodoCard
            key={todo.id}
            title={todo.title}
            time={todo.time}
            description={todo.description}
          />
        ))}
      </ScrollView>
      {showTextInput ? (
        <View style={styles.addTodoContainer}>
          <TextInput
            placeholder="Title"
            value={newTodo.title}
            onChangeText={text => setNewTodo({...newTodo, title: text})}
            onFocus={() => setShowTimePicker(false)}
          />
          <TextInput
            placeholder="Description"
            value={newTodo.description}
            onChangeText={text => setNewTodo({...newTodo, description: text})}
            onFocus={() => setShowTimePicker(false)}
          />
          <TouchableOpacity
            onPress={openTimePicker}
            style={styles.timePickerButton}>
            <Text>{formatTime(selectedTime)}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
            />
          )}
          <TouchableOpacity onPress={addTodo} style={styles.addButton}>
            <Text style={styles.plusSign}>+</Text>
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
