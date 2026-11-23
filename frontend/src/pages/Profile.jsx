import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

function Profile() {
  const [form, setForm] = useState({
    height_cm: '',
    weight_kg: '',
    birth_date: '',
    level: '',
    goal: '',
    weekly_target: '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('profile/').then((response) => {
      const data = response.data
      setForm({
        height_cm: data.height_cm ?? '',
        weight_kg: data.weight_kg ?? '',
        birth_date: data.birth_date ?? '',
        level: data.level ?? '',
        goal: data.goal ?? '',
        weekly_target: data.weekly_target ?? '',
      })
    })
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.patch('profile/', {
        height_cm: form.height_cm || null,
        weight_kg: form.weight_kg || null,
        birth_date: form.birth_date || null,
        level: form.level,
        goal: form.goal,
        weekly_target: form.weekly_target || null,
      })
      setMessage('Profile saved')
      setError('')
    } catch {
      setError('Could not save the profile')
      setMessage('')
    }
  }

  return (
    <div>
      <div className="header-container">
        <h1>My profile</h1>
        <Link to="/sessions">Back to sessions</Link>
      </div>

      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <label className="field">
          Height (cm)
          <input type="number" name="height_cm" value={form.height_cm} onChange={handleChange} />
        </label>

        <label className="field">
          Weight (kg)
          <input type="number" step="0.1" name="weight_kg" value={form.weight_kg} onChange={handleChange} />
        </label>

        <label className="field">
          Birth date
          <input type="date" name="birth_date" value={form.birth_date} onChange={handleChange} />
        </label>

        <label className="field">
          Level
          <select name="level" value={form.level} onChange={handleChange}>
            <option value="">Not set</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label className="field">
          Goal
          <select name="goal" value={form.goal} onChange={handleChange}>
            <option value="">Not set</option>
            <option value="muscle">Build muscle</option>
            <option value="strength">Get stronger</option>
            <option value="weight_loss">Lose weight</option>
            <option value="endurance">Improve endurance</option>
            <option value="maintenance">Stay fit</option>
          </select>
        </label>

        <label className="field">
          Sessions per week
          <input type="number" min="1" max="14" name="weekly_target" value={form.weekly_target} onChange={handleChange} />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default Profile