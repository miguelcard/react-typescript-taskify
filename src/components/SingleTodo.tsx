import React, { useEffect, useRef, useState } from 'react'
import { Todo, TodoActions } from '../model'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css"

interface Props {
    todo: Todo
    dispatch: React.Dispatch<TodoActions>
}

const SingleTodo: React.FC<Props> = ({ todo, dispatch }) => {

    const [text, setText] = useState<string>(todo.title);
    const [editMode, setEditMode] = useState<boolean>(false);
    const todoInputRef = useRef<HTMLInputElement>(null);

    // Tip: using useReducer you dont need all this handle methods, instead you call just 'dispatch' and the reducer will take care of the appropiate actions
    // const handleDone = (todo: Todo): void => {
    //     setTodos(todos.map(t => (t.id === todo.id) ? { ...t, isDone: !t.isDone } : t))
    // }
    // const handleDelete = (todo: Todo): void => {
    //     setTodos(todos.filter(t => t.id !== todo.id))
    // }

    const handleSubmit = (e: React.FormEvent, todo: Todo) => {
        e.preventDefault();
        setEditMode(false);
        dispatch({type: 'edit-task', payload: {id: todo.id, title: text }})
        // setTodos(todos.map(t => (t.id === todo.id) ? { ...t, title: text } : t)); // continue here
    }

    useEffect(() => {
        if (editMode) {
            todoInputRef.current?.focus();
        }
    }, [editMode])

    return (
        <form action="" className="todos__single" onSubmit={(e) => handleSubmit(e, todo)}>            
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
                <span className="icon" onClick={() => dispatch({type: 'delete-task', payload: {id: todo.id}})}>
                    <AiFillDelete />
                </span>
                <span className="icon" onClick={() => dispatch({type: 'complete-task', payload: {id: todo.id}})}>
                    <MdDone />
                </span>
            </div>
        </form>
    )
}

export default SingleTodo
