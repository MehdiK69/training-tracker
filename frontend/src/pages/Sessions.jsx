import { useState, useEffect } from 'react'
import api from '../api'

function Sessions() {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    api.get('sessions/').then((response) => setSessions(response.data))
  }, [])

  return (
    <div>
      <h1>My sessions</h1>
      {sessions.map((session) => (
        <div key={session.id}>
          <h2>{session.title}</h2>
          <p>{session.date} - {session.duration} min</p>
          <p>{session.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Sessions