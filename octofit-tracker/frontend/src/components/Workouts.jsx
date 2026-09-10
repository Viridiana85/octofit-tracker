import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getCollection('workouts').then(setWorkouts).catch((loadError) => setError(loadError.message)) }, [])
  return <section><div className="page-heading"><div><p className="eyebrow">Build your next session</p><h1>Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div>{error && <p className="alert alert-warning">{error}</p>}<div className="card-grid">{workouts.map((workout) => <article className="info-card workout-card" key={workout._id ?? workout.title}><div className="card-topline"><span className="tag">{workout.category}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><footer><span>{workout.difficulty}</span><span>{workout.targetArea}</span></footer></article>)}</div>{!workouts.length && !error && <p className="empty-state">No workouts available yet.</p>}</section>
}

export default Workouts