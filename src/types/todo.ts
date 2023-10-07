export interface Todo {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
}

export const initialTodo: Todo = {
  id: '',
  title: '',
  date: new Date().toLocaleDateString(),
  time: '',
  description: '',
};
