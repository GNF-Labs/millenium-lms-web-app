import React from 'react'

interface ChapterCardProps {
    id: number,
    name: string
}

const ChapterCard:React.FC<ChapterCardProps> = ({id, name}) => {
  return (
    <div id={id.toString()} className='w-full bg-blue-500 rounded-lg p-4'>
        <h3 className='text-white text-2xl font-bold'>
            {name}
        </h3>
    </div>
  )
}

export default ChapterCard
