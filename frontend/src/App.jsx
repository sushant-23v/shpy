import React, { useEffect, useState } from 'react'

export default function App() {
  const [health, setHealth] = useState(null)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', email: '' })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const h = await fetch('/api/health')
        const healthJson = await h.json()
        setHealth(healthJson)

        const u = await fetch('/api/users')
        const usersJson = await u.json()
        setUsers(usersJson)
      } catch (e) {
        setError(e.message)
      }
    }
    fetchData()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to add user')
      }
      setUsers(prev => [...prev, data])
      setForm({ name: '', email: '' })
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, sans-serif', padding: 24 }}>
      <h1>Dockerized Fullstack App</h1>
      <p>Frontend (React + Vite) + Backend (Express) + Postgres (Docker)</p>

      <section style={{ marginTop: 16 }}>
        <h2>Health</h2>
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
          {health ? JSON.stringify(health, null, 2) : 'Loading...'}
        </pre>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Users</h2>
        {error && <div style={{ color: 'crimson', marginBottom: 8 }}>Error: {error}</div>}
        <ul>
          {users.map(u => (
            <li key={u.id}>{u.name} — {u.email}</li>
          ))}
        </ul>

        <form onSubmit={onSubmit} style={{ marginTop: 12, display: 'grid', gap: 8, maxWidth: 320 }}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <button type="submit">Add User</button>
        </form>
      </section>
    </div>
  )
}
