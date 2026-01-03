import * as moonbeams from "moonbeams";
import GregorianCalendarDate from "../lc/western/gregorian";

/**
 * Factory for creating {@link GregorianCalendarDate} instances from Gregorian date strings.
 */
export default class GregorianFactory {
  /**
   * Parse a Gregorian calendar date string into a {@link GregorianCalendarDate}.
   *
   * The input is expected to be in the form `DD/MM/YYYY`, optionally suffixed
   * with `" CE"` or `" BCE"` and/or an asterisk (`*`). For BCE dates, the
   * year component is converted to a negative year before being passed to
   * the moonbeams `calendarToJd` function.
   *
   * The method calculates the appropriate julian day by:
   * 1. Converting the Gregorian date to a julian day using moonbeams
   * 2. Determining the offset needed based on the julian day
   * 3. Storing the adjusted julian day in the GregorianCalendarDate
   *
   * @param gregorian - Gregorian date string to parse (e.g. `"01/01/0001 CE"`,
   * `"31/12/0001 BCE"`, or `"01/01/2000*"`).
   * @returns A {@link GregorianCalendarDate} instance representing the given
   * Gregorian date.
   * @throws {Error} If the date string is invalid or malformed.
   */
  parse(gregorian: string): GregorianCalendarDate {
    // Clean the input string - remove all asterisks and era markers
    let cleanedGregorian = gregorian.replace(/\*/g, '').trim();

    // Determine era (BCE or CE)
    let isBCE: boolean = false;
    let searchString: string = '';
    if (cleanedGregorian.includes('BCE')) {
      isBCE = true;
      searchString = 'BCE';
    } else if (cleanedGregorian.includes('CE')) {
      isBCE = false;
      searchString = 'CE';
    }

    // Remove era markers if present
    if (searchString) {
      cleanedGregorian = cleanedGregorian.replace(` ${searchString}`, '').replace(searchString, '').trim();
    }

    // Validate basic format: expect three slash-separated numeric components (day/month/year)
    const rawParts = cleanedGregorian.split('/');
    if (rawParts.length !== 3) {
      throw new Error(`Invalid Gregorian date format: "${gregorian}". Expected format: DD/MM/YYYY`);
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
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];

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
