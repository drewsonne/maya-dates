declare module 'moonbeams' {
  export interface MBCalendar {
    year: number
    month: number
    day: number
  }

  export function jdToCalendar(julianDate: number): MBCalendar;

  export function calendarToJd(year: number, month: number, day: number): number
}
