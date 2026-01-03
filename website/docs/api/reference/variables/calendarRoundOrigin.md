[**@drewsonne/maya-dates**](../index.md)

***

[@drewsonne/maya-dates](../index.md) / calendarRoundOrigin

# Variable: calendarRoundOrigin

> `const` **calendarRoundOrigin**: [`CalendarRound`](../classes/CalendarRound.md)

Defined in: [cr/calendar-round.ts:211](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/calendar-round.ts#L211)

The Calendar Round base date: 4 Ajaw 8 Kumk'u.

This corresponds to the Maya creation-era base date 13.0.0.0.0 in the Long Count,
which serves as "day zero" (Maya Day Number (MDN) = 0) for all calendrical calculations per [R1, R2].
MDN is analogous to Julian Day Number, but for the Maya calendar system.

**Scholarly Rationale:**
- This epoch is explicitly documented in Reingold, Dershowitz, & Clamen (1993) [R1] and 
  Martin & Skidmore (2012) [R2] as the standard anchor for Maya calendar calculations
- The date represents the completion of the 13th bak'tun at the beginning of the 
  current era in Maya cosmology
- Using this epoch ensures compatibility with correlation constants (GMT family: 
  584283, 584285, 584286) which all anchor to this same date

**Alternative Epochs:**
While historical dates like royal coronations could theoretically serve as alternative
anchors, changing the epoch would:
1. Break compatibility with all published correlation constants
2. Require recalculation of all Haab'/Tzolk'in offset formulas
3. Diverge from established scholarly practice

For these reasons, this implementation follows the standard epoch per academic literature.

## See

 - Reingold, Dershowitz, & Clamen (1993) - Calendrical Calculations, II [R1]
 - Martin & Skidmore (2012) - Exploring the 584286 Correlation [R2]
