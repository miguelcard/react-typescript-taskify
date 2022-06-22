import React, { useReducer, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo, TodoActions } from './model';
import { DragDropContext, DropResult } from "react-beautiful-dnd";


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

  const onDragEnd = (result: DropResult) => {
    // this result obj has properties like source & destination ids + indexes to help you write the logic to handle the elements
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;

    } else if (source.droppableId !== destination.droppableId) { // if same destionation but index changed NOTE: the index is the total index in the whole list
      let
        activeTemp = todosState,
        tempTodo;

      tempTodo = activeTemp[source.index]
      dispatch({ type: 'complete-task', payload: { id: tempTodo.id } })
      dispatch({ type: 'add-task-to-position', payload: { index1: source.index, index2: destination.index } })
      
    } else if (source.index !== destination.index) {
      dispatch({ type: 'add-task-to-position', payload: { index1: source.index, index2: destination.index } })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading'>Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todosState} dispatch={dispatch} />
      </div>
    </DragDropContext>
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
    case 'add-task-to-position':
      let todosTemp = state,
        toMove = todosTemp.splice(action.payload.index1, 1)[0],
        moveToIndex = action.payload.index2;
        todosTemp.splice(moveToIndex, 0, toMove)
      return todosTemp;
    default:
      return state;
  }
}

// for organization/consistency you can add the cases to a constant object called ACTIONS 