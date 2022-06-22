import React, { useEffect, useRef, useState } from 'react'
import { Todo, TodoActions } from '../model'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone, MdToggleOff } from "react-icons/md";
import "./styles.css"
import { Draggable } from 'react-beautiful-dnd';

interface Props {
    todo: Todo;
    dispatch: React.Dispatch<TodoActions>;
    index: number;
}

const SingleTodo: React.FC<Props> = ({ todo, dispatch, index }) => { // insteaf of passing all todos here, it better practice just to pass the functions to delete/edit/setDone this task from the todos

    const [text, setText] = useState<string>(todo.title);
    const [editMode, setEditMode] = useState<boolean>(false);
    const todoInputRef = useRef<HTMLInputElement>(null);

    // Tip: using useReducer you dont need all this handle methods, instead you call just 'dispatch' and the reducer will take care of the appropiate actions
    // const handleDelete = (todo: Todo): void => {
    //     setTodos(todos.filter(t => t.id !== todo.id))
    // }
    // handleDone...



    const handleSubmit = (e: React.FormEvent, todo: Todo) => {
        e.preventDefault();
        setEditMode(false);
        dispatch({ type: 'edit-task', payload: { id: todo.id, title: text } })
    }

    useEffect(() => {
        if (editMode) {
            todoInputRef.current?.focus();
        }
    }, [editMode])

    return (
        <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
            {
                (provided) => (
                    <form action="" className="todos__single" onSubmit={(e) => handleSubmit(e, todo)}
                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {
                            editMode ? (
                                <input ref={todoInputRef} className='todos__single--text' value={text} onChange={(event) => setText(event.target.value)} />
                            ) :
                                todo.isDone ?
                                    <s className="todos__single--text">{todo.title}</s>
                                    :
                                    <span className="todos__single--text">{todo.title}</span>
                        }
                        <div>
                            <span className="icon" onClick={() => {
                                if (!editMode && !todo.isDone) {
                                    setEditMode(true);
                                    // todoInputRef.current?.focus(); -> here you cant simply do this because at this point this input element was hidden, 
                                    //hence this is referencing a null element when it happens, therefore you have to do the focus togheter with useEffect
                                    // i.e. the input element was not in the dom at this time 
                                    // workaround: you could hide the element with styles like: "opacity:0; filter:alpha(opacity=0);" then it would work
                                } else if (editMode && !todo.isDone) {
                                    setEditMode(false);
                                }
                            }}>
                                <AiFillEdit />
                            </span>
                            <span className="icon" onClick={() => dispatch({ type: 'delete-task', payload: { id: todo.id } })}>
                                <AiFillDelete />
                            </span>
                            {/* <span className="icon" onClick={() => handleDone}> */}
                            <span className="icon" onClick={() => dispatch({ type: 'complete-task', payload: { id: todo.id } })}>

                                <MdDone />
                            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}

export default SingleTodo
