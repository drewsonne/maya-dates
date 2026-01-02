# Maya calendrics math reference (agent-facing, implementation-oriented)

This document specifies **mathematical** rules for converting between:
- Maya **Long Count** (LC)
- Maya **Haabʼ** (365-day civil cycle)
- Maya **Tzolkʼin** (260-day ritual cycle)
- **Calendar Round** (Haabʼ × Tzolkʼin)
- Astronomical **Julian Day Number / Julian Date** (JDN/JD), plus **Gregorian** and **Julian** calendar dates

**Constraint:** Every *key* rule below is backed by academic or authoritative scholarly sources (see **Bibliography**).

---

## 1) Notation and core concepts

### 1.1 Integer day axis

Use an integer day axis:
- **JDN** = Julian Day Number (integer days) on the astronomers’ Julian-day scale [R6].
- **JD** = Julian Date (may include fractional day), with day boundaries at **noon UT**; **JDN** is the integer part associated with that noon-based day scale [R6].

> Practical note: calendrical work for civil midnights typically uses **JDN at 0h UT** by taking `JD = JDN + 0.5` (midnight) or by working purely in integer JDN and clearly defining “which midnight” you mean. The scholarly definition is noon-based [R6].

### 1.2 Maya Day Number (MDN) relative to the creation-era base

Define **MDN** = number of days elapsed since the Maya creation-era base date
**13.0.0.0.0 4 Ajaw 8 Kumk’u** [R2].

MDN is an integer with:
- **MDN = 0** on the creation-era day **13.0.0.0.0 4 Ajaw 8 Kumk’u** [R2].
- Converting between **MDN** and **JDN** requires a **correlation constant** `C`:
  - **JDN = MDN + C** [R2]
  - equivalently **MDN = JDN − C**.

---

## 2) Long Count (LC)

### 2.1 Units and fixed radices (normalized form)

Normalized Long Count is a mixed-radix representation with these exact unit sizes [R1, R2]:

- 1 **kʼin** = 1 day
- 1 **winal/uinal** = 20 kʼin
- 1 **tun** = 18 winal = 360 kʼin
- 1 **kʼatun** = 20 tun = 7,200 kʼin
- 1 **baktun** = 20 kʼatun = 144,000 kʼin

**Normalized component ranges** follow from those fixed radices:
- kʼin `k ∈ [0,19]`
- winal/uinal `u ∈ [0,17]`  (**always**, because 1 tun = 18 uinal) [R1, R2]
- tun `t ∈ [0,19]`
- kʼatun `ka ∈ [0,19]`
- baktun `b` is unbounded in principle (epigraphic practice often focuses on the 13-baktun era, but arithmetic does not require that).

### 2.2 LC → MDN (forward)

For LC written as `(b.ka.t.u.k)` the day-count since the base is [R1, R2]:

**MDN = 144000·b + 7200·ka + 360·t + 20·u + k**.  [R1, R2]

This is the primary Long Count arithmetic rule.

### 2.3 MDN → LC (decomposition, normalized)

Given MDN `d ≥ 0`, normalized components are obtained by Euclidean division using the unit sizes above [R1]:

- `b = ⌊d / 144000⌋`, remainder `r1 = d mod 144000`
- `ka = ⌊r1 / 7200⌋`, remainder `r2 = r1 mod 7200`
- `t = ⌊r2 / 360⌋`, remainder `r3 = r2 mod 360`
- `u = ⌊r3 / 20⌋`  (therefore `u ∈ [0,17]`), remainder `k = r3 mod 20` [R1]

---

## 3) Haabʼ (365-day civil cycle)

### 3.1 Representation

Represent a Haabʼ date as `(day, monthIndex)` where:
- `day ∈ [0,19]` counts elapsed days in the month [R1]
- `monthIndex ∈ [1,19]` where:
  - 1..18 are the regular 20-day months (Pop … Kumk’u/Cumku) [R1]
  - 19 is **Wayebʼ/Uayeb** (the 5 “monthless” days, defective month) [R1]

**Validity constraint:** if `monthIndex = 19` (Wayebʼ), then `day ∈ [0,4]` only [R1].

### 3.2 Anchor at the era day

The Long Count epoch day corresponds to Haabʼ **8 Kumk’u (Cumku)** [R1].
Using the month indexing above, Kumk’u is month 18 and day is 8 [R1].

So define the Haabʼ offset-at-epoch as:
- `haabEpochDay = 8`
- `haabEpochMonth = 18`  [R1]

### 3.3 MDN → Haabʼ (formula)

Define a 0-based “day-of-haab-year” index `H ∈ [0,364]`:
- `H = ( d + haabEpochDay + 20·(haabEpochMonth − 1) ) mod 365`  [R1]

Then:
- `monthIndex = ⌊H / 20⌋ + 1`  [R1]
- `day = H mod 20`  [R1]

**Wayebʼ validation (must be enforced):**
- If `monthIndex = 19` then require `day ≤ 4` (equivalently `H ∈ [360,364]`) [R1].

### 3.4 Haabʼ → MDN residue (mod 365 only)

A Haabʼ date does **not** identify a unique day on its own (no year number), but it identifies a residue class mod 365 [R1]:

- `H = 20·(monthIndex − 1) + day` (with Wayebʼ validity enforced) [R1]
- Then `d ≡ (H − (haabEpochDay + 20·(haabEpochMonth − 1))) (mod 365)` [R1]

---

## 4) Tzolkʼin (260-day ritual cycle)

### 4.1 Representation

Represent a Tzolkʼin date as `(number, nameIndex)` where:
- `number ∈ [1,13]`
- `nameIndex ∈ [1,20]` (with a fixed ordered name list; Ajaw/Ahau is typically the 20th) [R1].

### 4.2 Anchor at the era day

The Long Count epoch day is Tzolkʼin **4 Ajaw (Ahau)** [R1].  
With Ajaw/Ahau indexed as 20, the epoch is `(4, 20)` [R1].

So define:
- `tzEpochNumber = 4`
- `tzEpochName = 20` [R1]

### 4.3 Adjusted modulus

Use the “adjusted modulus” function returning 1..n (not 0..n−1) [R1]:

`adjmod(x, n) = ((x − 1) mod n) + 1`.  [R1]

### 4.4 MDN → Tzolkʼin (formula)

For MDN `d`, the Tzolkʼin pair is [R1]:

- `number = adjmod(d + tzEpochNumber, 13)`  [R1]
- `nameIndex = adjmod(d + tzEpochName, 20)` [R1]

### 4.5 Tzolkʼin → MDN residue (mod 260)

A Tzolkʼin date does not uniquely identify a day, but does uniquely determine `d mod 260` because 13 and 20 are coprime [R1].

Solve the simultaneous congruences [R1]:
- `d ≡ (number − tzEpochNumber) (mod 13)`
- `d ≡ (nameIndex − tzEpochName) (mod 20)`

Let:
- `a = (number − tzEpochNumber) mod 13`  (take in 0..12)
- `b = (nameIndex − tzEpochName) mod 20` (take in 0..19)

Then the unique solution modulo 260 is [R1] (using that 13⁻¹ mod 20 = 3):
- `d ≡ a + 13 · ( 3·(b − a) mod 20 )  (mod 260)`  [R1]

---

## 5) Calendar Round (CR) = (Haabʼ, Tzolkʼin)

### 5.1 Period

The Calendar Round repeats every **lcm(365, 260) = 18,980 days** (≈ 52 solar years) [R1].

### 5.2 Compatibility (existence) condition

Given a Haabʼ date (a residue `d ≡ r365 (mod 365)`) and a Tzolkʼin date (a residue `d ≡ r260 (mod 260)`), a Calendar Round day exists iff the two congruences are consistent [R7]:

- Let `g = gcd(365, 260) = 5`.
- A solution exists **iff** `r365 ≡ r260 (mod g)` i.e. `r365 ≡ r260 (mod 5)` [R7].

This is the missing “congruence compatibility condition” in many informal descriptions.

### 5.3 Solving for the actual day (CRT specialized to 365 and 260)

Assume compatibility holds. Solve:

- `d ≡ r365 (mod 365)`
- `d ≡ r260 (mod 260)`

Write `d = r365 + 365·t` and substitute:
- `r365 + 365·t ≡ r260 (mod 260)`
- `365·t ≡ (r260 − r365) (mod 260)`

Since `gcd(365,260)=5`, divide by 5:
- `73·t ≡ (r260 − r365)/5 (mod 52)` [R7]

Because `73 ≡ 21 (mod 52)` and `21⁻¹ ≡ 5 (mod 52)`, one convenient closed form is:
- `t ≡ 5 · ((r260 − r365)/5) (mod 52)`  [R7]
- which simplifies to: `t ≡ (r260 − r365) (mod 52)` (with the understanding that `(r260−r365)` is divisible by 5 due to compatibility).

Then one solution is:
- `d0 = r365 + 365·t`  (reduce `d0` modulo 18,980 if desired)

All solutions are:
- `d = d0 + 18980·n` for integer `n` [R1, R7].

---

## 6) Correlation constants (Maya ↔ JDN) and which offsets to support

### 6.1 The base anchor (scholarly)

The creation-era base day **13.0.0.0.0 4 Ajaw 8 Kumk’u** is explicitly used as the anchor for correlating Maya and European calendars [R2]. It is also treated as the Long Count epoch for algorithmic calendrical calculations [R1, R2].

### 6.2 Common GMT-family correlation constants

Scholarly discussion treats GMT as a *family* of close constants and explicitly identifies widely-used values [R2]:

- **584283** (often labeled “original GMT”)
- **584285** (often labeled “modified GMT”)
- **584286** (explicitly investigated/argued in Martin & Skidmore and part of modern correlation debate) [R2]

**Specification requirement:** If you cite [R2], you should either:
- include **584286** among supported correlations, **or**
- explicitly state why your supported set excludes it.

(From a math standpoint, supporting multiple constants is trivial: it is a fixed additive shift in the JDN↔MDN mapping.)

---

## 7) Gregorian/Julian calendar ↔ JDN (math spec, not “describe it”)

### 7.1 Calendar conventions

- Treat “Gregorian date” and “Julian calendar date” as **proleptic** calendars unless a historical adoption/cutover is explicitly specified (country-dependent). This matches how astronomical JDN formulas are typically used in computational calendrics [R5, R6].

- Use **astronomical year numbering** when interoperating with JD/JDN work:
  - year 0 exists (1 BCE = year 0, 2 BCE = year −1, …) [R6].
  - If you instead use BCE/CE without year 0, you must convert carefully.

### 7.2 Gregorian calendar date → JDN (Fliegel–Van Flandern form)

For Gregorian date `(Y, M, D)` (integers), define integer floors throughout [R5, R6]:

Let:
- `a = ⌊(14 − M)/12⌋`
- `y = Y + 4800 − a`
- `m = M + 12a − 3`

Then:
- `JDN = D + ⌊(153m + 2)/5⌋ + 365y + ⌊y/4⌋ − ⌊y/100⌋ + ⌊y/400⌋ − 32045`  [R5]

### 7.3 Julian calendar date → JDN (parallel form)

Using the same `a, y, m` definitions, the Julian-calendar version is [R5]:

- `JDN = D + ⌊(153m + 2)/5⌋ + 365y + ⌊y/4⌋ − 32083`  [R5]

### 7.4 JDN → Gregorian calendar date (integer algorithm specified as equations)

One standard inversion (used by authoritative references) is the Fliegel–Van Flandern style integer reconstruction [R6]. Given `JDN`:

Define:
- `L1 = JDN + 68569`
- `N  = ⌊4·L1 / 146097⌋`
- `L2 = L1 − ⌊(146097·N + 3)/4⌋`
- `I  = ⌊4000·(L2 + 1) / 1461001⌋`
- `L3 = L2 − ⌊1461·I/4⌋ + 31`
- `J  = ⌊80·L3 / 2447⌋`
- `D  = L3 − ⌊2447·J/80⌋`
- `L4 = ⌊J/11⌋`
- `M  = J + 2 − 12·L4`
- `Y  = 100·(N − 49) + I + L4`  [R6]

This yields Gregorian `(Y, M, D)`.

### 7.5 Gregorian/Julian date ↔ JD (with time-of-day)

If you need time-of-day `UT` in hours on a civil date, the Julian Date is [R6]:
- `JD = JDN + (UT/24) − 0.5`  (when `JDN` corresponds to the same civil date at midnight UT)
The authoritative convention is that JD increments at noon UT [R6]; always document which convention you’re using.

---

## 8) Validation checklist (math constraints that agents should enforce)

1) **Normalized LC ranges**: `k ∈ [0,19]`, `u ∈ [0,17]`, `t ∈ [0,19]`, `ka ∈ [0,19]` [R1, R2].  
2) **Haabʼ validity**: month 19 (Wayebʼ) only allows `day ∈ [0,4]` [R1].  
3) **Tzolkʼin validity**: `number ∈ [1,13]`, `nameIndex ∈ [1,20]` [R1].  
4) **CR compatibility**: residues must match mod 5 (`r365 ≡ r260 (mod 5)`) before attempting CRT solve [R7].  
5) **Correlation constant clarity**: always store/transport which constant is used (e.g., 584283 vs 584285 vs 584286) [R2].  
6) **Calendar system clarity**: always label whether a European date is **Gregorian** or **Julian**; they differ by a shifting offset across centuries [R6].

---

## Bibliography

- **[R1]** Reingold, Edward M.; Dershowitz, Nachum; Clamen, Stewart M. (1993). *Calendrical Calculations, II: Three Historical Calendars*. *Software—Practice & Experience* 23(4), pp. 383–404. (Mayan long count, haab, tzolkin algorithms and anchors.)  
  PDF: https://reingold.co/cc2-paper.pdf

- **[R2]** Martin, Simon; Skidmore, Joel (2012). “Exploring the 584286 Correlation between the Maya and European Calendars.” *The PARI Journal* 13(2), pp. 3–16. (Explicit base date 13.0.0.0.0 4 Ajaw 8 Kumk’u and correlation constants incl. 584285/584283, focus on 584286.)  
  PDF: https://www.mesoweb.com/pari/publications/journal/1302/Correlation.pdf

- **[R5]** Fliegel, Henry F.; Van Flandern, Thomas C. (1968). “A Machine Algorithm for Processing Calendar Dates.” *Communications of the ACM* 11(10), p. 657. DOI: 10.1145/364096.364097. (Widely used integer formulas for calendar↔JDN conversion.)  
  DOI landing: https://dl.acm.org/doi/10.1145/364096.364097

- **[R6]** U.S. Naval Observatory (USNO), Astronomical Applications. “Converting Between Julian Dates and Gregorian Calendar Dates” and “Julian Date Converter” (definitions of JD/JDN; authoritative conversion references, incl. Fliegel–Van Flandern style algorithms). Accessed 2026-01-02.  
  https://aa.usno.navy.mil/faq/JD_formula  
  https://aa.usno.navy.mil/data/JulianDate

- **[R7]** Standard Chinese Remainder Theorem with non-coprime moduli (existence iff residues agree modulo gcd). A representative scholarly reference:  
  Niven, Ivan; Zuckerman, Herbert S.; Montgomery, Hugh L. (1991). *An Introduction to the Theory of Numbers* (5th ed.). Wiley. (CRT solvability condition.)  

