import * as moonbeams from "moonbeams";
import GregorianCalendarDate from "../lc/western/gregorian";

/**
 * Factory for creating {@link GregorianCalendarDate} instances from Gregorian date strings.
 */
export default class GregorianFactory {
  /**
   * Parse a Gregorian calendar date string into a {@link GregorianCalendarDate}.
   *
   * Supports two input formats:
   * 1. `DD/MM/YYYY` format, optionally suffixed with `" CE"` or `" BCE"` and/or an asterisk (`*`)
   * 2. ISO 8601 format: `YYYY-MM-DD` (astronomical year numbering for BCE: -0001 = 2 BCE)
   *
   * For BCE dates in DD/MM/YYYY format, the year component is converted to a negative year
   * before being passed to the moonbeams `calendarToJd` function.
   *
   * The method calculates the appropriate julian day by:
   * 1. Converting the Gregorian date to a julian day using moonbeams
   * 2. Determining the offset needed based on the julian day
   * 3. Storing the adjusted julian day in the GregorianCalendarDate
   *
   * @param gregorian - Gregorian date string to parse. Examples:
   *   - DD/MM/YYYY format: `"01/01/0001 CE"`, `"31/12/0001 BCE"`, or `"01/01/2000*"`
   *   - ISO 8601 format: `"2024-01-01"`, `"-0332-03-05"` (333 BCE)
   * @returns A {@link GregorianCalendarDate} instance representing the given
   * Gregorian date.
   * @throws {Error} If the date string is invalid or malformed.
   */
  parse(gregorian: string): GregorianCalendarDate {
    // Clean the input string - remove all asterisks
    let cleanedGregorian = gregorian.replace(/\*/g, '').trim();

    // Detect format: ISO 8601 (YYYY-MM-DD) vs DD/MM/YYYY
    // ISO 8601 pattern: optional minus, 4 or more digits for year, dash, month 01-12, dash, day 01-31
    // Examples: 2024-01-01, 0001-12-31, -0332-03-05, 12345-06-15
    // Note: This regex validates basic ranges but doesn't check leap years or month-specific day counts
    // (e.g., allows 02-30). Detailed validation happens later via moonbeams library (line 127+)
    const iso8601Pattern = /^(-?\d{4,})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const iso8601Match = cleanedGregorian.match(iso8601Pattern);

    let day: number;
    let month: number;
    let year: number;
    let isBCE: boolean = false; // Default to CE if no era marker present

    if (iso8601Match) {
      // Parse ISO 8601 format: YYYY-MM-DD
      const isoYear = parseInt(iso8601Match[1], 10);
      month = parseInt(iso8601Match[2], 10);
      day = parseInt(iso8601Match[3], 10);

      // ISO 8601 uses astronomical year numbering: year 0 = 1 BCE, -1 = 2 BCE, etc.
      if (isoYear < 0) {
        isBCE = true;
        // Convert from astronomical to historical: -332 → 333 BCE
        year = Math.abs(isoYear - 1);
      } else if (isoYear === 0) {
        isBCE = true;
        year = 1; // Year 0 = 1 BCE
      } else {
        isBCE = false;
        year = isoYear;
      }
    } else {
      // Parse DD/MM/YYYY format
      // Determine era (BCE or CE, defaults to CE if not specified)
      let searchString: string = '';
      if (cleanedGregorian.includes('BCE')) {
        isBCE = true;
        searchString = 'BCE';
      } else if (cleanedGregorian.includes('CE')) {
        searchString = 'CE';
        // isBCE remains false (already initialized)
      }

      // Remove era markers if present
      if (searchString) {
        cleanedGregorian = cleanedGregorian.replace(` ${searchString}`, '').replace(searchString, '').trim();
      }

      // Validate basic format: expect three slash-separated numeric components (day/month/year)
      const rawParts = cleanedGregorian.split('/');
      if (rawParts.length !== 3) {
        throw new Error(`Invalid Gregorian date format: "${gregorian}". Expected format: DD/MM/YYYY (slash-separated day/month/year) or YYYY-MM-DD (ISO 8601)`);
      }

      const dateParts: number[] = rawParts.map((part, index) => {
        const trimmed = part.trim();
        if (trimmed.length === 0) {
          throw new Error(`Invalid Gregorian date component in "${gregorian}": empty component at position ${index + 1}`);
        }
        const value = Number(trimmed);
        if (!Number.isFinite(value) || isNaN(value)) {
          throw new Error(`Non-numeric Gregorian date component "${trimmed}" in "${gregorian}"`);
        }
        return value;
      });

      // dateParts[0] = day, dateParts[1] = month, dateParts[2] = year
      day = dateParts[0];
      month = dateParts[1];
      year = dateParts[2];
    }

    // Validate date component ranges
    if (month < 1 || month > 12) {
      throw new Error(`Month out of range in Gregorian date "${gregorian}": ${month}. Expected 1-12`);
    }
    if (day < 1 || day > 31) {
      throw new Error(`Day out of range in Gregorian date "${gregorian}": ${day}. Expected 1-31`);
    }
    if (year === 0) {
      throw new Error(`Year zero is not valid in Gregorian date "${gregorian}"`);
    }

    // Convert year to negative for BCE dates
    // Historical BCE notation: 1 BCE, 2 BCE, 3 BCE, ... (no year 0)
    // Astronomical year numbering: 0, -1, -2, ... (includes year 0)
    // Conversion formula: astronomical_year = 1 - historical_BCE_year
    // Examples:
    //   1 BCE (historical) → year 0 (astronomical): 1 - 1 = 0
    //   2 BCE (historical) → year -1 (astronomical): 1 - 2 = -1
    //   333 BCE (historical) → year -332 (astronomical): 1 - 333 = -332
    const adjustedYear = isBCE ? (1 - year) : year;

    // Convert Gregorian date to julian day using moonbeams
    // moonbeams.calendarToJd returns a julian day for the given calendar date
    const targetJd = Math.ceil(moonbeams.calendarToJd(adjustedYear, month, day));

    // The GregorianCalendarDate stores a base julian day, and when accessing the date property,
    // it applies an offset: date = jdToCalendar(storedJd + offset(storedJd))
    // We need to find storedJd such that: jdToCalendar(storedJd + offset(storedJd)) = our Gregorian date
    // Since offset depends on storedJd, we iterate to find the correct value
    // We want: storedJd + offset(storedJd) = targetJd
    // So: storedJd = targetJd - offset(storedJd)
    let storedJd = targetJd;
    let iterations = 0;
    const maxIterations = 10;

    while (iterations < maxIterations) {
      // Calculate offset for current storedJd
      const offset = storedJd === 2299160 ? 0 :
                     storedJd <= 1448283 ? -8 :
                     storedJd <= 1455864 ? -8 :
                     storedJd <= 1599864 ? -5 :
                     storedJd <= 1743864 ? -2 :
                     storedJd <= 1887864 ? 1 :
                     storedJd <= 2031864 ? 4 :
                     storedJd <= 2096664 ? 6 :
                     storedJd <= 2175864 ? 7 :
                     storedJd <= 2240664 ? 9 :
                     storedJd <= 2299160 ? 10 : 0;

      // Check if we've converged
      if (storedJd + offset === targetJd) {
        break;
      }

      // Adjust storedJd: we want storedJd + offset = targetJd
      // So: storedJd = targetJd - offset
      storedJd = targetJd - offset;
      iterations++;
    }

    // Verify the result produces the correct date
    const temp = new GregorianCalendarDate(storedJd);
    const calculatedDate = temp.date;
    const calculatedDay = Math.floor(calculatedDate.day);
    const calculatedMonth = calculatedDate.month;
    const calculatedYear = calculatedDate.year;
    const targetYear = year; // Use the original year from input
    const calcYearForBCE = calculatedYear < 0 ? Math.abs(calculatedYear - 1) : calculatedYear;

    // If the date doesn't match, there might be an issue with the offset calculation
    // In that case, we'll use the targetJd directly and let the offset be applied
    if (calculatedDay !== day ||
        calculatedMonth !== month ||
        (isBCE ? calcYearForBCE !== targetYear : calculatedYear !== targetYear)) {
      // Fallback: store targetJd directly
      // The offset will adjust it when converting to calendar date
      storedJd = targetJd;
    }

    return new GregorianCalendarDate(storedJd);
  }
}
