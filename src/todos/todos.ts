import {Todo} from '../types/todo';

function generateRandomId() {
  return String(Math.random());
}
export const Todos: Todo[] = [
  {
    id: generateRandomId(),
    title: 'Feladat 1',
    date: '10/10/2023',
    time: '08:00',
    description: 'Ez az első feladat leírása.',
  },
  {
    id: generateRandomId(),
    title: 'Feladat 2',
    date: '10/15/2023',
    time: '14:30',
    description: 'Ez a második feladat leírása.',
  },
  {
    id: generateRandomId(),
    title: 'Feladat 3',
    date: '10/20/2023',
    time: '10:45',
    description: 'Ez a harmadik feladat leírása.',
  },
  {
    id: generateRandomId(),
    title: 'Feladat 4',
    date: '10/20/2023',
    time: '09:00',
    description: 'Ez a negyedik feladat leírása.',
  },
];
