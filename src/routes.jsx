import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'


const ResidantsDashboard = lazy(() => import('./pages/Residents'))
const Services = lazy(() => import('./pages/services'))
const Events = lazy(() => import('./pages/Events'))
const Reports = lazy(() => import('./pages/Reports'))
const Notifications = lazy(() => import('./pages/Notifications'))
const Sp = lazy(() => import('./pages/ServiceProviderHome'))





export default function AppRoutes() {
  return (
    <Suspense fallback={<div style={{padding: 24}}>Loading…</div>}>
      <Routes>

        <Route path="/residents" element={<ResidantsDashboard />} />
        <Route path="/bookings" element={<Services />} />
        <Route path="/events" element={<Events />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/service-provider" element={<Sp />} />
      </Routes>
    </Suspense>
  )
}
