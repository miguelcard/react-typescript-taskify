import React from 'react'
import { Todo, TodoActions } from '../model'
import SingleTodo from './SingleTodo'
import "./styles.css"

interface Props {
    todos: Todo[]
    dispatch: React.Dispatch<TodoActions>
}

const TodoList: React.FC<Props> = ({todos, dispatch}) => {
  return (
      <div className="todos">
        <ul>
            {todos.map(t => 
                <SingleTodo todo={t} dispatch={dispatch}/>
            )}
        </ul>  
    </div>
  )
}

export default TodoList; 