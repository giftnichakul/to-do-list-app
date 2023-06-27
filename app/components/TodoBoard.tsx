'use client'

import React, { createContext, useEffect, useState } from 'react'
import TaskBoard from './TaskBoard';
import Progress from './Progress';
import { getAllTasks } from '@/api';
import { Item } from '@/types';

type ContextProp = {
  data: Item[],
  updateData: ( updateData: Item) => void,
  addData: ( addTask: Item) => void,
  deleteData: (deleteTaskId: string) => void
}

export const DataContext = createContext<ContextProp>({
  data: [],
  updateData: () => {},
  addData: () => {},
  deleteData: () => {}
})

export default function TodoBoard() {

  const [data, setData] = useState<Item[]>([])

  const fetchData = async () => {
    const result = await getAllTasks();
    setData(result);
  }

  const updateData = (updateData: Item) => {
    setData(prevData => {
      const updatedData = prevData.map(item => {
        if (item.id === updateData.id) {
          return updateData;
        }
        return item;
      });
      return updatedData;
    });
  };

  const addData = ( addTask: Item) => {
    setData( prevData => [...prevData, addTask])
  }

  const deleteData = (deleteTaskId: string) => {
    setData(data.filter(item => item.id !== deleteTaskId))
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <DataContext.Provider value={{data, updateData, addData, deleteData}}>
      <div className='bg-[#F5F5F5] w-11/12 sm:w-8/12 h-8/12 rounded-lg py-16 px-5 sm:px-16'>
        <Progress />
        <TaskBoard />
      </div>
    </DataContext.Provider>
  )
}
