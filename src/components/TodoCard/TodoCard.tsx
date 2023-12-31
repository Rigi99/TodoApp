import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import createTodoCardStyle from './TodoCard.style';
import Done from '../../assets/SVGs/done-ring.svg'

interface TodoCardProps {
  title: string;
  description: string;
  time: string;
  done: boolean;
  onMarkAsDone: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  title,
  description,
  time,
  done,
  onMarkAsDone,
}) => {
  const styles = createTodoCardStyle();

  return (
    <View style={done ? styles.doneCard : styles.card}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {title} - {time}
        </Text>
        <TouchableOpacity onPress={onMarkAsDone}>
          <Done width={50} height={50} />
        </TouchableOpacity>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </View>
  );
};

export default TodoCard;
