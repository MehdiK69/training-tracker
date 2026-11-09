import { useState } from 'react'
import api from '../api'

function AddExerciseForm({ sessionId, onAdded }) {
  const [name, setName] = useState('')
  const [sets, setSets] = useState(3)
  const [reps, setReps] = useState(10)
  const [weight, setWeight] = useState('')
  const [rest, setRest] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('exercises/', {
      session: sessionId,
      name,
      sets,
      reps,
      weight: weight || null,
      rest_seconds: rest || null,
    })
    setName('')
    setWeight('')
    setRest('')
    onAdded()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Exercise" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" min="1" value={sets} onChange={(e) => setSets(e.target.value)} />
      <input type="number" min="1" value={reps} onChange={(e) => setReps(e.target.value)} />
      <input type="number" step="0.5" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <input type="number" placeholder="Rest (s)" value={rest} onChange={(e) => setRest(e.target.value)} />
      <button type="submit">Add exercise</button>
    </form>
  )
}

export default AddExerciseForm