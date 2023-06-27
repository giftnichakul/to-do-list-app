import React, { useContext, useEffect, useState } from 'react'
import { Item } from '@/types';
import Task from './Task';
import { DataContext } from './TodoBoard';
import { addTask } from '@/api';
import { BiChevronDown } from "react-icons/bi";


export default function TaskBoard() {

  const { data , addData } = useContext(DataContext);

  const [context, setContext] = useState<Item[]>(data)
  const [newTitle, setNewTitle] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [select , setSelect] = useState<string>('All')

  useEffect(() => {
    setContext(data)
    setSelect('All')
  }, [data])

  const addNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = await addTask({task: newTitle});
    addData(newTask)
    setNewTitle('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value)
  }

  const filterContext = (select: string) => {
    switch(select){
      case 'Done':
        setSelect('Done')
        setContext(data.filter(item => item.completed === true))
        break
      case 'Undone':
        setSelect('Undone')
        setContext(data.filter(item => item.completed === false))
        break
      default:
        setSelect('All')
        setContext(data)
    }
    setOpen(false)
  }
  return (
    <div className='py-5'>
      <div className='relative flex justify-between items-center'>
        <h1 className='text-xl text-black font-medium'>Task</h1>
        <div className='relative'>
          <button className='btn btn-accent top-0 right-0 mb-1 w-32 bg-white rounded-2xl'
          onClick={() => setOpen(!open)}>
            <div className='flex justify-between w-full text-black font-normal capitalize'>
              <p>{select}</p>
              <BiChevronDown />
            </div>
          </button>
          { open && (<ul tabIndex={0} className="absolute right-0 p-2 z-10 shadow menu bg-white text-black rounded-box w-32">
            <li className='rounded-box hover:bg-primary' onClick={() => filterContext('All')}><a>All</a></li>
            <li className='rounded-box hover:bg-primary' onClick={() => filterContext('Done')}><a>Done</a></li>
            <li className='rounded-box hover:bg-primary' onClick={() => filterContext('Undone')}><a>Undone</a></li>
          </ul>) }
        </div>
      </div>
      <div className='overflow-y-scroll h-56 mt-3'>
        { context.length === 0 ?
        <div className='flex justify-center'>
          <p className='text-black'>You finish all task</p>
        </div>
        : <>{ context.map((item) => {
            return <Task task={item} key={item.id}/>
            })}
          </>
        }
      </div>
      <div>
        <form onSubmit={addNewTask}>
          <input type='text' placeholder='Add your todo...'
          className='input flex rounded-full w-full bg-white py-2.5 px-5 mt-3 text-black placeholder:text-[#BCBCBC]'
          value={newTitle} onChange={(e) => {handleChange(e)}}
          />
        </form>
      </div>
    </div>
  )
}
