import React from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete} from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css"

interface Props {
    todo: Todo
}
const SingleTodo: React.FC<Props> = ({todo}) => {
    return (
        <form action="" className="todos__single">
            <span className="todos__single--text">{todo.title}</span>
            <div>
                <span className="icon">
                    <AiFillEdit />
                </span>                        
                <span className="icon">
                    <AiFillDelete />
                </span>
                <span className="icon">
                    <MdDone/>
                </span>
            </div>
        </form>
    )
}

export default SingleTodo
