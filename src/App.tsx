import { useMemo, useState } from 'react';
import './App.css';
import Head from './components/head/head'
import List from './components/todo/list';

export interface todo {
  title: string,
  id: number,
  done: boolean
}

function App() {
  // 设置默认值
  const [todoList, setTodoList] = useState<todo[]>(JSON.parse(localStorage.getItem('todoList') ?? '[]'))

  // 监听勾选框状态改变
  const handleCheckChange = (checked: boolean, id: number) => {
    // 修改切换勾选状态
    const index = todoList.findIndex(item=>item.id === id)
    if(index!==-1){
      const todo = todoList[index]
      todoList.splice(index,1)
      todo.done = checked
      setTodoList([...todoList,todo])
    }
  }
  // 监听删除
  const handleDelTodo = (id: number) => {
    setTodoList(todoList.filter(item => item.id !== id))
  }
  // 添加todo
  const addTodo = (value: string) => {
    // 没有值时，直接跳过
    if (!value) return
    const todo = {
      id: new Date().getTime(),
      title: value,
      done: false
    }
    setTodoList([...todoList, todo])
  }

  const changeAllchecked = (value: boolean) => {
    setTodoList(todoList.map(item=>{
      item.done = value
      return item
    }))
  }

  // todoList改变时，保存到本地
  const todoListMemoizedValue = useMemo(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])
  return (
    <div className="App">
      <Head title='TODO LIST' addTodo={addTodo}></Head>
      <List changeAllchecked={changeAllchecked} handleDelTodo={handleDelTodo} title="未完成" todoList={todoList.filter(item => !item.done)} handleCheckChange={handleCheckChange}></List>
      <List changeAllchecked={changeAllchecked} handleDelTodo={handleDelTodo} title="已完成" todoList={todoList.filter(item => item.done)} handleCheckChange={handleCheckChange}></List>
    </div>
  );
}

export default App;
