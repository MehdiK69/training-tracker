import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sessions" element={<p>Sessions page</p>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App