import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

const WORKOUTS_API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchItems(WORKOUTS_API_URL, controller.signal).then(setWorkouts).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message) }); return () => controller.abort() }, [])
  return <section><div className="page-heading"><div><p className="eyebrow">Next session</p><h2>Workouts</h2><p>Choose a challenge that fits your energy today.</p></div><span className="live-badge">Training</span></div><div className="resource-list">{error ? <p className="error-message">{error}</p> : workouts.length ? workouts.map((workout) => <article className="resource-row" key={workout._id ?? workout.id}><div><strong>{workout.title}</strong><span>{workout.description || workout.activityType}</span></div><b>{workout.durationMinutes} min</b></article>) : <p className="empty-state">No workouts are available yet.</p>}</div></section>
}

export default Workouts