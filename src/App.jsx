import React from 'react'
// import Navbar from './components/Header'
// import Footer from './components/Footer'
import AppRoutes from './routes'

export default function App() {
  return (
    <div className="app-shell" style={{minHeight: '100dvh', display: 'flex', flexDirection: 'column'}}>
      {/* <Navbar /> */}
      <main style={{flex: 1}}>
        <AppRoutes />
      </main>
      {/* <Footer /> */}
    </div>
  )
}