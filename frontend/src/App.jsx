import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Sessions from "./pages/Sessions.jsx";
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sessions" element={<ProtectedRoute> <Sessions /></ProtectedRoute>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>}/>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App