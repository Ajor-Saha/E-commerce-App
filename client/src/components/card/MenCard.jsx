import React from 'react'
import PriceCard from './PriceCard'

const MenCard = () => {
  return (
   <div className='flex justify-center items-center'>
     <div className='mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
      <PriceCard />
      <PriceCard />
      <PriceCard />
      <PriceCard />
      <PriceCard />
      <PriceCard />
    </div>
   </div>
  )
}

export default MenCard
