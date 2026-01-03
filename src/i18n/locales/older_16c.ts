import { LocaleDefinition } from '../types';

/**
 * Older 16th Century Orthography
 *
 * Traditional Thompson/Landa spellings (Pop, Ik, Akbal)
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
export const older16cLocale: LocaleDefinition = {
  locale: 'older-16c',
  name: 'Older 16th Century Orthography',
  tzolkinDays: {
    // Day 1: imix
    // Locale spelling: Imix (sources: ALDANA2022_EHOS, MARTIN2012_PENN, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Imix': {
      canonical: 'Imix',
      alternatives: []
    },
    // Day 2: ik
    // Locale spelling: Ik (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Ik' (sources: ALDANA2022_EHOS, MARTIN2012_PENN, STUART_CH6_MESOWEB)
    'Ik\'': {
      canonical: 'Ik',
      alternatives: ['Ik\'']
    },
    // Day 3: akbal
    // Locale spelling: Akbal (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Ak'bal (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    'Ak\'bal': {
      canonical: 'Akbal',
      alternatives: ['Ak\'bal']
    },
    // Day 4: kan
    // Locale spelling: Kan (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - K'an (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    'K\'an': {
      canonical: 'Kan',
      alternatives: ['K\'an']
    },
    // Day 5: chikchan
    // Locale spelling: Chicchan (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Chikchan (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    'Chikchan': {
      canonical: 'Chicchan',
      alternatives: ['Chikchan']
    },
    // Day 6: kimi
    // Locale spelling: Cimi (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Kimi (sources: ALDANA2022_EHOS, MARTIN2012_PENN, STUART_CH6_MESOWEB)
    'Kimi': {
      canonical: 'Cimi',
      alternatives: ['Kimi']
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
    // Locale spelling: Muluc (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Muluk (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    'Muluk': {
      canonical: 'Muluc',
      alternatives: ['Muluk']
    },
    // Day 10: ok
    // Locale spelling: Oc (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Ok (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    'Ok': {
      canonical: 'Oc',
      alternatives: ['Ok']
    },
    // Day 11: chuwen
    // Locale spelling: Chuen (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Chuwen (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    'Chuwen': {
      canonical: 'Chuen',
      alternatives: ['Chuwen']
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
    // Locale spelling: Cib (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Kib (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    'Kib': {
      canonical: 'Cib',
      alternatives: ['Kib']
    },
    // Day 17: kaban
    // Locale spelling: Caban (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Kaban (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    'Kaban': {
      canonical: 'Caban',
      alternatives: ['Kaban']
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
    // Locale spelling: Cauac (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Kawak (sources: ALDANA2022_EHOS, MARTIN2012_PENN)
    'Kawak': {
      canonical: 'Cauac',
      alternatives: ['Kawak']
    },
    // Day 20: ajaw
    // Locale spelling: Ahau (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Ajaw (sources: ALDANA2022_EHOS, MARTIN2012_PENN, STUART_CH6_MESOWEB, STUART2001_PARI_TXIX)
    //   - Ahaw (sources: MAYADECIPHERMENT_PERIOD_ENDINGS)
    'Ajaw': {
      canonical: 'Ahau',
      alternatives: ['Ajaw', 'Ahaw']
    }
  },
  haabMonths: {
    // Month 1: pohp
    // Locale spelling: Pop (sources: MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF, TOKOVININE2024_CAMBRIDGE)
    // Alternatives:
    //   - Pohp (sources: ALDANA2022_EHOS)
    'Pop': {
      canonical: 'Pop',
      alternatives: ['Pohp']
    },
    // Month 2: wo
    // Locale spelling: Uo (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Wo (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    'Wo': {
      canonical: 'Uo',
      alternatives: ['Wo']
    },
    // Month 3: sip
    // Locale spelling: Zip (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Sip (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    'Sip': {
      canonical: 'Zip',
      alternatives: ['Sip']
    },
    // Month 4: sotz
    // Locale spelling: Zotz' (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Sots' (sources: ALDANA2022_EHOS)
    //   - Sotz' (sources: MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    'Sotz\'': {
      canonical: 'Zotz\'',
      alternatives: ['Sots\'', 'Sotz\'']
    },
    // Month 5: tsek
    // Locale spelling: Zec (sources: THOMPSON1950_MESOWEB, KELLEY1980_JHAS)
    // Alternatives:
    //   - Tsek (sources: ALDANA2022_EHOS)
    //   - Tzek (sources: MAYADECIPHERMENT_PERIOD_ENDINGS, STUART2001_PARI_TXIX, MAA_MAYATIMECYCLES_PDF)
    //   - Sek (sources: MARTIN2012_PENN)
    'Sek': {
      canonical: 'Zec',
      alternatives: ['Tsek', 'Tzek', 'Sek']
    },
    // Month 6: xul
    // Locale spelling: Xul (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Xul': {
      canonical: 'Xul',
      alternatives: []
    },
    // Month 7: yaxkin
    // Locale spelling: Yaxkin (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Yaxk'in (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, STUART2001_PARI_TXIX)
    'Yaxk\'in': {
      canonical: 'Yaxkin',
      alternatives: ['Yaxk\'in']
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
    // Locale spelling: Zac (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Sak (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    //   - Zak (sources: MAYADECIPHERMENT_PERIOD_ENDINGS)
    'Sak': {
      canonical: 'Zac',
      alternatives: ['Sak', 'Zak']
    },
    // Month 12: keh
    // Locale spelling: Ceh (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Keh (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, STUART_CH6_MESOWEB)
    'Keh': {
      canonical: 'Ceh',
      alternatives: ['Keh']
    },
    // Month 13: mak
    // Locale spelling: Mac (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Mak (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    'Mak': {
      canonical: 'Mac',
      alternatives: ['Mak']
    },
    // Month 14: kankin
    // Locale spelling: Kankin (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - K'ank'in (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    'K\'ank\'in': {
      canonical: 'Kankin',
      alternatives: ['K\'ank\'in']
    },
    // Month 15: muwan
    // Locale spelling: Muan (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Muwan (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, STUART2001_PARI_TXIX)
    'Muwan': {
      canonical: 'Muan',
      alternatives: ['Muwan']
    },
    // Month 16: pax
    // Locale spelling: Pax (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS, THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    'Pax': {
      canonical: 'Pax',
      alternatives: []
    },
    // Month 17: kayab
    // Locale spelling: Kayab (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - K'ayab (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    'K\'ayab': {
      canonical: 'Kayab',
      alternatives: ['K\'ayab']
    },
    // Month 18: kumku
    // Locale spelling: Cumku (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Kumk'u (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    'Kumk\'u': {
      canonical: 'Cumku',
      alternatives: ['Kumk\'u']
    },
    // Month 19: wayeb
    // Locale spelling: Uayeb (sources: THOMPSON1950_MESOWEB, MAA_MAYATIMECYCLES_PDF)
    // Alternatives:
    //   - Wayeb (sources: ALDANA2022_EHOS, MARTIN2012_PENN, MAYADECIPHERMENT_PERIOD_ENDINGS)
    'Wayeb': {
      canonical: 'Uayeb',
      alternatives: ['Wayeb']
    }
  }
};
