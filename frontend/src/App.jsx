import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Sessions from "./pages/Sessions.jsx";
import Register from './pages/Register'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sessions" element={<Sessions />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App