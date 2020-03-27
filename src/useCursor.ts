import { useState, useCallback, useMemo } from "react";
import { mapCursorToMax } from "map-cursor-to-max";

export const useCursor = ({
  max,
  initialCursor = 0
}: {
  max: number;
  initialCursor?: number;
}) => {
  const [cursor, setCursor] = useState(initialCursor);

  const handlePrev = useCallback(() => setCursor(n => n - 1), []);
  const handleNext = useCallback(() => setCursor(n => n + 1), []);
  const handleCursor = useCallback(
    (nextCursor: number) => setCursor(nextCursor),
    []
  );

  const index = useMemo(() => mapCursorToMax(cursor, max), [cursor, max]);

  return {
    handlePrev,
    handleNext,
    setCursor: handleCursor,
    cursor,
    index
  };
};
