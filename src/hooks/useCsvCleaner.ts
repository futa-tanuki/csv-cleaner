import { useMemo } from "react";
import type { CleanerOptions } from "../types";

export function useCsvCleaner(
  rawText: string,
  options: CleanerOptions
) {
  const { cleanedText, stats } = useMemo(() => {
    const lines = rawText.split(/\r?\n/);

    const originalCount = lines.length;

    // 1. トリム
    let processed = options.trimWhitespace
      ? lines.map((l) => l.trim())
      : [...lines];

    // 2. 空行削除
    if (options.removeEmptyLines) {
      processed = processed.filter((l) => l !== "");
    }

    // 3. 重複削除
    if (options.dedupeLines) {
      const seen = new Set<string>();
      processed = processed.filter((l) => {
        if (seen.has(l)) return false;
        seen.add(l);
        return true;
      });
    }

    const finalCount = processed.length;

    return {
      cleanedText: processed.join("\n"),
      stats: {
        originalCount,
        finalCount,
        removedCount: originalCount - finalCount,
      },
    };
  }, [rawText, options]);

  return { cleanedText, stats };
}
