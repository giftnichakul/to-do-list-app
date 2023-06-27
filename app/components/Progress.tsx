import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from './TodoBoard';

export default function Progress() {

  const { data } = useContext(DataContext);
  const [done, setDone] = useState<number>(0);

  useEffect(() => {
    const complete = data.filter(item => item.completed).length;
    setDone(complete);
  }, [data])

  return (
    <div className='flex flex-col gap-3 bg-secondary p-5 rounded-xl'>
      <h1 className='text-white text-4xl font-medium'>Progress</h1>
      <progress className="progress progress-accent bg-[#3B3B3B] w-full" value={done} max={data.length}></progress>
      <p className='text-[#EBB9B8] text-base'>{done} completed</p>
    </div>
  )
}
