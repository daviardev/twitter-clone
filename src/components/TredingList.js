import Image from 'next/image'
import React from 'react'

const TrendingList = () => {
  return (
    <div className='mt-4 flex items-center'>
      <div>
        <p className='text-gray-500 text-[14px] mb-1'>Entertainment · LIVE</p>
        <h1 className='font-medium pr-2'>Bigg Boss 16: Salman Khan returns with a brand new season</h1>
      </div>

      <div>
        <Image
          src='/trending-1.jpeg'
          alt=''
          height={100}
          width={100}
          className='rounded-full'
        />
      </div>
    </div>
  )
}

export default TrendingList
