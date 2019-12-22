class Tzolkin {
  constructor (coeff, day) {
    this.coeff = coeff
    if (typeof day === 'string') {
      day = new TzolkinDay(day)
    }
    this.day = day
  }

  next () {
    let next_coeff = this.coeff + 1
    let next_day = this.day.next()
    return new Tzolkin(
      (next_coeff % 13) === 0 ? 13 : next_coeff % 13,
      next_day,
    )
  }

  get name () {
    return this.day.name
  }
}

class TzolkinDay {
  constructor (name) {
    this.days = {
      1: 'Imix',
      2: 'Ik\'',
      3: 'Ak\'bal',
      4: 'K\'an',
      5: 'Chikchan',
      6: 'Kimi',
      7: 'Manik',
      8: 'Lamat',
      9: 'Muluk',
      10: 'Ok',
      11: 'Chuwen',
      12: 'Eb',
      13: 'Ben',
      14: 'Ix',
      15: 'Men',
      16: 'Kib',
      17: 'Kaban',
      18: 'Etz\'nab',
      19: 'Kawak',
      20: 'Ajaw',
    }
    this.name = name
  }

  next () {
    let i
    for (i = 0; i < 20; i++) {
      if (this.days[i] === this.name) {
        break
      }
    }
    i += 1
    if (i > 20) {
      i = 1
    }
    return new TzolkinDay(this.days[i])
  }
}

module.exports = {
  'TzolkinDay': TzolkinDay,
  'Tzolkin': Tzolkin,
}
