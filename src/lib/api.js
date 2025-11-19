const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export async function listCountries(){
  const r = await fetch(`${BASE}/countries`)
  return r.json()
}

export async function computeFlight(country){
  const r = await fetch(`${BASE}/flight`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ country })
  })
  return r.json()
}
