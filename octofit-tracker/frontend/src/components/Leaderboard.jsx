import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getCollection('leaderboard').then(setEntries).catch((loadError) => setError(loadError.message)) }, [])
  return <section><div className="page-heading"><div><p className="eyebrow">Community momentum</p><h1>Leaderboard</h1></div></div>{error && <p className="alert alert-warning">{error}</p>}<div className="data-table-wrap"><table className="data-table"><thead><tr><th>Rank</th><th>Athlete</th><th>Team</th><th>Points</th><th>Streak</th><th>Workouts</th></tr></thead><tbody>{entries.map((entry, index) => <tr key={entry._id ?? entry.userId ?? entry.userName}><td><span className="rank">{entry.rank ?? index + 1}</span></td><td><strong>{entry.userName}</strong></td><td>{entry.teamName}</td><td>{entry.points} pts</td><td>{entry.streakDays} days</td><td>{entry.workoutsCompleted}</td></tr>)}</tbody></table>{!entries.length && !error && <p className="empty-state">The leaderboard is waiting for its first results.</p>}</div></section>
}

export default Leaderboard