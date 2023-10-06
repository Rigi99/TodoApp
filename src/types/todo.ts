export interface Todo {
  id: string;
  title: string;
  date: string;
  description: string;
}

export const initialTodo: Todo = {
  id: '',
  title: '',
  date: new Date().toDateString(),
  description: '',
};
