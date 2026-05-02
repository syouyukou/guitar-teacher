export type Progress = {
  completedLessons: string[];
  notes: Record<string, string>;
  lastVisited: string | null;
};

const KEY = "guitar_progress";
const PROGRESS_EVENT = "guitar-teacher-progress";

/** Stable ref for SSR / hydration `useSyncExternalStore` snapshots. */
export const PROGRESS_SERVER_SNAPSHOT: Progress = {
  completedLessons: [],
  notes: {},
  lastVisited: null,
};

function emptyProgress(): Progress {
  return { completedLessons: [], notes: {}, lastVisited: null };
}

let snapshotCache: { raw: string; value: Progress } | null = null;

function invalidateProgressSnapshot() {
  snapshotCache = null;
}

/** Stable snapshot for `useSyncExternalStore` (same reference until localStorage JSON changes). */
export function getProgressSnapshot(): Progress {
  if (typeof window === "undefined") {
    return PROGRESS_SERVER_SNAPSHOT;
  }
  const raw = localStorage.getItem(KEY) ?? "";
  if (snapshotCache?.raw === raw) return snapshotCache.value;

  let value: Progress;
  if (!raw) {
    value = emptyProgress();
  } else {
    try {
      const p = JSON.parse(raw) as Partial<Progress>;
      value = {
        completedLessons: [...(p.completedLessons ?? [])],
        notes: { ...(p.notes ?? {}) },
        lastVisited: p.lastVisited ?? null,
      };
    } catch {
      value = emptyProgress();
    }
  }

  snapshotCache = { raw, value };
  return value;
}

export function subscribeProgress(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const listener = () => onStoreChange();
  window.addEventListener(PROGRESS_EVENT, listener);
  return () => window.removeEventListener(PROGRESS_EVENT, listener);
}

export function getProgress(): Progress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Progress) : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(progress: Progress) {
  if (typeof window === "undefined") return;
  invalidateProgressSnapshot();
  localStorage.setItem(KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function markComplete(lessonId: string) {
  const p = getProgress();
  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons.push(lessonId);
  }
  p.lastVisited = lessonId;
  saveProgress(p);
}

export function markIncomplete(lessonId: string) {
  const p = getProgress();
  p.completedLessons = p.completedLessons.filter((id) => id !== lessonId);
  saveProgress(p);
}

export function saveNote(lessonId: string, note: string) {
  const p = getProgress();
  p.notes[lessonId] = note;
  saveProgress(p);
}
