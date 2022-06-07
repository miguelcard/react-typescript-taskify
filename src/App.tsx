import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';


// its a React functional component
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>(""); // change to TODO int
  const [todos, setTodos] = useState<Todo[]>([]); // list of todos shown

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); // prevents page on submitting / on reloading everything! we dont need a whole reload

    // add todo if it exists
    if (todo) {
      setTodos( prevTodos => [...prevTodos , {id: Date.now(), title: todo, isDone: false}] )
      setTodo("")    
    } 
  }

  return (
    <div className="App">
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;

// do from 38 to 41 -> useRef Hook