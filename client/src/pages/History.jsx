import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { DataContext } from '../context/DataContxetProvider'
import { getRecord } from '../api/api.js';


const History = ({ white }) => {

  const { account } = useContext(DataContext);

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRecord(account)
      setRecords(response)
    }

    fetchData();

  }, [])

  return (
    <div className={records.length > 4
      ? (white ? `bg-white text-black h-max   font-joseph` : `bg-black h-max text-white font-joseph`)
      : (white ? `bg-white text-black h-screen  font-joseph` : `bg-black h-screen text-white font-joseph`)}>
      <div className='flex justify-center'>
        <div className='flex flex-col mt-6 mb-8 gap-4'>
          {records && records.map((record) => {
            return (
              <div className={white
                ? `bg-slate-300 mx-4 md:w-max p-4 flex-col rounded-md text-lg`
                : `bg-slate-700 mx-4  md:w-max p-4 flex-col rounded-md text-lg`
              } key={record._id}>
                <p>{record.description}</p>
                <p className='mt-2'>{new Date(record.date).toDateString()}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default History