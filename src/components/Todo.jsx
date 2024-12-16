import { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";
export default function Todo() {
  const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
  const inputRef = useRef();
  const add = (e) => {
    if (e) {
      e.preventDefault()
    }
    const inputText = inputRef.current.value.trim()
    if(inputText === "") {
      return null;
    }
    const newTodo = [...todoList, {
      id: Date.now(),
      text: inputText,
      isComplete: false
    }]
    setTodoList(newTodo)
    inputRef.current.value = ""
    
  }
  const deleteTodo = (id) => {
    console.log(id);
    
    setTodoList((prevTodo)=> {
      
      // const idTodo = prevTodo.findIndex(todo => todo.id === id)
      // console.log(idTodo);
      
      // if (idTodo != -1) {
        
      //   console.log(prevTodo.splice(idTodo, 1));
      //   return prevTodo
      // }
      // else {
      //   return []
      // }
      return prevTodo.filter((item)=>{
        console.log(id);
        return item.id !== id
      })
    })
  }
  const toggle = (id)=> {
    setTodoList((prevTodo) => {
      return prevTodo.map((item)=> {
        if(item.id === id) {
          return {...item, isComplete: !item.isComplete}
        }
        return item;
      }) 
    })
  }
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todoList))
  }, [todoList])
  return (
    <div className="bg-white place-self-center p-7 w-11/12 max-w-md flex flex-col rounded-xl min-h-[550px]">
      {/* -----------title------------------- */}
      <div className="mt-7 flex item-center">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>
      {/* --------------iputbox------------------ */}
      <form onSubmit={add} className="flex items-center my-7 rounded-full bg-gray-200">
        <input
          ref={inputRef}
          className="pl-6 pr-2 h-14 flex-1 outline-none border-0 bg-transparent placeholder:text-slate-600"
          type="text"
          placeholder="Add Your Task"
        />
        <button onClick={()=> add()} className="w-32 h-14 rounded-full bg-orange-600 text-white text-lg font-medium cursor-pointer border-none">
          ADD +
        </button>
      </form>
      {/* --------------To-Do List------------------ */}
      <div>
        {todoList.map((item, index) => {
          return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
        })}
      </div>
    </div>
  );
}
