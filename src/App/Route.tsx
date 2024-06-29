import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '@/Pages/SinglePageApp/Index'

const Routers = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      {/* <Route path={RoutesName.TopTracks} element={<Home />} /> */}
    </Routes>
  )
}

export default Routers
