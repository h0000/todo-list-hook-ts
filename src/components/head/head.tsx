import { ChangeEvent, KeyboardEvent, useState } from 'react';
import './head.css'

interface headProps {
  addTodo: (arg0: string) => void,
  title: string
}

export default function Head(props: headProps) {
  const [inputValue, setInputValue] = useState('')
  // 监听回车
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      props.addTodo(inputValue)
      setInputValue('')
      event.preventDefault();
    }
  }
  // 监听输入值
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value ?? '')
  }
  return (
    <header className="header" onKeyDown={handleKeyDown}>
      <div className="header_center">
        <div className="title">{props.title}</div>
        <input type="text" name="todo_add" value={inputValue} onChange={handleInputChange} placeholder="在此添加事项" />
      </div>
    </header>
  );
}

