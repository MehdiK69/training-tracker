import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Sessions from "./pages/Sessions.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sessions" element={<Sessions />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App