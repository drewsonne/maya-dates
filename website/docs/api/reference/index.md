---
title: API Reference
sidebar_label: API Reference
---

## Enumerations

| Enumeration | Description |
| ------ | ------ |
| [HaabMonths](enumerations/HaabMonths.md) | - |
| [TzolkinDays](enumerations/TzolkinDays.md) | - |

## Classes

| Class | Description |
| ------ | ------ |
| [Base](classes/Base.md) | - |
| [CalendarRound](classes/CalendarRound.md) | A combination of 260-day cycles and the Haab cycle. This class should not be instantiated directly, and should be accessed through getCalendarRound. |
| [CalendarRoundFactory](classes/CalendarRoundFactory.md) | Parses Calendar Round strings into concrete objects. |
| [CalendarRoundIterator](classes/CalendarRoundIterator.md) | - |
| [CalendarRoundWildcard](classes/CalendarRoundWildcard.md) | Expand a Calendar Round containing wildcards into all valid combinations. |
| [Comment](classes/Comment.md) | Represents a free form comment that can be attached to many structures. |
| [CommentWrapper](classes/CommentWrapper.md) | Mixin providing comment functionality for domain objects. |
| [CorrelationConstant](classes/CorrelationConstant.md) | Correlation Constant to align Long Counts with Western Calendars |
| [Cycle](classes/Cycle.md) | - |
| [DistanceNumber](classes/DistanceNumber.md) | Minimal interface used for equality comparison across calendar components. |
| [Factory](classes/Factory.md) | An abstract class to handle the create of an object from a string |
| [FullDate](classes/FullDate.md) | Minimal interface used for equality comparison across calendar components. |
| [FullDateFactory](classes/FullDateFactory.md) | Given a fullDate composed of a Long Count and a Calendar Round, create a FullDate object. |
| [FullDateWildcard](classes/FullDateWildcard.md) | Expand a partial [FullDate](classes/FullDate.md) into all valid permutations. |
| [GregorianCalendarDate](classes/GregorianCalendarDate.md) | Represent a Gregorian date. |
| [GregorianFactory](classes/GregorianFactory.md) | Factory for creating [GregorianCalendarDate](classes/GregorianCalendarDate.md) instances from Gregorian date strings. |
| [Haab](classes/Haab.md) | Describes a Haab fullDate with a position and a month |
| [HaabMonth](classes/HaabMonth.md) | Haab month component of a Calendar Round date. |
| [HashMap](classes/HashMap.md) | Simple bidirectional map used to translate between indexes and values. |
| [JulianCalendarDate](classes/JulianCalendarDate.md) | Represent a Julian date. |
| [LongCount](classes/LongCount.md) | Long Count cycle. |
| [LongcountAddition](classes/LongcountAddition.md) | Base class for operations that manipulate [LongCount](classes/LongCount.md) values. |
| [LongCountFactory](classes/LongCountFactory.md) | Parses textual representations of Long Count dates. |
| [LongcountOperation](classes/LongcountOperation.md) | Base class for operations that manipulate [LongCount](classes/LongCount.md) values. |
| [LongcountSubtraction](classes/LongcountSubtraction.md) | Base class for operations that manipulate [LongCount](classes/LongCount.md) values. |
| [LongCountWildcard](classes/LongCountWildcard.md) | Expand a [LongCount](classes/LongCount.md) containing wildcards into all valid dates. |
| [LordOfTheNight](classes/LordOfTheNight.md) | Describes one of the 9 Lords of the night. This class is accessible through its instantiated values, or the get() method. |
| [NumberCoefficient](classes/NumberCoefficient.md) | - |
| [Tzolkin](classes/Tzolkin.md) | Describes a fullDate in the 260-day cycle with a position and a day |
| [TzolkinDay](classes/TzolkinDay.md) | Describes only the day component of a 260-day cycle |
| [WesternCalendar](classes/WesternCalendar.md) | - |
| [Wildcard](classes/Wildcard.md) | Minimal interface used for equality comparison across calendar components. |
| [WildcardCoefficient](classes/WildcardCoefficient.md) | - |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [ICoefficient](interfaces/ICoefficient.md) | - |
| [IComponent](interfaces/IComponent.md) | - |
| [ILongcount](interfaces/ILongcount.md) | - |
| [IPart](interfaces/IPart.md) | Minimal interface used for equality comparison across calendar components. |

## Variables

| Variable | Description |
| ------ | ------ |
| [calendarRoundOrigin](variables/calendarRoundOrigin.md) | The Calendar Round base date: 4 Ajaw 8 Kumk'u. |
| [lords](variables/lords.md) | - |

## Functions

| Function | Description |
| ------ | ------ |
| [coefficientParser](functions/coefficientParser.md) | - |
| [getCalendarRound](functions/getCalendarRound.md) | Return a comparable instance of a Calendar Round. |
| [getCorrelationConstant](functions/getCorrelationConstant.md) | Return a Lord of the Night by its G id. |
| [getHaab](functions/getHaab.md) | Return a comparable HaabMonth instantiation. |
| [getHaabMonth](functions/getHaabMonth.md) | - |
| [getTzolkin](functions/getTzolkin.md) | Return a comparable instance of a Tzolkin date. |
| [getTzolkinDay](functions/getTzolkinDay.md) | - |
| [isComment](functions/isComment.md) | Type guard to check if a value is a [Comment](classes/Comment.md) instance. |
| [isNumberPrimitive](functions/isNumberPrimitive.md) | Determine if a value is a number primitive. |
| [isPart](functions/isPart.md) | Type guard to ensure a value implements [IPart](interfaces/IPart.md). |
| [isStringPrimitive](functions/isStringPrimitive.md) | Determine if a value is a string primitive. |
| [isWildcard](functions/isWildcard.md) | - |
| [wrapsComment](functions/wrapsComment.md) | Type guard for [CommentWrapper](classes/CommentWrapper.md). |
