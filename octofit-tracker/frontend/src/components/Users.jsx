import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

const USERS_API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchItems(USERS_API_URL, controller.signal).then(setUsers).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message) }); return () => controller.abort() }, [])
  return <section><div className="page-heading"><div><p className="eyebrow">Your crew</p><h2>Users</h2><p>Meet the athletes powering the Octofit community.</p></div><span className="live-badge">Athletes</span></div><div className="resource-list">{error ? <p className="error-message">{error}</p> : users.length ? users.map((user) => <article className="resource-row" key={user._id ?? user.id}><div><strong>{user.displayName || user.username}</strong><span>{user.email}</span></div><b>@{user.username}</b></article>) : <p className="empty-state">No users have joined yet.</p>}</div></section>
}

export default Users