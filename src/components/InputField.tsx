import React, {useRef} from 'react'
import "./styles.css"

interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  handleAdd: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({todo , setTodo, handleAdd}) => {
  // like Documetn.getElement...()
  const inputRef = useRef<HTMLInputElement>(null); //When you create a invoke a useRef hook, it’s important to pass null as the default value. This is important because React.useRef can only be null, or the element object.
  
  return (
      <form className='input' onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur(); // blur is the opposite to focus()
      }}> 
      
          <input ref={inputRef} type='input'
          className='input__box' placeholder='Enter a Task'
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
          />
          <button className='input__submit' type='submit'>GO</button>
      </form>
  )
}
export default InputField
