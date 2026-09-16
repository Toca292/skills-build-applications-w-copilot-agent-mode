import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

const LEADERBOARD_API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchItems(LEADERBOARD_API_URL, controller.signal).then(setEntries).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message) })
    return () => controller.abort()
  }, [])
  return <section><div className="page-heading"><div><p className="eyebrow">Team pulse</p><h2>Leaderboard</h2><p>Small wins add up. See who is setting the pace.</p></div><span className="live-badge">Ranked</span></div><div className="resource-list">{error ? <p className="error-message">{error}</p> : entries.length ? entries.map((entry, index) => <article className="resource-row" key={entry._id ?? entry.id}><div><strong>#{entry.rank ?? index + 1}</strong><span>{entry.userId?.displayName ?? entry.userId ?? 'Athlete'}</span></div><b>{entry.points ?? 0} pts</b></article>) : <p className="empty-state">No leaderboard entries yet.</p>}</div></section>
}

export default Leaderboard