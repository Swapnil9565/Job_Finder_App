import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faIndianRupeeSign,  faUserGroup} from "@fortawesome/free-solid-svg-icons"
const JobCards = () => {
  return (
    <div className='mainCard p-5 rounded-md mt-10 shadow-[0px_4px_10px_#FF202040]   mx-auto flex justify-between w-3/4'>
    <div className='flex gap-3'>
      <div className="logo">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxIuzbvA1h2NGu7Esu0LsHPwA87FSwj8ycw&s" alt="" width={50}/>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='font-bold text-lg'>Frontend Developer</h1>
        <div className='flex items-center gap-5'>
          <div className='text-[#9C9C9C]'>
          <FontAwesomeIcon icon={faUserGroup}/>
          <span className='ml-2'>11-50</span>
          </div>
          <div className='text-[#9C9C9C]'>
          <FontAwesomeIcon icon={faIndianRupeeSign}/>
          <span className='ml-2'>50,000</span>
          </div>
          <p className='text-[#9C9C9C]'>Delhi</p>
        </div>
        <div className='flex gap-5 text-[#ED5353] font-semibold text-sm'>
          <p>Office</p>
          <p>Full Time</p>
        </div>
      </div>
    </div>
    <div className='flex flex-col items-end'>
       <div className='flex gap-5'>
        <p className='bg-[#FFEEEE] p-2 font-semibold'>HTML</p>
        <p className='bg-[#FFEEEE] p-2 font-semibold'>CSS</p>
        <p className='bg-[#FFEEEE] p-2 font-semibold'>JS</p>
       </div>
       <div className='my-2'>
        <button className='bg-[#ED5353] text-white rounded-md px-2 py-2 cursor-pointer'>View Details</button>
       </div>
    </div>
    </div>
  )
}

export default JobCards