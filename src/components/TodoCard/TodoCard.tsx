import React from 'react';
import {View, Text} from 'react-native';
import createTodoCardStyle from './TodoCard.style';

interface TodoCardProps {
  title: string;
  description: string;
}

const TodoCard: React.FC<TodoCardProps> = ({title, description}) => {
  const styles = createTodoCardStyle();
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </View>
  );
};

export default TodoCard;
