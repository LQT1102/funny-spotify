import { HistoryStatusType } from "./types";

export const COLOR_HISTORY_STATUS: { [key in HistoryStatusType]: string } = {
  FAILED: "neutral.danger",
  ON_PROGRESS: "primary.brownLight",
  SUCCESS: "neutral.complete",
};