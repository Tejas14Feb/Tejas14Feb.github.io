import DeskSetup from './DeskSetup'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <p className="section-tag">// Skills</p>
      <h2 className="section-title" id="skills-heading">
        Skills &amp; <span>Tech Stack</span>
      </h2>
      <div className="section-line" aria-hidden="true" />

      <p
        style={{
          color: 'var(--muted)',
          fontSize: '0.8rem',
          fontFamily: 'var(--mono)',
          textAlign: 'center',
          marginTop: '1.25rem',
          letterSpacing: '0.03em',
        }}
      >
        // click a tab to explore tools
      </p>

      <DeskSetup />
    </section>
  )
}
