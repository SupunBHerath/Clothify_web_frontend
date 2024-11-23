import React from 'react'
import HeaderCard from '../Card/HeaderCard'
import BestSellerProduct from '../BestSeller/BestSellerProduct'
import CalendarDiv from '../Calendar/Calendar'
import BestCustomersTable from '../BestCustomersTable/BestCustomersTable'

export default function AdminDashboard() {
  return (
    <div>
      <HeaderCard />
      <BestSellerProduct />
      <BestCustomersTable/>
    </div>
  )
}
