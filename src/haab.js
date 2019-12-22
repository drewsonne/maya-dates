class Haab {
  constructor (coeff, month) {
    this.coeff = coeff
    if (typeof month === 'string') {
      month = new HaabMonth(month)
    }
    this.month = month
  }

  next () {
    let month_length = (this.name === this.months[19]) ? 5 : 20
  }
}

class HaabMonth {
  constructor (name) {
    this.months = {
      1: 'Pop',
      2: 'Wo',
      3: 'Sip',
      4: 'Sotz\'',
      5: 'Sek',
      6: 'Xul',
      7: 'Yaxk\'in',
      8: 'Mol',
      9: 'Ch\'en',
      10: 'Yax',
      11: 'Sak',
      12: 'Keh',
      13: 'Mak',
      14: 'K\'ank\'in',
      15: 'Muwan',
      16: 'Pax',
      17: 'K\'ayab',
      18: 'Kumk\'u',
      19: 'Wayeb',
    }
    this.name = name
  }

  next () {
    let i
    for (i = 0; i < 20; i++) {
      if (this.months[i] === this.name) {
        break
      }
    }
    i += 1
    if (i > 19) {
      i = 1
    }
    return new HaabMonth(this.months[i])
  }
}

module.exports = {
  'Haab': Haab,
  'HaabMonth': HaabMonth,
}
