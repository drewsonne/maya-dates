import { LocaleDefinition } from '../types';

/**
 * Modern Mayanist Orthography
 *
 * Modern Mayanist convention with glottalized consonants (Pohp, Ik', Ak'bal)
 *
 * This file is auto-generated from maya_spellings_sources.json
 * DO NOT EDIT MANUALLY - run 'npm run generate:locales' to regenerate
 *
 * BIBLIOGRAPHY:
 * ALDANA2022_EHOS: Gerardo Aldana (2022). "Maya Calendar and Mesoamerican Astronomy". Encyclopedia of the History of Science (Carnegie Mellon University). https://ethos.lps.library.cmu.edu/article/id/520/
 * MARTIN2012_PENN: Simon Martin (2012). "Maya Calendars". Expedition Magazine / Penn Museum. https://www.penn.museum/sites/expedition/maya-calendars/
 * THOMPSON1950_MESOWEB: J. Eric S. Thompson (1950). "Maya Hieroglyphic Writing: Introduction". Mesoweb online edition. https://www.mesoweb.com/publications/Thompson/Thompson1950.html
 * STUART2001_PARI_TXIX: David Stuart (2001). "Ritual and History in a Stucco Inscription from Temple XIX at Palenque". PARI Journal (Pre-Columbian Art Research Institute). https://www.precolumbia.org/pari/publications/journal/01/Ritual-and-History.pdf
 * STUART_CH6_MESOWEB: David Stuart (2006). "The Inscriptions from Temple XIX at Palenque (Chapter 6 PDF excerpt)". Mesoweb-hosted PDF. https://www.mesoweb.com/publications/stuart/TXIX/txixch6.pdf
 * MAYADECIPHERMENT_PERIOD_ENDINGS: Maya Decipherment (David Stuart / collaborators) (n.d.). "Period Ending List (PDF)". Maya Decipherment. https://mayadecipherment.com/resources/period-ending-list/period-ending-list.pdf
 * TOKOVININE2024_CAMBRIDGE: Alexandre Tokovinine et al. (2024). "Using 3D Scanner to Explore the Maya Calendar System on Caracol Altar 2 (and related discussion of Vague Year)". Cambridge University Press (Antiquity Project Gallery). https://www.cambridge.org/core/journals/antiquity/article/using-3d-scanner-to-explore-the-maya-calendar-system-on-caracol-altar-2-in-belize/53056A66BACB2A9C92B755E7B3E7D886
 * KETTUNENZENDER2021_MONTHSIGNS: Harri Kettunen & Marc Zender (2021). "The 'Month Signs' in Diego de Landa's Relación de las Cosas de Yucatán". PDF (static Squarespace link). https://static1.squarespace.com/static/5becd5662714e530f22454e9/t/616efc609049bb4fe8d4ea87/1634663528394/Kettunen%26Zender_2021.pdf
 * MAA_MAYATIMECYCLES_PDF: Unknown (n.d.). "Maya Cycles of Time (PDF)". Mathematical Association of America (maa.org PDF). https://old.maa.org/sites/default/files/pdf/cms_upload/MayaTimeCycles2-143624.pdf
 * KELLEY1980_JHAS: D. H. Kelley (1980). "Astronomical Identities of Mesoamerican Gods". Journal for the History of Astronomy (via NASA ADS full text). https://adsabs.harvard.edu/full/1980JHAS...11....1K
 * STUART_EDZNAB_POST: David Stuart (2007). "The Year 2012 and the End of the World (mentions Edznab in year-bearer context)". Maya Decipherment. https://mayadecipherment.com/2007/05/08/the-year-2012-and-the-end-of-the-world/
 * TAUBE_WORKS_PDF: Karl Taube (2021). "Karl Taube: Works (PDF)". University of California, Riverside repository (snippet). https://escholarship.org/content/qt8t32t73q/qt8t32t73q.pdf
 */
export const modern_mayanistLocale: LocaleDefinition = {
  locale: 'modern-mayanist',
  name: 'Modern Mayanist Orthography',
  tzolkinDays: {
    // Day 1: imix
    // Locale spelling: Imix (sources: ALDANA2022_EHOS, MARTIN2012_PENN, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Imix': {
      canonical: 'Imix',
      alternatives: []
    },
    // Day 2: ik
    // Locale spelling: Ik' (sources: ALDANA2022_EHOS, MARTIN2012_PENN, STUART_CH6_MESOWEB)
    // Alternatives:
    //   - Ik (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Ik\'': {
      canonical: 'Ik\'',
      alternatives: ['Ik']
    },
    // Day 3: akbal
    // Locale spelling: Ak'bal (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    // Alternatives:
    //   - Akbal (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Ak\'bal': {
      canonical: 'Ak\'bal',
      alternatives: ['Akbal']
    },
    // Day 4: kan
    // Locale spelling: K'an (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    // Alternatives:
    //   - Kan (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'K\'an': {
      canonical: 'K\'an',
      alternatives: ['Kan']
    },
    // Day 5: chikchan
    // Locale spelling: Chikchan (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    // Alternatives:
    //   - Chicchan (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Chikchan': {
      canonical: 'Chikchan',
      alternatives: ['Chicchan']
    },
    // Day 6: kimi
    // Locale spelling: Kimi (sources: ALDANA2022_EHOS, MARTIN2012_PENN, STUART_CH6_MESOWEB)
    // Alternatives:
    //   - Cimi (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Kimi': {
      canonical: 'Kimi',
      alternatives: ['Cimi']
    },
    // Day 7: manik
    // Locale spelling: Manik (sources: ALDANA2022_EHOS, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Manik' (sources: MARTIN2012_PENN)
    'Manik\'': {
      canonical: 'Manik',
      alternatives: ['Manik\'']
    },
    // Day 8: lamat
    // Locale spelling: Lamat (sources: ALDANA2022_EHOS, MARTIN2012_PENN, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Lamat': {
      canonical: 'Lamat',
      alternatives: []
    },
    // Day 9: muluk
    // Locale spelling: Muluk (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    // Alternatives:
    //   - Muluc (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Muluk': {
      canonical: 'Muluk',
      alternatives: ['Muluc']
    },
    // Day 10: ok
    // Locale spelling: Ok (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    // Alternatives:
    //   - Oc (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Ok': {
      canonical: 'Ok',
      alternatives: ['Oc']
    },
    // Day 11: chuwen
    // Locale spelling: Chuwen (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    // Alternatives:
    //   - Chuen (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Chuwen': {
      canonical: 'Chuwen',
      alternatives: ['Chuen']
    },
    // Day 12: eb
    // Locale spelling: Eb (sources: ALDANA2022_EHOS, MARTIN2012_PENN, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Eb': {
      canonical: 'Eb',
      alternatives: []
    },
    // Day 13: ben
    // Locale spelling: Ben (sources: ALDANA2022_EHOS, MARTIN2012_PENN, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Ben': {
      canonical: 'Ben',
      alternatives: []
    },
    // Day 14: ix
    // Locale spelling: Ix (sources: ALDANA2022_EHOS, MARTIN2012_PENN, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Ix': {
      canonical: 'Ix',
      alternatives: []
    },
    // Day 15: men
    // Locale spelling: Men (sources: ALDANA2022_EHOS, MARTIN2012_PENN, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Men': {
      canonical: 'Men',
      alternatives: []
    },
    // Day 16: kib
    // Locale spelling: Kib (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    // Alternatives:
    //   - Cib (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Kib': {
      canonical: 'Kib',
      alternatives: ['Cib']
    },
    // Day 17: kaban
    // Locale spelling: Kaban (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    // Alternatives:
    //   - Caban (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Kaban': {
      canonical: 'Kaban',
      alternatives: ['Caban']
    },
    // Day 18: etznab
    // Locale spelling: Etz'nab (sources: ALDANA2022_EHOS, MARTIN2012_PENN, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Edznab (sources: STUART_EDZNAB_POST, TAUBE_WORKS_PDF)
    'Etz\'nab': {
      canonical: 'Etz\'nab',
      alternatives: ['Edznab']
    },
    // Day 19: kawak
    // Locale spelling: Kawak (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    // Alternatives:
    //   - Cauac (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Kawak': {
      canonical: 'Kawak',
      alternatives: ['Cauac']
    },
    // Day 20: ajaw
    // Locale spelling: Ajaw (sources: ALDANA2022_EHOS, MARTIN2012_PENN, STUART_CH6_MESOWEB, STUART2001_PARI_TXIX)
    // Alternatives:
    //   - Ahau (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    //   - Ahaw (sources: MAYADECIPHERMENT_PERIOD_ENDINGS)
    'Ajaw': {
      canonical: 'Ajaw',
      alternatives: ['Ahau', 'Ahaw']
    }
  },
  haabMonths: {
    // Month 1: pohp
    // Locale spelling: Pohp (sources: ALDANA2022_EHOS)
    // Alternatives:
    //   - Pop (sources: MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF, TOKOVININE2024_CAMBRIDGE)
    'Pop': {
      canonical: 'Pohp',
      alternatives: ['Pop']
    },
    // Month 2: wo
    // Locale spelling: Wo (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    // Alternatives:
    //   - Uo (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Wo': {
      canonical: 'Wo',
      alternatives: ['Uo']
    },
    // Month 3: sip
    // Locale spelling: Sip (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    // Alternatives:
    //   - Zip (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Sip': {
      canonical: 'Sip',
      alternatives: ['Zip']
    },
    // Month 4: sotz
    // Locale spelling: Sots' (sources: ALDANA2022_EHOS)
    // Alternatives:
    //   - Sotz' (sources: MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    //   - Zotz' (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Sotz\'': {
      canonical: 'Sots\'',
      alternatives: ['Sotz\'', 'Zotz\'']
    },
    // Month 5: tsek
    // Locale spelling: Tsek (sources: ALDANA2022_EHOS)
    // Alternatives:
    //   - Tzek (sources: MAYADECIPHERMENT_PERIOD_ENDINGS, STUART2001_PARI_TXIX, MAA_MAYATIMECYCLES_PDF)
    //   - Sek (sources: MARTIN2012_PENN)
    //   - Zec (sources: THOMPSON1950_MESOWEB, KELLEY1980_JHAS)
    'Sek': {
      canonical: 'Tsek',
      alternatives: ['Tzek', 'Sek', 'Zec']
    },
    // Month 6: xul
    // Locale spelling: Xul (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Xul': {
      canonical: 'Xul',
      alternatives: []
    },
    // Month 7: yaxkin
    // Locale spelling: Yaxk'in (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, STUART2001_PARI_TXIX)
    // Alternatives:
    //   - Yaxkin (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Yaxk\'in': {
      canonical: 'Yaxk\'in',
      alternatives: ['Yaxkin']
    },
    // Month 8: mol
    // Locale spelling: Mol (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Mol': {
      canonical: 'Mol',
      alternatives: []
    },
    // Month 9: chen
    // Locale spelling: Ch'en (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Ch\'en': {
      canonical: 'Ch\'en',
      alternatives: []
    },
    // Month 10: yax
    // Locale spelling: Yax (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Yax': {
      canonical: 'Yax',
      alternatives: []
    },
    // Month 11: sak
    // Locale spelling: Sak (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    // Alternatives:
    //   - Zak (sources: MAYADECIPHERMENT_PERIOD_ENDINGS)
    //   - Zac (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Sak': {
      canonical: 'Sak',
      alternatives: ['Zak', 'Zac']
    },
    // Month 12: keh
    // Locale spelling: Keh (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, STUART2006_CH6_MESOWEB)
    // Alternatives:
    //   - Ceh (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Keh': {
      canonical: 'Keh',
      alternatives: ['Ceh']
    },
    // Month 13: mak
    // Locale spelling: Mak (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    // Alternatives:
    //   - Mac (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Mak': {
      canonical: 'Mak',
      alternatives: ['Mac']
    },
    // Month 14: kankin
    // Locale spelling: K'ank'in (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    // Alternatives:
    //   - Kankin (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'K\'ank\'in': {
      canonical: 'K\'ank\'in',
      alternatives: ['Kankin']
    },
    // Month 15: muwan
    // Locale spelling: Muwan (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, STUART2001_PARI_TXIX)
    // Alternatives:
    //   - Muan (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Muwan': {
      canonical: 'Muwan',
      alternatives: ['Muan']
    },
    // Month 16: pax
    // Locale spelling: Pax (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Pax': {
      canonical: 'Pax',
      alternatives: []
    },
    // Month 17: kayab
    // Locale spelling: K'ayab (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    // Alternatives:
    //   - Kayab (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'K\'ayab': {
      canonical: 'K\'ayab',
      alternatives: ['Kayab']
    },
    // Month 18: kumku
    // Locale spelling: Kumk'u (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    // Alternatives:
    //   - Cumku (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Kumk\'u': {
      canonical: 'Kumk\'u',
      alternatives: ['Cumku']
    },
    // Month 19: wayeb
    // Locale spelling: Wayeb (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    // Alternatives:
    //   - Uayeb (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Wayeb': {
      canonical: 'Wayeb',
      alternatives: ['Uayeb']
    }
  }
};
