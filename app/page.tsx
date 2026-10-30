import { Countdown } from "@/components/Countdown";
import { LiveClock } from "@/components/LiveClock";
import { SEMESTER, computeSnapshot } from "@/lib/graduation";

export const dynamic = "force-dynamic";

function CapMark() {
  return (
    <svg viewBox="0 0 64 64" className="cap" aria-hidden="true">
      <path
        d="M4 25.5 32 12l28 13.5L32 39 4 25.5Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M16 31.5V43c0 5 7.2 9 16 9s16-4 16-9V31.5l-16 7.6-16-7.6Z"
        fill="currentColor"
        opacity="0.45"
      />
      <path
        d="M60 25.5v16"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="60" cy="44.5" r="3.2" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const initial = computeSnapshot(Date.now());

  return (
    <div className="shell">
      <div className="backdrop" aria-hidden="true">
        <span className="aurora aurora--gold" />
        <span className="aurora aurora--violet" />
        <span className="aurora aurora--mint" />
        <span className="grid-lines" />
        <span className="grain" />
      </div>

      <div className="page">
        <header className="topbar">
          <a className="brand" href="#topo">
            <span className="brand-mark">
              <CapMark />
            </span>
            <span className="brand-text">
              <strong>Contador de Formatura</strong>
              <small>rumo à colação de grau</small>
            </span>
          </a>
          <LiveClock />
        </header>

        <main id="topo" className="main">
          <section className="hero">
            <p className="eyebrow">
              <span aria-hidden="true">//</span> turma {SEMESTER.semester}
            </p>
            <h1>
              O fim do semestre
              <br />
              <span className="gradient-text">está logo ali.</span>
            </h1>
            <p className="lede">
              Cada segundo aqui é um passo a mais rumo ao canudo — e um a menos
              de aula. A reta final já começou.
            </p>
          </section>

          <Countdown initial={initial} />

          <footer className="footer">
            <p className="footer-quote">
              “A jornada foi longa, mas a formatura é logo ali.”
            </p>
            <div className="footer-meta">
              <span>{SEMESTER.targetLabel} · 23:59 (BRT)</span>
              <span className="footer-sep" aria-hidden="true">
                /
              </span>
              <span>feito com café e ansiedade acadêmica</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
