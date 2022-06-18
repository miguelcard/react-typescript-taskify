import React, { useReducer, useState } from 'react';
import { MdSecurityUpdateGood } from 'react-icons/md';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo, TodoActions } from './model';


// its a React functional component
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todosState, dispatch] = useReducer(todosReducer, [])
  // const [todos, setTodos] = useState<Todo[]>([]); // list of todos shown -> Not needed with reducer!

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); // prevents page on submitting / on reloading everything! we dont need a whole reload
    // add todo if it exists
    if (todo) {
      dispatch({ type: 'add-task', payload: { name: todo } })
      // setTodos(prevTodos => [...prevTodos, { id: Date.now(), title: todo, isDone: false }])
      setTodo("")
    }
  }

  return (
    <div className="App">
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todosState} dispatch={dispatch} />
    </div>
  );
}

export default App;


function todosReducer(state: Todo[], action: TodoActions): Todo[] {
  switch (action.type) {
    case 'add-task':
      return [...state, { id: Date.now(), title: action.payload.name, isDone: false }];
    case 'edit-task':
      return state.map(t => (t.id === action.payload.id) ? { ...t, title: action.payload.title } : t);
    case 'delete-task':
      return state.filter(t => t.id !== action.payload.id);
    case 'complete-task':
      return state.map(t => (t.id === action.payload.id) ? { ...t, isDone: !t.isDone } : t);
    default:
      return state;
  }
}

// for organization/consistency you can add the cases to a contant object called ACTIONS 