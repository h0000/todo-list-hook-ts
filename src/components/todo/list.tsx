
import { useMemo, useState } from "react";
import { todo } from "../../App";
import './list.css'

interface listProps {
  todoList: todo[],
  title?: string,
  handleCheckChange: (arg0: any, arg1: number) => void,
  handleDelTodo: (arg0: number) => void,
  changeAllchecked: (arg0: boolean) => void
}

export default function List(props: listProps) {
  const checkChange = () => {
    // 当该列表有元素时，以第一个元素状态取反
    props.todoList.length!==0 && props.changeAllchecked(!props.todoList[0].done) 
  }
  return (
    <ul className="list">
      <li className="list_head">
        <div className="list_title">{props.title}({props.todoList.length})</div>
        <span className="action" onClick={checkChange}>全部更改</span>
      </li>
      {props.todoList?.map(item =>
        <li draggable className='todo_item' key={item.id}>
          <input
            title={item.title}
            type="checkbox"
            onChange={(event) => props.handleCheckChange(event.target.checked, item.id)}
            checked={item.done} />
          <div className="item_title"
            title={item.title}>
            {item.title}
          </div>
          <button onClick={() => props.handleDelTodo(item.id)}>删除</button>
        </li>)}
    </ul>
  );
}

