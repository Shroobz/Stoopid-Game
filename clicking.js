// Hey! no peeking

let score = new Decimal(1)
let dt = new Decimal(1)
let a1 = new Decimal(1)
let a = new Decimal(1)
let b = new Decimal(1)
let c = new Decimal(1)
let t = new Decimal(0)
let up1 = new Decimal(0)
let up1price = new Decimal(1.05)
let up2 = new Decimal(0)
let up2price = new Decimal(1.5)
let up3 = new Decimal(0)
let up3price = new Decimal(10^308)
let up4 = new Decimal(0)
let up4price = new Decimal(10^308)
let pup1 = false
let a2 = new Decimal(0.001)
let prestigegain = new Decimal(0)
let autobuy = false
let a3 = new Decimal(1)
setInterval(Loop, 1000/60)


function toggleautobuy() {
  if (autobuy == false) {
    autobuy = true
  } else {
    autobuy = false
  }
  document.getElementById("autobuy").innerHTML = autobuy
}

function UpdateText() {
  let progressbar = new Decimal(0)
  if (a2.eq(0.001) && a3.eq(1)) {
    progressbar = score.log10().div(Decimal.pow(2, 1024).log10())
  } else if (a3.eq(1)) {
    progressbar = a2.max(Decimal.log(score.add(1), Decimal.pow(2, 1024)).pow(0.49).div(1000).mul(a3)).log10().div(new Decimal(1e10).log10()).div(2).min(0.5).max(0).max(progressbar)
    if (pup1) {progressbar = progressbar.add(0.5)}
  }

  // console.log(progressbar)

  document.getElementById("progress").style.width = progressbar.mul(100).min(100).toFixed(2) + "%"
  
  document.getElementById("score").innerHTML = format(score)

  document.getElementById("a1").innerHTML = format(a1)
  document.getElementById("a").innerHTML = format(a)
  document.getElementById("b").innerHTML = format(b)
  document.getElementById("c").innerHTML = format(c)
  document.getElementById("up1cost").innerHTML = format(up1price)
  document.getElementById("up2cost").innerHTML = format(up2price)
  document.getElementById("up3cost").innerHTML = format(up3price)
  document.getElementById("up4cost").innerHTML = format(up4price)
  document.getElementById("dt").innerHTML = format(dt)
  document.getElementById("t").innerHTML = format(t)
  document.getElementById("a2").innerHTML = format(a2,4)
  document.getElementById("a3").innerHTML = format(a3)
  if (Decimal.gt(a3, 1)) {
    document.getElementById("a3_txt").style.display = "block"
    document.getElementById("clickbutton").innerHTML = "score = score • e<sup>a<sub>1</sub>a<sub>2</sub>a<sub>3</sub>dt</sup>"
    document.getElementById("tutorial").innerHTML = "Formulas for the nerds<br> a1 = abc(sqrt(0.1t)) <br>t = t+dt <br>a2 gain * a3"
  }
  prestigegain = Decimal.log(score.add(1), Decimal.pow(2, 1024)).pow(0.49).div(1000).mul(a3)
  document.getElementById("prestigegain").innerHTML = format(prestigegain, 4)
  let rebirthgain = a2.div(1e10).pow(0.2)
  if (a2.gte(new Decimal(1e10))) {
    document.getElementById("rebirthgain").innerHTML = format(rebirthgain)
  }
  let prestigebutton = document.getElementById("prestigebutton")
  if (prestigegain.gte(a2)) {
    prestigebutton.style.display = "block"
  } else {
    prestigebutton.style.display = "none"
  }
  if (pup1 == true) {
    document.getElementById("toggleautoup").style.display = "block"
  } else {
    document.getElementById("toggleautoup").style.display = "none"
  }
  if (pup1 == false) {
    if (Decimal.gte(a2, new Decimal('1e10'))) {
      document.getElementById("buypup1").style.display = "block"
    } else {
      document.getElementById("buypup1").style.display = "none"
    }
  } else {
    document.getElementById("buypup1").style.display = "none"
    if (rebirthgain.gt(a3)) {
      document.getElementById("rebirthbutton").style.display = "block"
    }
  }
  if (!rebirthgain.gt(a3)) {
    document.getElementById("rebirthbutton").style.display = "none"
  }
}

function UpdatePrice() {
  a = Decimal.pow(2, up1)
  b = Decimal.pow(2, up2)
  c = Decimal.pow(2, up3)
  dt = Decimal.add(1, up4)
  up1price = Decimal.pow(10, Decimal.add(up1, 1).pow(up1).sub(1)).mul(2)
  up2price = Decimal.pow(10, Decimal.add(up2, 1).pow(Decimal.mul(up2, 2).sub(1)).sub(1)).mul(2500)
  up3price = Decimal.pow(10, Decimal.add(up3, 1).pow(Decimal.mul(up3, 5).sub(1)).sub(1)).mul(Decimal.pow(10, 308))
  up4price = Decimal.pow(10, Decimal.add(up4, 1).pow(Decimal.sub(up4, 1).pow(0.5)).sub(1)).mul(Decimal.pow(10, 18))
  
}

function Tick(mult = 1) {
  if (mult >= 1000) { // to prevent console spam taking over easily (yeah it's still possible but "only" about 50x faster than normal gameplay and what hacker has time to ruin this lmao)
    mult = 1000
    // this was really useless
  }

  if (a2.lt(new Decimal(0.001))) {
    a2 = new Decimal(0.001);
  }
  var answer = window.orientation > 1;
  document.getElementById("answer").innerHTML = answer
  if (answer == true) {
    mult *= 2
  }
  t = Decimal.add(t, Decimal.div(dt, 10).mul(mult))
  a1 = a.mul(b).mul(c).mul(t.div(10).sqrt())
  score = Decimal.mul(score, Decimal.pow(Decimal.pow(Math.E, Decimal.mul(a1, a2).mul(dt).mul(a3)), mult))
  UpdatePrice()
  UpdateText()
  if (pup1 == true && autobuy == true) {
    buyall()
  }
}

function Click() {
  Tick(10 / dt.toNumber())
}
let lastran = new Date().getTime()
function Loop() {
  var diff = new Date().getTime() - lastran
  lastran = new Date().getTime()
  Tick(diff/100)
  if (!score.gte(1)) {
    score = new Decimal(1)
  }
}
function buyup1() {
  while (score.gte(up1price)) {
    score = score.div(up1price)
    up1 = Decimal.add(up1, 1)
    UpdatePrice()
  } 
}
function buyup2() {
  while (score.gte(up2price)) {
    score = score.div(up2price)
    up2 = Decimal.add(up2, 1)
    UpdatePrice()
  }
}
function buyup3() {
  while (score.gte(up3price)) {
    score = score.div(up3price)
    up3 = Decimal.add(up3, 1)
    UpdatePrice()
  }
}
function buyup4() {
  while (score.gte(up4price)) {
    score = score.div(up4price)
    up4 = Decimal.add(up4, 1)
    UpdatePrice()
  }
}

function buyall() {
  buyup1()
  buyup2()
  buyup3()
  buyup4()
}

function buyprestigeup1() {
  if (pup1 == false) {
    if (Decimal.gte(a2, new Decimal('1e10'))) {
      pup1 = true
      a2 = new Decimal(0.001)
      score = new Decimal(1)
      dt = new Decimal(1)
      a1 = new Decimal(1)
      a = new Decimal(1)
      t = new Decimal(0)
      b = new Decimal(1)
      up1 = new Decimal(0)
      up2 = new Decimal(0)
      up3 = new Decimal(0)
      up4 = new Decimal(0)
      save()
    }
  }
}


function prestige() {
  prestigegain = Decimal.log(score.add(1), Decimal.pow(2, 1024)).pow(0.49).div(1000).mul(a3)
  if (prestigegain.gt(a2)) {
    a2 = prestigegain
    score = new Decimal(1)
    dt = new Decimal(1)
    a1 = new Decimal(1)
    a = new Decimal(1)
    t = new Decimal(0)
    b = new Decimal(1)
    up1 = new Decimal(0)
    up2 = new Decimal(0)
    up3 = new Decimal(0)
    up4 = new Decimal(0)
  }
  save()
}

function rebirth() {
  let rebirthgain = a2.div(1e10).pow(0.2)
  score = new Decimal(1)
  dt = new Decimal(1)
  a1 = new Decimal(1)
  a = new Decimal(1)
  t = new Decimal(0)
  b = new Decimal(1)
  up1 = new Decimal(0)
  up2 = new Decimal(0)
  up3 = new Decimal(0)
  up4 = new Decimal(0)
  a2 = new Decimal(0.001)
  a3 = rebirthgain
  save()
}



function exponentialFormat(num, precision) {
  let e = num.exponent; let m = num.mantissa; if (Number(new Decimal(m).toStringWithDecimalPlaces(precision)) == 10) {
    m = 1
    e++;
  }
  e = ((e >= 1000) ? commaFormat(new Decimal(e), 0) : new Decimal(e).toStringWithDecimalPlaces(0))
  return new Decimal(m).toStringWithDecimalPlaces(precision) + "e" + e
}
function commaFormat(num, precision) {
  if (num === null || num === undefined) return "NaN"
  if (num.mag < 0.001) return (0).toFixed(precision)
  if (num.gte(1000)) {precision=1}
  return num.toStringWithDecimalPlaces(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
function regularFormat(num, precision) {
  if (num === null || num === undefined) return "NaN"
  if (num.mag < 0.001) return (0).toFixed(precision)
  return num.toStringWithDecimalPlaces(precision)
}
function fixValue(x, y = 0) { return x || new Decimal(y) }
function sumValues(x) {
  x = Object.values(x)
  if (!x[0]) return new Decimal(0)
  return x.reduce((a, b) => Decimal.add(a, b))
}
function format(decimal, precision = 2, whole = false) {
  decimal = new Decimal(decimal)
  if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) { return "NaN" }
  if (decimal.sign < 0) return "-" + format(decimal.neg(), precision)
  if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
  if (decimal.eq(0)) return "0"
  if (decimal.gte("eeee1000")) {
    var slog = decimal.slog()
    if (slog.gte(1e3)) return "10^^" + formatWhole(slog)
    else return "10^^" + regularFormat(slog, precision)
  } else if (decimal.gte("eee100000")) return "eee" + format(decimal.log10().log10().log10(), precision)
  else if (decimal.gte("ee6")) return "ee" + format(decimal.log10().log10(), 3)
  else if (decimal.gte("1e1000")) return "e" + format(decimal.log10(), precision)
  else if (decimal.gte(1e9)) return exponentialFormat(decimal, precision)
  else if (decimal.gte(1e3)) return commaFormat(decimal, precision)
  else if (decimal.gte(Decimal.pow(0.1, precision)) || whole) return regularFormat(decimal, precision)
  else if (decimal.gt("1e-100000")) return exponentialFormat(decimal, decimal.gte("1e-1000") ? precision : 0)
  else return "1/(" + format(decimal.pow(-1), precision) + ")"
}
function formatWhole(decimal, reallyWhole = false) {
  decimal = new Decimal(decimal)
  if (decimal.gte(1e9)) return format(decimal, 2)
  if (decimal.lte(0.95) && !decimal.eq(0) && !reallyWhole) return format(decimal, 2)
  else return format(decimal, 0, true)
}
function formatTime(s) {
  s = new Decimal(s); if (s.gte(1 / 0)) return "Forever"
  else if (s.lt(60)) return format(s) + "s"
  else if (s.lt(3600)) return formatWhole(s.div(60).floor()) + "m " + format(s.toNumber() % 60) + "s"
  else if (s.lt(86400)) return formatWhole(s.div(3600).floor()) + "h " + format(s.div(60).floor().toNumber() % 60) + "m"
  else if (s.lt(31536000)) return formatWhole(s.div(84600).floor()) + "d " + formatWhole(s.div(3600).floor().toNumber() % 24) + "h"
  else if (s.lt(31536000000)) return formatWhole(s.div(31536000).floor()) + "y " + formatWhole(s.div(84600).floor().toNumber() % 365) + "d"
  else return formatWhole(s.div(31536000).floor()) + "y"
}
function toPlaces(x, precision, maxAccepted) {
  x = new Decimal(x)
  let result = x.toStringWithDecimalPlaces(precision)
  if (new Decimal(result).gte(maxAccepted)) { result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision) }
  return result
}


