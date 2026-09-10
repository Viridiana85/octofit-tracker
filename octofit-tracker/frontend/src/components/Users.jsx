import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getCollection('users').then(setUsers).catch((loadError) => setError(loadError.message)) }, [])
  return <section><div className="page-heading"><div><p className="eyebrow">Your training network</p><h1>Users</h1></div></div>{error && <p className="alert alert-warning">{error}</p>}<div className="data-table-wrap"><table className="data-table"><thead><tr><th>Name</th><th>Email</th><th>City</th><th>Level</th><th>Weekly goal</th></tr></thead><tbody>{users.map((user) => <tr key={user._id ?? user.email}><td><strong>{user.name}</strong></td><td>{user.email}</td><td>{user.city}</td><td><span className="level">{user.fitnessLevel}</span></td><td>{user.weeklyGoal} min</td></tr>)}</tbody></table>{!users.length && !error && <p className="empty-state">No users found.</p>}</div></section>
}

export default Users