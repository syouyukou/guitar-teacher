"use client";

import { useSyncExternalStore } from "react";
import {
  getProgressSnapshot,
  PROGRESS_SERVER_SNAPSHOT,
  subscribeProgress,
  type Progress,
} from "./progress";

export function useProgress(): Progress {
  return useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    () => PROGRESS_SERVER_SNAPSHOT
  );
}
