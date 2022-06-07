import React from 'react'
import { Todo } from '../model'

interface Props {
    todo: Todo
}
const SingleTodo: React.FC<Props> = ({todo}) => {
    return (
        <div>
            {todo.title}
            {todo.isDone}
        </div>
    )
}

export default SingleTodo