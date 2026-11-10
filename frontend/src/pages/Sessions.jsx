import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddExerciseForm from '../components/AddExerciseForm'
import api from '../api'

function Sessions() {
  const [sessions, setSessions] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [duration, setDuration] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const loadSessions = () => {
    api.get('sessions/').then((response) => setSessions(response.data))
  }

  useEffect(() => {
    loadSessions()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('sessions/', {
        title,
        description,
        date,
        duration: duration || null,
      })
      setTitle('')
      setDescription('')
      setDate('')
      setDuration('')
      setError('')
      loadSessions()
    } catch {
      setError('Could not create the session')
    }
  }

  const handleDelete = async (id) => {
    await api.delete(`sessions/${id}/`)
    loadSessions()
  }

  return (
    <div>
      <h1>My sessions</h1>
      <button onClick={handleLogout}>Log out</button>

      <form onSubmit={handleSubmit}>
        <h2>New session</h2>
        {error && <p className="error">{error}</p>}
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="number" placeholder="Duration (min)" value={duration} onChange={(e) => setDuration(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      {sessions.map((session) => (
        <div key={session.id} className="session">
          <h2>{session.title}</h2>
          <p>{session.date} - {session.duration} min</p>
          <p>{session.description}</p>
          <ul>
          {session.exercises.map((exercise) => (
            <li key={exercise.id}>
              {exercise.name} - {exercise.sets}x{exercise.reps}
              {exercise.weight > 0 && ` @ ${exercise.weight} kg`}
            </li>
          ))}
          </ul>
          <AddExerciseForm sessionId={session.id} onAdded={loadSessions} />
          <button onClick={() => handleDelete(session.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default Sessions