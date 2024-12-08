import React from 'react'
import { Outlet } from 'react-router-dom'
import { SocketProvider } from './SocketContext'
import Empty from './Pages/Empty'

function Layout() {
  return (
    <SocketProvider>
      <Empty/>
      <Outlet/>
    </SocketProvider>
  )
}

export default Layout