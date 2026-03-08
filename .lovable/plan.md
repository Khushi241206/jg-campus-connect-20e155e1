

## Problem Analysis

The bug is a **timezone issue**. On line 117, `dateStr` is computed using `toISOString()` which converts to UTC. For users in timezones ahead of UTC (like IST, UTC+5:30), selecting February 3 at midnight local time converts to February 2 in UTC, causing the mismatch between the calendar selection and the date input below it.

Additionally, the date input field is too narrow, cutting off "2026".

## Plan

### 1. Fix timezone-safe date formatting (src/pages/Attendance.tsx)

Replace all `toISOString().split("T")[0]` calls with a local date formatter:

```typescript
const toLocalDateStr = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};
```

Apply this helper everywhere `toISOString().split("T")[0]` is used:
- Line 13: `todayStr` in `generateDailyAttendance`
- Line 26: `dateStr` inside the loop
- Line 29: future date check
- Line 117: main `dateStr` 
- Line 123: `isFutureDate` check
- Lines 225-228: week calendar `isSelected`, `isToday`, `isFuture`

### 2. Fix date input width (src/pages/Attendance.tsx, ~line 246)

Widen the date input so the full year is visible:
- Add `min-w-[140px] w-auto` to ensure the input is wide enough for "dd/mm/yyyy" format.

### 3. Fix onChange handler (line 247)

The `new Date(e.target.value + "T00:00:00")` approach can still cause timezone drift. Use explicit year/month/day parsing:

```typescript
onChange={e => {
  const [y, m, d] = e.target.value.split('-').map(Number);
  setSelectedDate(new Date(y, m - 1, d));
}}
```

**Files to edit:** `src/pages/Attendance.tsx` only.

