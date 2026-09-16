import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

const TEAMS_API_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchItems(TEAMS_API_URL, controller.signal).then(setTeams).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message) }); return () => controller.abort() }, [])
  return <section><div className="page-heading"><div><p className="eyebrow">Find your people</p><h2>Teams</h2><p>Build momentum together and keep every challenge social.</p></div><span className="live-badge">Community</span></div><div className="resource-list">{error ? <p className="error-message">{error}</p> : teams.length ? teams.map((team) => <article className="resource-row" key={team._id ?? team.id}><div><strong>{team.name}</strong><span>{team.description || 'A team ready for its next challenge.'}</span></div><b>{team.memberIds?.length ?? 0} members</b></article>) : <p className="empty-state">No teams yet. Create one to get started.</p>}</div></section>
}

export default Teams