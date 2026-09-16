import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

const ACTIVITIES_API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchItems(ACTIVITIES_API_URL, controller.signal).then(setActivities).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return (
    <ResourcePage title="Activities" description="Recent movement across your teams." error={error}>
      {activities.map((activity) => (
        <article className="resource-row" key={activity._id ?? activity.id}>
          <div><strong>{activity.type ?? 'Activity'}</strong><span>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Date pending'}</span></div>
          <b>{activity.points ?? 0} pts</b>
        </article>
      ))}
      {!activities.length && !error && <EmptyState />}
    </ResourcePage>
  )
}

function ResourcePage({ title, description, error, children }) {
  return <section><div className="page-heading"><div><p className="eyebrow">Tracker view</p><h2>{title}</h2><p>{description}</p></div><span className="live-badge">Live data</span></div><div className="resource-list">{error ? <p className="error-message">{error}</p> : children}</div></section>
}

function EmptyState() { return <p className="empty-state">No records yet. Your next entry will appear here.</p> }

export default Activities