export async function saveFile(filename: string, content: string): Promise<void> {
  const res = await fetch('/api/admin/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, content }),
  })
  if (!res.ok) throw new Error(`Save failed: ${res.status}`)
}
