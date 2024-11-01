import React from 'react'
import SideShow from '../Component/Carousel/Carousel'
import DisCard from '../Component/DiscountCard/DisCard'
import LS1 from '../Component/LandingSession1/LS1'
import LS2 from '../Component/LandingSession1/LS2'
import LS3 from '../Component/LandingSession1/LS3'
import LS4 from '../Component/LandingSession1/LS4'
import Login from '../Component/Login/Login'

export default function Home() {
  return (
    <div>
        <SideShow/>
        <LS1/>
        <LS2/>
        <LS4/>
    </div>
  )
}
