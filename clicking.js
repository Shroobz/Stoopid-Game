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
setInterval(Loop, 50)

function toggleautobuy() {
  if (autobuy == false) {
    autobuy = true
  } else {
    autobuy = false
  }
  document.getElementById("autobuy").innerHTML = autobuy
}

function UpdateText() {
  
  document.getElementById("score").innerHTML = score.toStringWithDecimalPlaces(3)

  document.getElementById("a1").innerHTML = a1.toStringWithDecimalPlaces(3)
  document.getElementById("a").innerHTML = a.toStringWithDecimalPlaces(3)
  document.getElementById("b").innerHTML = b.toStringWithDecimalPlaces(3)
  document.getElementById("c").innerHTML = c.toStringWithDecimalPlaces(3)
  document.getElementById("up1cost").innerHTML = up1price.toStringWithDecimalPlaces(3)
  document.getElementById("up2cost").innerHTML = up2price.toStringWithDecimalPlaces(3)
  document.getElementById("up3cost").innerHTML = up3price.toStringWithDecimalPlaces(3)
  document.getElementById("up4cost").innerHTML = up4price.toStringWithDecimalPlaces(3)
  document.getElementById("dt").innerHTML = dt.toStringWithDecimalPlaces(3)
  document.getElementById("t").innerHTML = t.toStringWithDecimalPlaces(3)
  document.getElementById("a2").innerHTML = a2.toStringWithDecimalPlaces(3)
  document.getElementById("a3").innerHTML = a3.toStringWithDecimalPlaces(3)
  if (Decimal.gt(a3, 1)) {
    document.getElementById("a3_txt").style.display = "block"
    document.getElementById("clickbutton").innerHTML = "score = score*(e^(a1*a2*a3*dt))^(ticks done)"
    document.getElementById("tutorial").innerHTML = "Formulas for the nerds<br> a1 = abc(log(t/5+1)+1) <br>t = t+dt/10 <br>a2 gain * a3"
  }
  prestigegain = Decimal.log(Decimal.div(score, Decimal.pow(10, 15)).add(1), Decimal.pow(10, 18)).pow(0.5).div(400).mul(a3)
  document.getElementById("prestigegain").innerHTML = prestigegain.toStringWithDecimalPlaces(4)
  let rebirthgain = Decimal.pow(Decimal.div(a2, 1e10), 0.25)
  document.getElementById("rebirthgain").innerHTML = rebirthgain.toStringWithDecimalPlaces(3)
  let prestigebutton = document.getElementById("prestigebutton")
  if (Decimal.gte(score, Decimal.pow(2, 1024))) {
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
    if (Decimal.gte(a2, new Decimal('1e12'))) {
      document.getElementById("buypup1").style.display = "block"
    } else {
      document.getElementById("buypup1").style.display = "none"
    }
  } else {
    document.getElementById("buypup1").style.display = "none"
    if (Decimal.gte(a2, new Decimal('1e12'))) {
      document.getElementById("rebirthbutton").style.display = "block"
    }
  }
  if (!Decimal.gte(a2, new Decimal('1e12'))) {
    document.getElementById("rebirthbutton").style.display = "none"
  }
}

function UpdatePrice() {
  a = Decimal.pow(2, up1)
  b = Decimal.pow(2, up2)
  c = Decimal.pow(2, up3)
  dt = Decimal.add(1, up4)
    up1price = Decimal.pow(10, Decimal.add(up1, 1).pow(up1).sub(1)).mul(1.05)
    up2price = Decimal.pow(10, Decimal.add(up2, 1).pow(Decimal.mul(up2, 2).sub(1)).sub(1)).mul(1.5)
    up3price = Decimal.pow(10, Decimal.add(up3, 1).pow(Decimal.mul(up3, 5).sub(1)).sub(1)).mul(Decimal.pow(10, 308))
    up4price = Decimal.pow(10, Decimal.add(up4, 1).pow(Decimal.sub(up4, 1)).sub(1)).mul(Decimal.pow(10, 18))
  
}

function Tick(mult = 1) {
  if (mult >= 1000) { // to prevent console spam taking over easily (yeah it's still possible but "only" about 50x faster than normal gameplay and what hacker has time to ruin this lmao)
    mult = 1000
  }
  var answer = window.orientation > 1;
  document.getElementById("answer").innerHTML = answer
  if (answer == true) {
    mult *= 4
  } 
  a1 = Decimal.mul(a, b).mul(c).mul(Decimal.div(t, 5).add(1).log(2).add(1))
  score = Decimal.mul(score, Decimal.pow(Decimal.pow(Math.E, Decimal.mul(a1, a2).mul(dt).mul(a3)), mult))
  UpdatePrice()
  t = Decimal.add(t, Decimal.div(dt, 10).mul(mult))
  UpdateText()
  if (pup1 == true && autobuy == true) {
    buyall()
  }
}

function Click() {
  Tick(3)
}
function Loop() {
  Tick()
  if (!score.gte(1.01)) {
    score = new Decimal(1.01)
  }
}
function buyup1() {
  while (score.gte(up1price)) {
    score = score.div(up1price)
    up1 = Decimal.add(up1, 1)
    up1price = Decimal.pow(10, Decimal.add(up1, 1).pow(up1).sub(1)).mul(1.05)
  } 
  UpdatePrice()
}
function buyup2() {
  while (score.gte(up2price)) {
    score = score.div(up2price)
    up2 = Decimal.add(up2, 1)
    up2price = Decimal.pow(10, Decimal.add(up2, 1).pow(Decimal.mul(up2, 2).sub(1)).sub(1)).mul(1.5)
  }
  UpdatePrice()
}
function buyup3() {
  while (score.gte(up3price)) {
    score = score.div(up3price)
    up3 = Decimal.add(up3, 1)
    up3price = Decimal.pow(10, Decimal.add(up3, 1).pow(Decimal.mul(up3, 5).sub(1)).sub(1)).mul(Decimal.pow(10, 308))
  }
  UpdatePrice()
}
function buyup4() {
  while (score.gte(up4price)) {
    score = score.div(up4price)
    up4 = Decimal.add(up4, 1)
    up4price = Decimal.pow(10, Decimal.add(up4, 1).pow(Decimal.sub(up4, 1)).sub(1)).mul(Decimal.pow(10, 18))
  }
  UpdatePrice()
}

function buyall() {
  buyup1()
  buyup2()
  buyup3()
  buyup4()
}

function buyprestigeup1() {
  if (pup1 == false) {
    if (Decimal.gte(a2, Decimal('1e12'))) {
      pup1 = true
      a2 = Decimal(0.001)
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
  prestigegain = Decimal.log(Decimal.div(score, Decimal.pow(10, 15)).add(1), Decimal.pow(10, 18)).pow(0.5).div(400).mul(a3)
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
  a2 = Decimal.add(a2, prestigegain)
  save()
}

function rebirth() {
  let rebirthgain = Decimal.add(a3, Decimal.pow(Decimal.div(a2, 1e10), 0.25))
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
  a2 = Decimal(0.001)
  a3 = rebirthgain
  save()
}
