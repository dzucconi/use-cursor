import { useState, useCallback, useMemo, useEffect } from "react";
import { mapCursorToMax } from "map-cursor-to-max";

export const useCursor = ({
  max,
  initialCursor = 0,
}: {
  max: number;
  initialCursor?: number;
}) => {
  const [cursor, setCursor] = useState(initialCursor);

  useEffect(() => setCursor(initialCursor), [initialCursor]);

  const handlePrev = useCallback(() => setCursor((n) => n - 1), []);
  const handleNext = useCallback(() => setCursor((n) => n + 1), []);

  const index = useMemo(() => mapCursorToMax(cursor, max), [cursor, max]);

  return {
    handlePrev,
    handleNext,
    setCursor,
    cursor,
    index,
  };
};
