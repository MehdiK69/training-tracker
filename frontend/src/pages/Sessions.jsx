import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import DurationChart from '../components/DurationChart.jsx'
import AddExerciseForm from '../components/AddExerciseForm'
import api from '../api'

function Sessions() {
  const [sessions, setSessions] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [duration, setDuration] = useState('')
  const [error, setError] = useState('')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const navigate = useNavigate()
  const totalDuration = sessions.reduce((sum, s) => sum + (s.duration || 0), 0)
  const totalExercises = sessions.reduce((sum, s) => sum + s.exercises.length, 0)
  const completedCount = sessions.filter((s) => s.completed).length

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

  const handleToggleCompleted = async (session) => {
    await api.patch(`sessions/${session.id}/`, { completed: !session.completed })
    loadSessions()
  }

  const handleToggleFavorite = async (session) => {
    await api.patch(`sessions/${session.id}/`, { favorite: !session.favorite })
    loadSessions()
  }

  const handleDeleteExercise = async (id) => {
    await api.delete(`exercises/${id}/`)
    loadSessions()
  }

  const visibleSessions = onlyFavorites ? sessions.filter((s) => s.favorite) : sessions
  const chartSessions = [...sessions].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={onlyFavorites}
          onChange={(e) => setOnlyFavorites(e.target.checked)}
        />
      Favorites only
      </label>
      <div className="header-container">
        <h1>My sessions</h1>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <div className="stats">
        <div><strong>{sessions.length}</strong> sessions</div>
        <div><strong>{totalDuration}</strong> minutes</div>
        <div><strong>{totalExercises}</strong> exercises</div>
        <div><strong>{completedCount}</strong> completed</div>
      </div>

      <DurationChart
        dates={chartSessions.map((s) => s.date)}
        durations={chartSessions.map((s) => s.duration || 0)}
      />
      <form onSubmit={handleSubmit}>
        <h2>New session</h2>
        {error && <p className="error">{error}</p>}
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="number" placeholder="Duration (min)" value={duration} onChange={(e) => setDuration(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      {visibleSessions.map((session) => (
        <div key={session.id} className="session">
          <h2>{session.completed && <span className="done">Done</span>} {session.title}
              {session.favorite && <span className="favorite">Favorite</span>}
          </h2>
          <p>{session.date} - {session.duration} min</p>
          <p>{session.description}</p>
          <ul className="exercises">
          {session.exercises.map((exercise) => (
            <li key={exercise.id}>
              {exercise.name} - {exercise.sets}x{exercise.reps}
              {exercise.weight > 0 && ` @ ${exercise.weight} kg`}
              <button className="remove" onClick={() => handleDeleteExercise(exercise.id)}>Remove</button>
            </li>
          ))}
          </ul>
          <AddExerciseForm sessionId={session.id} onAdded={loadSessions} />
          <div className="bottomButton">
            <button onClick={() => handleDelete(session.id)}>Delete</button>
            <button onClick={() => handleToggleCompleted(session)}>
              {session.completed ? 'Mark as not done' : 'Mark as done'}
            </button>
            <button onClick={() => handleToggleFavorite(session)}>
              {session.favorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Sessions