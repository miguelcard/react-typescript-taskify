import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo, TodoActions } from '../model'
import SingleTodo from './SingleTodo'
import "./styles.css"

interface Props {
    todos: Todo[]
    dispatch: React.Dispatch<TodoActions>
}

const TodoList: React.FC<Props> = ({ todos, dispatch }) => {
    return (
        <div className='container'>
            <Droppable droppableId='OpenTodos'>
                {(provided) => (            // you need to put your droppable inside a callback fucntion just because thats how the library handles it, also the args
                    <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
                        <span className='todos__heading'> Active Tasks</span>
                        <ul>
                            {todos.map((t, index) => {
                                if (!t.isDone) {
                                    return <SingleTodo todo={t} dispatch={dispatch} index={index}/>
                                }
                            })}
                        </ul>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId='CompletedTodos'>
                {(provided) => (            // you need to put your droppable inside a callback fucntion just because thats how the library handles it, also the args
                    <div className="todos completed" ref={provided.innerRef} {...provided.droppableProps}>
                        <span className='todos__heading'>Completed Tasks</span>
                        <ul>
                            {todos.map((t, index) => {
                                if (t.isDone) {
                                    return <SingleTodo todo={t} dispatch={dispatch} index={index}/>
                                }
                            })}
                        </ul>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default TodoList; 