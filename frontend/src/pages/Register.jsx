import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('auth/register/', { username, password })
      localStorage.setItem('token', response.data.token)
      navigate('/sessions')
    } catch (err) {
      const data = err.response?.data
      setError(
        data?.username?.[0] || data?.password?.[0] || 'Could not create the account'
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password (8 characters min)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Create account</button>
      <p>
        Already registered? <Link to="/login">Log in</Link>
      </p>
      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </form>
  )
}

export default Register