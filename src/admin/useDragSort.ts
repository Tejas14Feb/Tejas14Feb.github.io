import { useRef, useState } from 'react'

export function useDragSort<T>(list: T[], setList: (next: T[]) => void) {
  const fromRef = useRef<number | null>(null)
  const [overIdx, setOverIdx] = useState<number | null>(null)

  const dragHandleProps = (i: number) => ({
    draggable: true as const,
    onDragStart: (e: React.DragEvent) => {
      fromRef.current = i
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', String(i))
    },
    onDragEnd: () => {
      fromRef.current = null
      setOverIdx(null)
    },
  })

  const dropZoneProps = (i: number) => ({
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      if (overIdx !== i) setOverIdx(i)
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault()
      const from = fromRef.current
      if (from !== null && from !== i) {
        const next = [...list]
        const [item] = next.splice(from, 1)
        next.splice(i, 0, item)
        setList(next)
      }
      fromRef.current = null
      setOverIdx(null)
    },
    onDragLeave: (e: React.DragEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) setOverIdx(null)
    },
  })

  return { overIdx, dragHandleProps, dropZoneProps }
}
