
import { Button } from '@/components/ui/button'
import React from 'react'
import Bannar from '../Bannar/Bannar'
import OurServices from '../OurServices/OurServices'
import Brands from '../Brands/Brands'
import Support from '../Support/Support'
import Marchant from '../Marchant/Marchant'
import Review from '../Review/Review'
import Faq from '../Faq/Faq'

const Home = () => {
  return (
    <div className=''>
      <div className='max-w-7xl space-y-12 lg:space-y-16 mx-auto'>
      <Bannar/>
      <OurServices/>
      <Brands/>
      <Support/>
      <Marchant/>
      <Review/>
      <Faq/>
    </div>
    </div>
  )
}

export default Home
