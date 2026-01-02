# Maya calendrics & conversion math (agent brief)

You are writing a **math-first, implementation-oriented specification** for converting between:
- **Maya Long Count (LC)**, plus derived **Tzolk’in** and **Haab’**
- **Julian Day Number / Julian Date** (astronomers’ continuous day count)
- **Gregorian calendar** and **Julian calendar** dates (with explicit conventions)

**Hard constraints**
- **No programming code examples** (no snippets, no pseudo-code). Use math, definitions, and stepwise logic.
- **Do not mention or rely on any specific software repository.**
- **Every key rule must be backed by academic or authoritative scholarly sources** (cite within your write-up using the bibliography provided at the end as [R1], [R2], …).

---

## 1) Core concept: reduce everything to an integer “day index”
Define an integer **N** that represents a count of whole days on a single continuous axis (no months/years). This is the backbone of all conversions.

### Julian Day / Julian Day Number conventions
- A **Julian Date (JD)** is a continuous count of days **starting at noon UT** on a defined epoch; it includes fractional days.
- A **Julian Day Number (JDN)** is the integer day label for a whole day in that system; **civil midnights** correspond to half-integers in JD (… .5) under the noon-based convention.

**Rule:** When you say “JDN” in the Maya-correlation context, be explicit whether you mean:
- (A) the **integer day number** used in correlation constants, or
- (B) a **noon-based JD** with fractional part rules.
State the convention once and stick to it.

---

## 2) Maya Long Count as mixed-radix arithmetic
A Long Count date is a 5-tuple:

**LC = (baktun, katun, tun, uinal, kin)**

with units:
- 1 **kin** = 1 day  
- 1 **uinal** = 20 kin  
- 1 **tun** = 18 uinal = 360 days  
- 1 **katun** = 20 tun = 7,200 days  
- 1 **baktun** = 20 katun = 144,000 days  

### 2.1 Forward (LC → day-count)
Define the **Maya day number** (days elapsed since a chosen Long Count epoch):

**MDN = 144000·b + 7200·k + 360·t + 20·u + i**

where (b,k,t,u,i) are the LC components.

### 2.2 Inverse (day-count → LC)
Given MDN, recover LC by integer division with remainders (a standard mixed-radix decomposition):
- b = ⌊MDN / 144000⌋, remainder r1 = MDN mod 144000  
- k = ⌊r1 / 7200⌋, remainder r2 = r1 mod 7200  
- t = ⌊r2 / 360⌋, remainder r3 = r2 mod 360  
- u = ⌊r3 / 20⌋, i = r3 mod 20  

### 2.3 Normalization constraints (carry/borrow rules)
For a **normalized** 5-tuple:
- kin i ∈ [0,19]
- uinal u ∈ [0,17] if you enforce tun=18 uinal (i.e., uinal base 18 at that digit boundary), otherwise allow [0,19] only if you explicitly model “overflow” into tun.
- tun t ∈ [0,19]
- katun k ∈ [0,19]
- baktun b is unbounded in principle, but scholarly usage often frames eras in 13-baktun cycles.

If you support **addition/subtraction of days** in LC-space, define it as:
1) convert LC → MDN, 2) add integer Δ, 3) decompose back → normalized LC.

---

## 3) Correlation constants (offsets) and what they mean
A **correlation constant** C ties a Maya base Long Count date to a JDN:
- “C expresses the base date of the Maya calendar as its Julian Day Number.”

### 3.1 Which “base date”?
Scholarly literature commonly treats the creation-era base as **13.0.0.0.0 4 Ajaw 8 Kumk’u**, while other algorithmic treatments anchor **0.0.0.0.0** as the epoch of the count. These are *representation choices* within a cycle concept; you must:
- state which LC you treat as “MDN = 0”
- define how that aligns to correlation constant C
- ensure **you do not change any historical day numbers**, only the representation convention.

### 3.2 The fundamental conversion identity
Once your epoch convention is fixed:

**JDN = C + MDN**

and inversely:

**MDN = JDN − C**

**C is a required parameter** (don’t hardcode it). The literature contains many proposed correlations; widely used values differ by a handful of days, and broader proposals differ by centuries.

Minimum required support:
- **584285** and **584283** as commonly used constants in the GMT family discussions.
Also describe:
- The GMT correlation as a “family” spanning a small range of day values (not a single number).
- The existence of dozens of proposed correlations and the fact that published constants can disagree substantially.

---

## 4) Haab’ (solar civil calendar): modular arithmetic on 365
The Haab’ is:
- 18 months × 20 days = 360
- plus 5 “monthless” unlucky days (Wayeb / Uayeb) = 365 total

### 4.1 Representation
Represent a Haab’ date as **(day, month)** with:
- day = number of elapsed days in the month (starts at **0**, not 1)
- month index: 1..18 for the regular months, and treat Wayeb as month 19 (defective)

### 4.2 Anchor at epoch
Fix a scholarly anchor for the Haab’ at the Long Count epoch:
- LC epoch corresponds to a specific Haab’ date used as a constant offset.

### 4.3 Compute Haab’ from MDN
Let H0 be the day-in-year index of the epoch’s Haab’ date expressed as:
**H0 = day0 + 20·(month0 − 1)**

Then the Haab’ day-in-year index is:

**H = (MDN + H0) mod 365**

Convert H back to (day, month) by:
- month = ⌊H / 20⌋ + 1
- day = H mod 20  
with the understanding that month=19 implies Wayeb and only days 0..4 are valid in that month.

**Important:** Haab’ alone does not uniquely identify an absolute date; it repeats every 365 days.

---

## 5) Tzolk’in (260-day ritual calendar): two simultaneous cycles
The Tzolk’in combines:
- a **13-number** cycle
- a **20-name** cycle  
advancing together each day, producing a 260-day repeat period.

### 5.1 Representation
Represent a Tzolk’in date as **(number, nameIndex)** with:
- number ∈ 1..13
- nameIndex ∈ 1..20  
(Actual name strings are a separate layer; math operates on indices.)

### 5.2 Anchor at epoch
Fix the epoch’s Tzolk’in date as constants (number0, name0).

### 5.3 Compute Tzolk’in from MDN
Use “adjusted modulus” so results land in 1..m rather than 0..m−1:

**adjMod(x, m) = ((x − 1) mod m) + 1**

Then:
- number = adjMod(MDN + number0, 13)
- nameIndex = adjMod(MDN + name0, 20)

**Important:** Tzolk’in alone does not uniquely identify an absolute date; it repeats every 260 days.

---

## 6) Calendar Round (Haab’ + Tzolk’in) and its math constraints
The pair (Haab’, Tzolk’in) repeats every:

**LCM(365, 260) = 18,980 days**

A “calendar round date” is the pair:
- a Haab’ (D, M)
- a Tzolk’in (d, n)

### 6.1 Existence condition
Not every Haab’+Tzolk’in pair can occur. Explain the congruence compatibility condition that determines whether a given pair is possible.

### 6.2 Locating occurrences
Given a target (Haab’, Tzolk’in) and a reference day index (or JDN), explain how to find:
- the latest occurrence on-or-before a given day, or
- the next occurrence after a given day  
by solving a small system of linear congruences modulo 365 and modulo 260, and then combining them modulo 18,980.

---

## 7) Gregorian vs Julian calendar: be explicit about conventions
Your conversion must state:
- whether “Gregorian” and “Julian” are treated as **proleptic** (rules extended backward indefinitely), or
- whether you model the **historical reform** cutover (different regions adopted at different times).

### 7.1 Year numbering and BCE handling
Astronomical year numbering includes a year 0; many historical conventions do not. State which convention you use for:
- negative years (BCE) in Gregorian calculations
- BCE labeling in Julian calculations  
and how you map between them.

### 7.2 Recommended approach (math, not code)
Describe Gregorian/Julian conversion in terms of:
1) calendar date → day index (e.g., JDN or another absolute-day scale)
2) day index → target calendar date  
so all Maya conversion composes cleanly through the same day index.

---

## 8) Edge cases & correctness guarantees (testable invariants)
List invariants that an implementation must satisfy purely by math:
- LC → MDN → LC round-trip yields the same normalized LC.
- Incrementing MDN by 1 advances:
  - kin by +1 with correct carries,
  - Haab’ by +1 mod 365,
  - Tzolk’in by +1 mod 260.
- Calendar Round recurrence every 18,980 days.
- Haab’ month/day validity: Wayeb only has 5 days.
- Parameter sensitivity: changing C by +1 shifts all mapped European dates by +1 day but preserves internal Maya-cycle structure.

Also describe how you will handle:
- negative day indices (dates before epoch),
- extremely large baktun values,
- ambiguous “day start” assumptions (sunset vs midnight) and why this does/doesn’t alter day-level integer mapping under your chosen convention.

---

## 9) Bibliography (cite as [R1], [R2], … in your spec)
[R1] Reingold, E. M., Dershowitz, N., & Clamen, S. M. “Calendrical Calculations, II: Three Historical Calendars.” *Software—Practice & Experience* 23(4), 383–404 (1993).
[R2] Martin, S., & Skidmore, J. “Exploring the 584286 Correlation between the Maya and European Calendars.” *The PARI Journal* 13(2), 3–16 (2012).
[R3] Böhm, V., et al. “Dating of Mayan calendar using long-periodic astronomical phenomena in Dresden Codex.” *Serbian Astronomical Journal* 186, 53–64 (2013).
[R4] Kennett, D. J., et al. “Correlating the Ancient Maya and Modern European Calendars with High-Precision AMS 14C Dating.” *Scientific Reports* 3:1597 (2013). doi:10.1038/srep01597
[R5] U.S. Naval Observatory (USNO). “Converting Between Julian Dates and Gregorian Calendar Dates / Julian Date definition (noon-based).” (authoritative astronomical definition).
