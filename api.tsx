import { Item } from "./types";

const base_url = 'http://localhost:3001/todos'

export const getAllTasks = async (): Promise<Item[]>  => {
  const res = await fetch(`${base_url}`, {cache: 'no-store'})
  const data = await res.json()
  return data;
}

export const addTask = async ({ task } : { task: string}): Promise<Item> => {
  const res = await fetch(`${base_url}`, { method: 'POST'
    , body: JSON.stringify({
        title: task,
        completed: false
      })
    , headers : { 'Content-Type' : 'application/json' }
  })
  console.log('api add task', task);
  return res.json();
}

export const deleteTask = async ({ id } : { id: string }): Promise<void> => {
  const res = await fetch(`${base_url}/${id}`, { method: 'DELETE'})
  return res.json();
}

export const editTask = async ({ id, newTitle } : {id: string, newTitle: string}) => {
  const res = await fetch(`${base_url}/${id}`, { method: 'PATCH'
    , body: JSON.stringify({
        title: newTitle
      })
    , headers : { 'Content-Type' : 'application/json' }
  })
  return res.json();
}

export const updateTask = async ({ id, complete } : {id: string, complete: boolean}) => {
  const res = await fetch(`${base_url}/${id}`, { method: 'PATCH'
    , body: JSON.stringify({
        completed: complete
      })
    , headers : { 'Content-Type' : 'application/json' }
  })
  return res.json();
}
