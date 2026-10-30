"use client";

import { useEffect, useState } from "react";
import {
  SEMESTER,
  computeSnapshot,
  formatPercent,
  pad,
  type Snapshot,
} from "@/lib/graduation";

function Digits({
  value,
  size,
  className = "",
}: {
  value: number;
  size: number;
  className?: string;
}) {
  const chars = pad(value, size).split("");
  const firstSignificant = chars.findIndex((char) => char !== "0");

  return (
    <span className={`digits ${className}`} aria-hidden="true">
      {chars.map((char, index) => (
        <span
          key={`${index}-${char}`}
          className={`digit${index < firstSignificant ? " digit--ghost" : ""}`}
          style={{ "--i": index } as React.CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function Unit({
  value,
  label,
  tone,
  index,
  size = 2,
}: {
  value: number;
  label: string;
  tone: "violet" | "mint" | "gold";
  index: string;
  size?: number;
}) {
  return (
    <div className={`unit unit--${tone}`}>
      <span className="unit-glow" aria-hidden="true" />
      <span className="unit-index" aria-hidden="true">
        {index}
      </span>
      <Digits value={value} size={size} className="digits--unit" />
      <span className="unit-label">{label}</span>
    </div>
  );
}

export function Countdown({ initial }: { initial: Snapshot }) {
  const [snap, setSnap] = useState<Snapshot>(initial);

  useEffect(() => {
    const tick = () => setSnap(computeSnapshot(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const progress = Math.min(100, Math.max(0, snap.progress));

  return (
    <div className="countdown">
      <section className="board" aria-label="Contagem regressiva">
        <article className={`days-card${snap.finished ? " days-card--done" : ""}`}>
          <span className="days-noise" aria-hidden="true" />
          <span className="days-ring" aria-hidden="true" />
          <span className="days-ring days-ring--two" aria-hidden="true" />

          <header className="days-top">
            <span className="pill">
              <span className="pill-dot" aria-hidden="true" />
              {snap.finished ? "Semestre encerrado" : "Contagem ao vivo"}
            </span>
            <span className="days-year">{SEMESTER.semester}</span>
          </header>

          <div className="days-figure">
            <Digits value={snap.days} size={3} className="digits--days" />
            <span className="days-word">dias</span>
          </div>

          <footer className="days-bottom">
            <span className="days-caption">
              {snap.finished
                ? "A colação de grau chegou. Parabéns!"
                : "até o último dia do semestre"}
            </span>
            <span className="days-date">{SEMESTER.targetLabel}</span>
          </footer>
        </article>

        <div className="units">
          <Unit value={snap.hours} label="horas" tone="gold" index="01" />
          <Unit value={snap.minutes} label="minutos" tone="violet" index="02" />
          <Unit value={snap.seconds} label="segundos" tone="mint" index="03" />
        </div>
      </section>

      <section className="progress-card" aria-label="Progresso do semestre">
        <div className="progress-head">
          <div>
            <p className="section-label">Progresso do semestre</p>
            <p className="progress-range">
              {SEMESTER.startLabel} <span aria-hidden="true">→</span>{" "}
              {SEMESTER.targetLabel}
            </p>
          </div>
          <p className="progress-value">
            <span className="progress-number">{formatPercent(progress)}</span>
            <span className="progress-symbol">%</span>
          </p>
        </div>

        <div
          className="rail"
          role="img"
          aria-label={`${formatPercent(progress)} por cento do semestre concluído`}
        >
          <span className="rail-track" aria-hidden="true" />
          <span
            className="rail-fill"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
          <span
            className="rail-knob"
            style={{ left: `${progress}%` }}
            aria-hidden="true"
          />
        </div>

        <div className="rail-legend" aria-hidden="true">
          <span>início</span>
          <span>reta final</span>
          <span>colação</span>
        </div>
      </section>

      <section className="stats" aria-label="Resumo">
        <div className="stat">
          <span className="stat-value">{pad(snap.weeks, 2)}</span>
          <span className="stat-label">semanas restantes</span>
        </div>
        <div className="stat">
          <span className="stat-value">{pad(snap.weekdays, 2)}</span>
          <span className="stat-label">dias úteis</span>
        </div>
        <div className="stat">
          <span className="stat-value">{pad(snap.weekendDays, 2)}</span>
          <span className="stat-label">fins de semana</span>
        </div>
      </section>

      <p className="live-summary" aria-live="polite">
        {snap.finished
          ? "O semestre acabou. Hora de comemorar a formatura."
          : `Faltam ${snap.days} dias, ${snap.hours} horas e ${snap.minutes} minutos para o fim do semestre.`}
      </p>
    </div>
  );
}
