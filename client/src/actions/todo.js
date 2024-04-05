import { nanoid } from "nanoid";

export const addTodo =(todos,todo)=>async(dispatch)=>{
  const  newTodos =[...todos,
  {
    id:nanoid(),
    title:todo,
    complete:false
  }];
  dispatch({
    type:"ADD_TODO",
    payload:newTodos
  })  
}
export const deleteTodo =(todos,id)=>async(dispatch)=>{
  const  newTodos =todos.filter((todo)=>todo.id!==id)
  dispatch({
    type:"DELETE_TODO",
    payload:newTodos
  })  
}
