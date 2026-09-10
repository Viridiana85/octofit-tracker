import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getCollection(activitiesEndpoint).then(setActivities).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">Training log</p><h1>Activities</h1></div><span className="count-badge">{activities.length} records</span></div>
      {error && <p className="alert alert-warning">{error}. Check the API and your environment settings.</p>}
      <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Type</th><th>Date</th><th>Duration</th><th>Distance</th><th>Calories</th></tr></thead><tbody>
        {activities.map((activity) => <tr key={activity._id ?? `${activity.type}-${activity.date}`}><td><strong>{activity.type}</strong></td><td>{activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</td><td>{activity.durationMinutes} min</td><td>{activity.distanceKm ? `${activity.distanceKm} km` : '—'}</td><td>{activity.caloriesBurned ?? '—'} kcal</td></tr>)}
      </tbody></table>{!activities.length && !error && <p className="empty-state">No activities recorded yet.</p>}</div>
    </section>
  )
}

export default Activities