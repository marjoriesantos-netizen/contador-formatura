export type SemesterConfig = {
  /** Início do período letivo (ISO 8601 com fuso). */
  start: string;
  /** Último instante do período letivo (ISO 8601 com fuso). */
  target: string;
  startLabel: string;
  targetLabel: string;
  semester: string;
};

export const SEMESTER: SemesterConfig = {
  start: "2026-08-01T00:00:00-03:00",
  target: "2026-12-17T23:59:59-03:00",
  startLabel: "01 ago 2026",
  targetLabel: "17 dez 2026",
  semester: "2026/2",
};

export type Snapshot = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  totalHours: number;
  weeks: number;
  weekdays: number;
  weekendDays: number;
  /** 0..100 */
  progress: number;
  finished: boolean;
};

const DAY_MS = 86_400_000;

const START_MS = new Date(SEMESTER.start).getTime();
const TARGET_MS = new Date(SEMESTER.target).getTime();

export const SEMESTER_SPAN_MS = TARGET_MS - START_MS;

function countWeekParts(now: number, target: number) {
  let weekdays = 0;
  let weekendDays = 0;

  // Conta a partir do próximo dia cheio para não inflar o "hoje".
  const cursor = new Date(now);
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  const last = new Date(target);
  last.setHours(0, 0, 0, 0);

  // Limite de segurança: no máximo ~2 anos de iteração.
  let guard = 0;
  while (cursor.getTime() <= last.getTime() && guard < 800) {
    const day = cursor.getDay();
    if (day === 0 || day === 6) weekendDays += 1;
    else weekdays += 1;
    cursor.setDate(cursor.getDate() + 1);
    guard += 1;
  }

  return { weekdays, weekendDays };
}

export function computeSnapshot(now: number): Snapshot {
  const remaining = Math.max(0, TARGET_MS - now);
  const totalSeconds = Math.floor(remaining / 1000);

  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  const elapsed = Math.min(Math.max(now - START_MS, 0), SEMESTER_SPAN_MS);
  const progress = SEMESTER_SPAN_MS > 0 ? (elapsed / SEMESTER_SPAN_MS) * 100 : 100;

  const { weekdays, weekendDays } = countWeekParts(now, TARGET_MS);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    totalHours: Math.floor(totalSeconds / 3_600),
    weeks: Math.floor(days / 7),
    weekdays,
    weekendDays,
    progress,
    finished: remaining <= 0,
  };
}

export const pad = (value: number, size = 2) =>
  String(Math.max(0, value)).padStart(size, "0");

export const formatPercent = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
