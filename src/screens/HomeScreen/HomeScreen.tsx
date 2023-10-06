import React, {useState} from 'react';
import {Button, SafeAreaView, ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TodoCard from '../../components/TodoCard/TodoCard';
import {Todos} from '../../todos/todos';

const HomeScreen: React.FC = () => {
  const today = new Date();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);

  const onChangeDate = (event: any, selected: Date | undefined) => {
    if (selected) {
      setSelectedDate(selected);
    }
    setShowDatePicker(false);
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
        {Todos.map(todo => (
          <TodoCard
            key={todo.id}
            title={todo.title}
            description={todo.description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
