import { deleteTask, editTask, updateTask } from '@/api';
import { Item } from '@/types';
import React, { useContext, useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { DataContext } from './TodoBoard';

export default function Task({ task } : { task: Item }) {
  const [ isDone, setIsDone ] = useState<boolean>(false)
  const [ isEdit, setIsEdit ] = useState<boolean>(false)
  const [ editTitle, setEditTitle] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false);
  const { updateData, deleteData } = useContext(DataContext);


  const handleCheck = async () => {
    try{
      setIsDone(!isDone)
      updateTask({id: task.id, complete: !isDone})
      updateData({id: task.id, title: task.title, completed: !isDone })
    }catch(error){
      console.log(error)
    }
  }

  const handleEdit = () => {
    setIsEdit(!isEdit)
    setOpen(!open)
  }

  const handleSave = async () => {
    await editTask({id: task.id, newTitle: editTitle})
    updateData({id: task.id, title: editTitle, completed: isDone })
    setIsEdit(!isEdit)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value)
  }

  const handleDelete = async () => {
    await deleteTask({id: task.id})
    deleteData(task.id)
  }

  useEffect(() => {
    setIsDone(task.completed);
    setEditTitle(task.title)
  }, [task]);

  return (
    <>
      { !isEdit ?
      (
        <div className='flex rounded-full w-full bg-white py-2.5 px-3 sm:px-5 mb-3 justify-between items-center'>
          <div className='flex content-center break-word items-center'>
            <input type='checkbox' className='checkbox checkbox-sm checkbox-primary mr-2 sm:mr-4'
              checked={isDone} onChange={handleCheck}/>
              { isDone ?
                <p className='line-through'>{task.title}</p>
                :
                <p className='text-[#2E2E2E] text-md'>{task.title}</p>
              }
          </div>
          <div className='relative'>
            <button className='btn btn-accent btn-sm' onClick={() => {setOpen(!open)}}>
              <BsThreeDots className='text-xl text-[#9796A8]'/>
            </button>
            { open && (<ul className="absolute p-2 right-0 z-20 shadow menu bg-white text-black rounded-box w-32">
              <li className='rounded-box hover:bg-primary' onClick={handleEdit}><a>Edit</a></li>
              <li className='text-red-700 rounded-box hover:bg-primary' onClick={handleDelete}><a>Delete</a></li>
            </ul>) }
          </div>
      </div>)
      :
      (
        <div className='flex rounded-full w-full bg-white px-2 mb-3 justify-between items-center'>
          <input type='text' className='input input-sm sm:input-md flex rounded-full w-full bg-white px-2 sm:px-5 text-black placeholder:text-[#BCBCBC]'
          value={editTitle} onChange={(e) => {handleChange(e)}}
          />
          <button className='btn btn-primary btn-xs sm:btn-sm rounded-2xl px-4 ml-2'
           onClick={handleSave} type='submit'>Save</button>
        </div>
      )
    }
    </>
  )
}
