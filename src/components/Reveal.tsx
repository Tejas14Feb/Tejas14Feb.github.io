import { type ComponentPropsWithoutRef, type ElementType, useEffect, useRef } from 'react'

type PolymorphicProps<E extends ElementType> = {
  as?: E
  delay?: number
} & Omit<ComponentPropsWithoutRef<E>, 'as' | 'delay'>

export default function Reveal<E extends ElementType = 'div'>({
  as,
  delay = 0,
  className,
  children,
  ...rest
}: PolymorphicProps<E>) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  const Tag = (as ?? 'div') as ElementType
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={['reveal', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  )
}
