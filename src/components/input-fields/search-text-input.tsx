import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchTextInput = () => {
  return (
    <div className='flex items-center border background1 overflow-hidden min-h-12'>
      <span className='flex items-center pl-3'>
        <FaSearch className='text-black'/>
      </span>
      <input type='text' placeholder='Course apa yang ingin kamu cari?' className="flex-1 p-2 outline-none bg-transparent text-black placeholder:text-black"/>
    </div>
  )
}

export default SearchTextInput
