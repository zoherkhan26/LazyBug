import { useState } from 'react'
import './App.css'
import LandingPage from './Pages/LandingPage/LandingPage.jsx'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Dashboard } from './Pages/HomePage/Dashboard.jsx'
import Layout from './components/Dashboard/Home/Layout'
import ProjectPage from './Pages/ProjectPage/ProjectPage.jsx'
import Mvptab from './components/Dashboard/Project/Mvp/Mvptab'
import Visualstab from './components/Dashboard/Project/visuals/Visualstab'
import Techtab from './components/Dashboard/Project/tech/Techtab'
import Milestonestab from './components/Dashboard/Project/milestones/Milestonestab'
import { ToastContainer, Zoom } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <ToastContainer
        position="top-right" 
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark" 
        toastClassName="bg-white text-green text-sm font-medium rounded-lg shadow-md"
        bodyClassName="text-sm"
        transition={Zoom}
      />
      <Router>
        <Routes>

          <Route path="/" element={<LandingPage />} />

          <Route path="/dashboard" element={<Dashboard />}>

            <Route index element={<Navigate to="home" />} />

            <Route path="home" element={<Layout />} />
            <Route path='projects' element={<Navigate to="/dashboard/home" replace/>} /> 
            <Route path="projects/:projectname" element={<ProjectPage />} >
                <Route index element={<Navigate to="mvp" replace />} />
                <Route path='mvp'  element={<Mvptab />} /> {/* This makes MVP the default */}
                <Route path="visuals" element={<Visualstab />} />
                <Route path="techs" element={<Techtab />} />
                <Route path="milestones" element={<Milestonestab />} />

            </Route>

          </Route>

        </Routes>
      </Router>


    </>
  )
}

export default App

