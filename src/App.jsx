import './App.css'

import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { renderRoutes } from './routes.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {renderRoutes()}
      </Route>
    </Routes>
  )
}

export default App
