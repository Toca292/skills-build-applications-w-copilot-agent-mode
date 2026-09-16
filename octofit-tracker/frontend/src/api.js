export function getApiUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/${resource}/`
    : `/api/${resource}/`
}

export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  const collection = payload.results ?? payload.data ?? payload.items
  return Array.isArray(collection) ? collection : []
}

export async function fetchItems(resource, signal) {
  const endpoint = resource.startsWith('http') || resource.startsWith('/') ? resource : getApiUrl(resource)
  const response = await fetch(endpoint, { signal })
  if (!response.ok) throw new Error(`Unable to load ${resource}`)
  return getItems(await response.json())
}