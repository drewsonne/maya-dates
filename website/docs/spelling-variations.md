# Domain Model: Spelling Variation

Maya calendar names have been spelled in many different ways by different scholars and in different time periods. This library supports multiple orthographic conventions and can normalize alternative spellings to canonical forms.

## Orthographic Conventions

This library supports three main orthographic conventions:

1. **Modern Mayanist** - Contemporary epigraphic convention with glottalized consonants
2. **Modern Variant** - Common modern variant spellings found in recent literature
3. **Older 16th Century** - Traditional Thompson/Landa conventions from colonial sources

## Tzolkin Day Names

The 20 day names of the Tzolkin calendar have the following attested spellings:

| # | Canonical | Modern Mayanist | Modern Variant | Older 16th C | Alternative Forms |
|---|-----------|-----------------|----------------|--------------|-------------------|
| 1 | Imix | Imix[^1][^3][^4][^10] | Imix[^1][^3][^4][^10] | Imix[^1][^3][^4][^10] | — |
| 2 | Ik' | Ik'[^1][^4][^7] | Ik'[^1][^4][^7] | Ik[^3][^10] | — |
| 3 | Ak'bal | Ak'bal[^1][^4] | Ak'bal[^1][^4] | Akbal[^3][^10] | — |
| 4 | K'an | K'an[^1][^4] | K'an[^1][^4] | Kan[^3][^10] | — |
| 5 | Chikchan | Chikchan[^1][^4] | Chikchan[^1][^4] | Chicchan[^3][^10] | — |
| 6 | Kimi | Kimi[^1][^4][^7] | Kimi[^1][^4][^7] | Cimi[^3][^10] | — |
| 7 | Manik' | Manik[^1][^3][^10] | Manik'[^4] | Manik[^1][^3][^10] | — |
| 8 | Lamat | Lamat[^1][^3][^4][^10] | Lamat[^1][^3][^4][^10] | Lamat[^1][^3][^4][^10] | — |
| 9 | Muluk | Muluk[^1][^4] | Muluk[^1][^4] | Muluc[^3][^10] | — |
| 10 | Ok | Ok[^1][^4] | Ok[^1][^4] | Oc[^3][^10] | — |
| 11 | Chuwen | Chuwen[^1][^4] | Chuwen[^1][^4] | Chuen[^3][^10] | — |
| 12 | Eb | Eb[^1][^3][^4][^10] | Eb[^1][^3][^4][^10] | Eb[^1][^3][^4][^10] | — |
| 13 | Ben | Ben[^1][^3][^4][^10] | Ben[^1][^3][^4][^10] | Ben[^1][^3][^4][^10] | — |
| 14 | Ix | Ix[^1][^3][^4][^10] | Ix[^1][^3][^4][^10] | Ix[^1][^3][^4][^10] | — |
| 15 | Men | Men[^1][^3][^4][^10] | Men[^1][^3][^4][^10] | Men[^1][^3][^4][^10] | — |
| 16 | Kib | Kib[^1][^4] | Kib[^1][^4] | Cib[^3][^10] | — |
| 17 | Kaban | Kaban[^1][^4] | Kaban[^1][^4] | Caban[^3][^10] | — |
| 18 | Etz'nab | Etz'nab[^1][^3][^4][^10] | Edznab[^8][^9] | Etz'nab[^1][^3][^4][^10] | — |
| 19 | Kawak | Kawak[^1][^4] | Kawak[^1][^4] | Cauac[^3][^10] | — |
| 20 | Ajaw | Ajaw[^1][^4][^6][^7] | Ahaw[^5] | Ahau[^3][^10] | — |

## Haab Month Names

The 19 month names (18 regular months + Wayeb) have the following attested spellings:

| # | Canonical | Modern Mayanist | Modern Variant | Older 16th C | Alternative Forms |
|---|-----------|-----------------|----------------|--------------|-------------------|
| 1 | Pop | Pohp[^1] | Pop[^3][^4][^5][^10][^11] | Pop[^3][^4][^5][^10][^11] | — |
| 2 | Wo | Wo[^1][^4][^5] | Wo[^1][^4][^5] | Uo[^3][^10] | — |
| 3 | Sip | Sip[^1][^4][^5] | Sip[^1][^4][^5] | Zip[^3][^10] | — |
| 4 | Sotz' | Sots'[^1] | Sotz'[^4][^5] | Zotz'[^3][^10] | — |
| 5 | Sek | Tsek[^1] | Tzek[^3][^5][^6] | Zec[^2][^10] | Sek |
| 6 | Xul | Xul[^1][^3][^4][^5][^10] | Xul[^1][^3][^4][^5][^10] | Xul[^1][^3][^4][^5][^10] | — |
| 7 | Yaxk'in | Yaxk'in[^1][^4][^5][^6] | Yaxk'in[^1][^4][^5][^6] | Yaxkin[^3][^10] | — |
| 8 | Mol | Mol[^1][^3][^4][^5][^10] | Mol[^1][^3][^4][^5][^10] | Mol[^1][^3][^4][^5][^10] | — |
| 9 | Ch'en | Ch'en[^1][^3][^4][^5][^10] | Ch'en[^1][^3][^4][^5][^10] | Ch'en[^1][^3][^4][^5][^10] | — |
| 10 | Yax | Yax[^1][^3][^4][^5][^10] | Yax[^1][^3][^4][^5][^10] | Yax[^1][^3][^4][^5][^10] | — |
| 11 | Sak | Sak[^1][^4][^5] | Sak[^1][^4][^5] | Zac[^3][^10] | Zak |
| 12 | Keh | Keh[^1][^4][^5][^7] | Keh[^1][^4][^5][^7] | Ceh[^3][^10] | — |
| 13 | Mak | Mak[^1][^4][^5] | Mak[^1][^4][^5] | Mac[^3][^10] | — |
| 14 | K'ank'in | K'ank'in[^1][^4][^5] | K'ank'in[^1][^4][^5] | Kankin[^3][^10] | — |
| 15 | Muwan | Muwan[^1][^4][^5][^6] | Muwan[^1][^4][^5][^6] | Muan[^3][^10] | — |
| 16 | Pax | Pax[^1][^3][^4][^5][^10] | Pax[^1][^3][^4][^5][^10] | Pax[^1][^3][^4][^5][^10] | — |
| 17 | K'ayab | K'ayab[^1][^4][^5] | K'ayab[^1][^4][^5] | Kayab[^3][^10] | — |
| 18 | Kumk'u | Kumk'u[^1][^4][^5] | Kumk'u[^1][^4][^5] | Cumku[^3][^10] | — |
| 19 | Wayeb | Wayeb[^1][^4][^5] | Wayeb[^1][^4][^5] | Uayeb[^3][^10] | — |

## References

[^1]: Gerardo Aldana (2022). "Maya Calendar and Mesoamerican Astronomy". *Encyclopedia of the History of Science (Carnegie Mellon University)*. [https://ethos.lps.library.cmu.edu/article/id/520/](https://ethos.lps.library.cmu.edu/article/id/520/)
[^2]: D. H. Kelley (1980). "Astronomical Identities of Mesoamerican Gods". *Journal for the History of Astronomy (via NASA ADS full text)*. [https://adsabs.harvard.edu/full/1980JHAS...11....1K](https://adsabs.harvard.edu/full/1980JHAS...11....1K)
[^3]: Unknown (n.d.). "Maya Cycles of Time (PDF)". *Mathematical Association of America (maa.org PDF)*. [https://old.maa.org/sites/default/files/pdf/cms_upload/MayaTimeCycles2-143624.pdf](https://old.maa.org/sites/default/files/pdf/cms_upload/MayaTimeCycles2-143624.pdf)
[^4]: Simon Martin (2012). "Maya Calendars". *Expedition Magazine / Penn Museum*. [https://www.penn.museum/sites/expedition/maya-calendars/](https://www.penn.museum/sites/expedition/maya-calendars/)
[^5]: Maya Decipherment (David Stuart / collaborators) (n.d.). "Period Ending List (PDF)". *Maya Decipherment*. [https://mayadecipherment.com/resources/period-ending-list/period-ending-list.pdf](https://mayadecipherment.com/resources/period-ending-list/period-ending-list.pdf)
[^6]: David Stuart (2001). "Ritual and History in a Stucco Inscription from Temple XIX at Palenque". *PARI Journal (Pre-Columbian Art Research Institute)*. [https://www.precolumbia.org/pari/publications/journal/01/Ritual-and-History.pdf](https://www.precolumbia.org/pari/publications/journal/01/Ritual-and-History.pdf)
[^7]: David Stuart (2006). "The Inscriptions from Temple XIX at Palenque (Chapter 6 PDF excerpt)". *Mesoweb-hosted PDF*. [https://www.mesoweb.com/publications/stuart/TXIX/txixch6.pdf](https://www.mesoweb.com/publications/stuart/TXIX/txixch6.pdf)
[^8]: David Stuart (2007). "The Year 2012 and the End of the World (mentions Edznab in year-bearer context)". *Maya Decipherment*. [https://mayadecipherment.com/2007/05/08/the-year-2012-and-the-end-of-the-world/](https://mayadecipherment.com/2007/05/08/the-year-2012-and-the-end-of-the-world/)
[^9]: Karl Taube (2021). "Karl Taube: Works (PDF)". *University of California, Riverside repository (snippet)*. [https://escholarship.org/content/qt8t32t73q/qt8t32t73q.pdf](https://escholarship.org/content/qt8t32t73q/qt8t32t73q.pdf)
[^10]: J. Eric S. Thompson (1950). "Maya Hieroglyphic Writing: Introduction". *Mesoweb online edition*. [https://www.mesoweb.com/publications/Thompson/Thompson1950.html](https://www.mesoweb.com/publications/Thompson/Thompson1950.html)
[^11]: Alexandre Tokovinine et al. (2024). "Using 3D Scanner to Explore the Maya Calendar System on Caracol Altar 2 (and related discussion of Vague Year)". *Cambridge University Press (Antiquity Project Gallery)*. [https://www.cambridge.org/core/journals/antiquity/article/using-3d-scanner-to-explore-the-maya-calendar-system-on-caracol-altar-2-in-belize/53056A66BACB2A9C92B755E7B3E7D886](https://www.cambridge.org/core/journals/antiquity/article/using-3d-scanner-to-explore-the-maya-calendar-system-on-caracol-altar-2-in-belize/53056A66BACB2A9C92B755E7B3E7D886)
