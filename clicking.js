

let score = new OmegaNum(1)
let dt = new OmegaNum(1)
let a1 = new OmegaNum(1)
let a = new OmegaNum(1)
let b = new OmegaNum(1)
let c = new OmegaNum(1)
let t = new OmegaNum(0)
let up1 = new OmegaNum(0)
let up1price = new OmegaNum(1.05)
let up2 = new OmegaNum(0)
let up2price = new OmegaNum(1.5)
let up3 = new OmegaNum(0)
let up3price = new OmegaNum(10^308)
let up4 = new OmegaNum(0)
let up4price = new OmegaNum(10^308)
let pup1 = false
let a2 = new OmegaNum(0.001)
let prestigegain = new OmegaNum(0)
let autobuy = false
let a3 = OmegaNum(1)
setInterval(Loop, 100)

function toggleautobuy() {
  if (autobuy == false) {
    autobuy = true
  } else {
    autobuy = false
  }
  document.getElementById("autobuy").innerHTML = autobuy
}

function UpdateText() {
  document.getElementById("score").innerHTML = format(score, 3)

  document.getElementById("a1").innerHTML = format(a1, 3)
  document.getElementById("a").innerHTML = format(a, 3)
  document.getElementById("b").innerHTML = format(b, 3)
  document.getElementById("c").innerHTML = format(c, 3)
  document.getElementById("up1cost").innerHTML = format(up1price, 3)
  document.getElementById("up2cost").innerHTML = format(up2price, 3)
  document.getElementById("up3cost").innerHTML = format(up3price, 3)
  document.getElementById("up4cost").innerHTML = format(up4price, 3)
  document.getElementById("dt").innerHTML = format(dt, 3)
  document.getElementById("t").innerHTML = format(t, 1)
  document.getElementById("a2").innerHTML = format(a2, 4)
  document.getElementById("a3").innerHTML = format(a3, 3)
  if (OmegaNum.gt(a3, 1)) {
    document.getElementById("a3_txt").style.display = "block"
  }
  prestigegain = OmegaNum.log(OmegaNum.div(score, OmegaNum.pow(10, 15)).add(1), OmegaNum.pow(10, 18)).pow(0.5).div(400).mul(a3)
  document.getElementById("prestigegain").innerHTML = format(prestigegain, 4)
  let rebirthgain = OmegaNum.log(a2).div(10)
  document.getElementById("rebirthgain").innerHTML = format(rebirthgain, 3)
  let prestigebutton = document.getElementById("prestigebutton")
  if (OmegaNum.gte(score, OmegaNum.pow(10, 15))) {
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
    if (OmegaNum.gte(a2, OmegaNum('1e12'))) {
      document.getElementById("buypup1").style.display = "block"
    } else {
      document.getElementById("buypup1").style.display = "none"
    }
  } else {
    document.getElementById("buypup1").style.display = "none"
    if (OmegaNum.gte(a2, OmegaNum('1e12'))) {
      document.getElementById("rebirthbutton").style.display = "block"
    }
  }
  
}

function UpdatePrice() {
  a = OmegaNum.pow(2, up1)
  b = OmegaNum.pow(2, up2)
  c = OmegaNum.pow(2, up3)
  dt = OmegaNum.add(1, up4)
  if (OmegaNum.lte(up1, 500)) {
    up1price = OmegaNum.pow(10, OmegaNum.add(up1, 1).pow(up1).sub(1)).mul(1.05)
  } else {
    up1price = OmegaNum.pow(10, OmegaNum.add(up1, 1).pow(OmegaNum.pow(up1, 2))).mul(1.05)
  }
  if (OmegaNum.lte(up2, 500)) {
    up2price = OmegaNum.pow(10, OmegaNum.add(up2, 1).pow(OmegaNum.mul(up2, 2).sub(1)).sub(1)).mul(1.5)
  } else {
    up2price = OmegaNum.pow(10, OmegaNum.add(up2, 1).pow(OmegaNum.pow(up2, 3).sub(1)).sub(1)).mul(1.5)
  }
  if (OmegaNum.lte(up3, 500)) {
    up3price = OmegaNum.pow(10, OmegaNum.add(up3, 1).pow(OmegaNum.mul(up3, 5).sub(1)).sub(1)).mul(OmegaNum.pow(10, 308))
  } else {
    up3price = OmegaNum.pow(10, OmegaNum.add(up3, 1).pow(OmegaNum.pow(up3, 5).sub(1)).sub(1)).mul(OmegaNum.pow(10, 308))
  }
  if (OmegaNum.lte(up4, 500)) {
    up4price = OmegaNum.pow(10, OmegaNum.add(up4, 1).pow(OmegaNum.sub(up4, 1)).sub(1)).mul(OmegaNum.pow(10, 18))
  } else {
    up4price = OmegaNum.pow(10, OmegaNum.add(up4, 1).pow(OmegaNum.pow(up4, 2).sub(1)).sub(1)).mul(OmegaNum.pow(10, 18))
  }
  
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
  a1 = OmegaNum.mul(a, b).mul(c).mul(OmegaNum.div(t, 5).add(1).log(2).add(1))
  score = OmegaNum.mul(score, OmegaNum.pow(OmegaNum.pow(Math.E, OmegaNum.mul(a1, a2).mul(dt)), mult))
  UpdatePrice()
  t = OmegaNum.add(t, OmegaNum.div(dt, 10).mul(mult))
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
  if (!score.gte(1)) {
    score = new OmegaNum(1)
  }
}
function buyup1() {
  while (score.gte(up1price)) {
    console.log("Requirement met, changing score")
    score = score.div(up1price)
    console.log("changing a")
    a = OmegaNum.mul(a, 2)
    console.log("changing up1")
    up1 = OmegaNum.add(up1, 1)
    UpdatePrice()
  } 
}
function buyup2() {
  while (score.gte(up2price)) {
    console.log("Requirement met, changing score")
    score = score.div(up2price)
    console.log("changing b")
    b = OmegaNum.mul(b, 2)
    console.log("changing up2")
    up2 = OmegaNum.add(up2, 1)
    UpdatePrice()
  }
}
function buyup3() {
  while (score.gte(up3price)) {
    console.log("Requirement met, changing score")
    score = score.div(up3price)
    console.log("changing up3")
    up3 = OmegaNum.add(up3, 1)
    UpdatePrice()
  }
}
function buyup4() {
  while (score.gte(up4price)) {
    console.log("Requirement met, changing score")
    score = score.div(up4price)
    console.log("changing up4")
    up4 = OmegaNum.add(up4, 1)
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
    if (OmegaNum.gte(a2, OmegaNum('1e12'))) {
      pup1 = true
      a2 = OmegaNum(0.001)
      score = new OmegaNum(1)
      dt = new OmegaNum(1)
      a1 = new OmegaNum(1)
      a = new OmegaNum(1)
      t = new OmegaNum(0)
      b = new OmegaNum(1)
      up1 = new OmegaNum(0)
      up2 = new OmegaNum(0)
      up3 = new OmegaNum(0)
      up4 = new OmegaNum(0)
      save()
    }
  }
}


function prestige() {
  prestigegain = prestigegain = OmegaNum.log(OmegaNum.div(score, OmegaNum.pow(10, 15)).add(1), OmegaNum.pow(10, 18)).pow(0.5).div(400).mul(a3)
  score = new OmegaNum(1)
  dt = new OmegaNum(1)
  a1 = new OmegaNum(1)
  a = new OmegaNum(1)
  t = new OmegaNum(0)
  b = new OmegaNum(1)
  up1 = new OmegaNum(0)
  up2 = new OmegaNum(0)
  up3 = new OmegaNum(0)
  up4 = new OmegaNum(0)
  a2 = OmegaNum.add(a2, prestigegain)
  save()
}

function rebirth() {
  let rebirthgain = OmegaNum.log(a2).div(10)
  score = new OmegaNum(1)
  dt = new OmegaNum(1)
  a1 = new OmegaNum(1)
  a = new OmegaNum(1)
  t = new OmegaNum(0)
  b = new OmegaNum(1)
  up1 = new OmegaNum(0)
  up2 = new OmegaNum(0)
  up3 = new OmegaNum(0)
  up4 = new OmegaNum(0)
  a2 = OmegaNum(0.001)
  a3 = OmegaNum.add(a3, rebirthgain)
  save()
}