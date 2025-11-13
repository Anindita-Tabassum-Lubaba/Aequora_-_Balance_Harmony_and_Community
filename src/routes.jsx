import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

// const Home = lazy(() => import('./pages/Home'))
// const About = lazy(() => import('./pages/AboutUs'))
// const Sector = lazy(() => import('./pages/Sector'))
// const Team = lazy(() => import('./pages/Team'))
// const Portfolio = lazy(() => import('./pages/Portfolio'))
// const ForFounders = lazy(() => import('./pages/ForFounders'))
// const ForInvestors = lazy(() => import('./pages/ForInvestors'))
// const Insights = lazy(() => import('./pages/Insights'))
// const Contact = lazy(() => import('./pages/Contact'))
// const FAQ = lazy(() => import('./pages/FAQ'))
// const Entertainment = lazy(() => import('./pages/Entertainment'))
// const FounderReg = lazy(() => import('./pages/FounderReg'))
// const InvestorReg = lazy(() => import('./pages/InvestorReg'))
// const Login = lazy(() => import('./pages/Login'))
// const FounderDashboard = lazy(() => import('./pages/FounderDashboard'))
const ResidantsDashboard = lazy(() => import('./pages/Residents'))




export default function AppRoutes() {
  return (
    <Suspense fallback={<div style={{padding: 24}}>Loading…</div>}>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sector" element={<Sector />} />
        <Route path="/team" element={<Team />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/for-founders" element={<ForFounders />} />
        <Route path="/for-investors" element={<ForInvestors />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/founder-registration" element={<FounderReg />} />
        <Route path="/investor-registration" element={<InvestorReg />} />
        <Route path="/login" element={<Login />} />
        <Route path="/founder/dashboard" element={<FounderDashboard />} /> */}
        <Route path="/residents" element={<ResidantsDashboard />} />
      </Routes>
    </Suspense>
  )
}
