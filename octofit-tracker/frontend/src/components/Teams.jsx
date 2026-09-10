import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getCollection('teams').then(setTeams).catch((loadError) => setError(loadError.message)) }, [])
  return <section><div className="page-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div><span className="count-badge">{teams.length} teams</span></div>{error && <p className="alert alert-warning">{error}</p>}<div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id ?? team.name}><span className="team-swatch" style={{ backgroundColor: team.color || '#e56b5d' }} /><h2>{team.name}</h2><p className="muted">{team.city}</p><p>{team.description}</p></article>)}</div>{!teams.length && !error && <p className="empty-state">No teams created yet.</p>}</section>
}

export default Teams