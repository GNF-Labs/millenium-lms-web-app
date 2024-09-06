import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchTextInput = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      // Trigger navigation when Enter is pressed and input is not empty
      router.push(`/courses/search?q=${encodeURIComponent(query)}`);
    }
  };
  return (
    <div className='flex items-center border background1 overflow-hidden min-h-12'>
      <span className='flex items-center pl-3'>
        <FaSearch className='text-black'/>
      </span>
      <input
        type='text'
        placeholder='Course apa yang ingin kamu cari?'
        className="flex-1 p-2 outline-none bg-transparent text-black placeholder:text-black"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

export default SearchTextInput
