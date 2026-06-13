# Refactor: Extract helpers in regret-entry.mjs

## Summary

Refactored `regret-entry.mjs` (the Regrets regression testing wrapper module) to extract shared serialization helpers, reducing code duplication while preserving identical behavioral output.

## What Changed

### Extracted helpers:
- `lcSnapshot(obj)` — serializes LongCount/DistanceNumber to plain object
- `calendarPartSnapshot(part)` — serializes Tzolk'in/Haab' components
- `shiftSnapshot(original, shifted)` — serializes shift operation results

### Removed unused imports:
- `getTzolkin`, `getHaab`, `CalendarRound`, `getCalendarRound`, `CorrelationConstant`, `getCorrelationConstant`, `GregorianCalendarDate`, `NumberCoefficient`

### Behavioral contract:
**NO CHANGE** — all 8 clusters produce identical output for all 48 input/output pairs.

## 3-Verification Proof

This refactor was validated using the Regrets regression testing tool with 3 independent verifications:

### Verification 1: Regrets Fingerprints
All 8 clusters GREEN — fingerprints match the golden .regret files:

| Cluster | Fingerprint | Status |
|---------|------------|--------|
| longcount-from-mdn | 4a06vpw | ✅ PASS |
| distance-number-normalise | 3ydtvlh | ✅ PASS |
| tzolkin-from-daynumber | 4ry5873 | ✅ PASS |
| tzolkin-shift | 5s8zypt | ✅ PASS |
| haab-from-daynumber | 6bx713z | ✅ PASS |
| haab-shift | 3kh7296 | ✅ PASS |
| calendar-round-from-lc | 2botlv0 | ✅ PASS |
| longcount-addition | 3h23qg7 | ✅ PASS |

### Verification 2: Raw Output vs KEBENARAN 1
All 48 raw output pairs (8 clusters × multiple inputs) match the ground truth saved before refactoring:

| Cluster | Pairs Verified | Match |
|---------|---------------|-------|
| longcount-from-mdn | 7 | ✅ All match |
| distance-number-normalise | 5 | ✅ All match |
| tzolkin-from-daynumber | 7 | ✅ All match |
| tzolkin-shift | 5 | ✅ All match |
| haab-from-daynumber | 7 | ✅ All match |
| haab-shift | 5 | ✅ All match |
| calendar-round-from-lc | 7 | ✅ All match |
| longcount-addition | 5 | ✅ All match |

### Verification 3: Fingerprint Cross-Match with KEBENARAN 2
Fingerprints computed from post-refactor output match the stored KEBENARAN 2 fingerprints:

| Cluster | Computed | KEBENARAN 2 | Match |
|---------|----------|-------------|-------|
| calendar-round-from-lc | 2botlv0 | 2botlv0 | ✅ |
| distance-number-normalise | 3ydtvlh | 3ydtvlh | ✅ |
| haab-from-daynumber | 6bx713z | 6bx713z | ✅ |
| haab-shift | 3kh7296 | 3kh7296 | ✅ |
| longcount-addition | 3h23qg7 | 3h23qg7 | ✅ |
| longcount-from-mdn | 4a06vpw | 4a06vpw | ✅ |
| tzolkin-from-daynumber | 4ry5873 | 4ry5873 | ✅ |
| tzolkin-shift | 5s8zypt | 5s8zypt | ✅ |

## Conclusion

All 3 verifications GREEN. The refactor is **proven safe** — no behavioral change detected by any verification method.
