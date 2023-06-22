let score = new OmegaNum(1)
let dt = new OmegaNum(1)
let a1 = new OmegaNum(1)
let a = new OmegaNum(1)
let t = new OmegaNum(0)
let b = new OmegaNum(1)
let up1 = new OmegaNum(0)
let up1price = new OmegaNum(1.05)
let up2 = new OmegaNum(0)
let up2price = new OmegaNum(1.5)
let a2 = new OmegaNum(0.001)
setInterval(Loop, 100)

function UpdateText() {
  document.getElementById("score").innerHTML = format(score, 3)
  document.getElementById("a1").innerHTML = format(a1, 3)
  document.getElementById("a").innerHTML = format(a, 3)
  document.getElementById("b").innerHTML = format(b, 3)
  document.getElementById("up1cost").innerHTML = format(up1price, 3)
  document.getElementById("up2cost").innerHTML = format(up2price, 3)
  document.getElementById("dt").innerHTML = format(dt, 3)
  document.getElementById("t").innerHTML = format(t, 1)
  document.getElementById("a2").innerHTML = format(a2, 4)
  prestigegain = OmegaNum.log(OmegaNum.div(score, OmegaNum.pow(10, 15)).add(1), OmegaNum.pow(10, 18)).pow(0.5).div(1000)
  document.getElementById("prestigegain").innerHTML = format(prestigegain, 4)
}

function Tick(click = false) {
  let prestigebutton = document.getElementById("prestigebutton")
  if (OmegaNum.gte(score, OmegaNum.pow(10, 15))) {
    prestigebutton.style.display = "block"
  } else {
    prestigebutton.style.display = "none"
  }

  let ticks = new OmegaNum(dt)
  var answer = window.orientation > 1;
  document.getElementById("answer").innerHTML = answer
  answer = true
  if (answer == true) {
    OmegaNum.mul(ticks, 4) // mobile users get buffed idle gain
  } else if (click == true) {
    OmegaNum.mul(ticks, 2)
  }
  a1 = OmegaNum.mul(a, b).mul(OmegaNum.div(t, 5).add(1).log(2).add(1))
  score = OmegaNum.mul(score, OmegaNum.pow(Math.E, OmegaNum.mul(OmegaNum.mul(a1, a2), ticks)))
  up1price = OmegaNum.pow(10, OmegaNum.add(up1, 1).pow(up1).sub(1)).mul(1.05)
  up2price = OmegaNum.pow(10, OmegaNum.add(up2, 1).pow(OmegaNum.mul(up2, 2).sub(1)).sub(1)).mul(1.5)
  t = OmegaNum.add(t, OmegaNum.div(dt, 10))
  UpdateText()
}


function Click() {
  Tick(true)
}
function Loop() {
  Tick()
}
function buyup1() {
  if (score.gte(up1price)) {
    console.log("Requirement met, changing score")
    score =score.div(up1price)
    console.log("changing a")
    a = OmegaNum.mul(a, 2)
    console.log("changing up1")
    up1 = OmegaNum.add(up1, 1)
  } else {
    console.log("Requirement not met")
  }
}
function buyup2() {
  if (score.gte(up2price)) {
    console.log("Requirement met, changing score")
    score = score.div(up2price)
    console.log("changing b")
    b = OmegaNum.mul(b, 2)
    console.log("changing up2")
    up2 = OmegaNum.add(up2, 1)
  } else {
    console.log("Requirement not met")
  }
}
function prestige() {
  let prestigegain = OmegaNum.log(OmegaNum.div(score, OmegaNum.pow(10, 15)).add(1), OmegaNum.pow(10, 18)).pow(0.5).div(1000)
  score = new OmegaNum(1)
  dt = new OmegaNum(1)
  a1 = new OmegaNum(1)
  a = new OmegaNum(1)
  t = new OmegaNum(0)
  b = new OmegaNum(1)
  up1 = new OmegaNum(0)
  up1price = new OmegaNum(1.05)
  up2 = new OmegaNum(0)
  up2price = new OmegaNum(1.5)
  a2 = OmegaNum.add(a2, prestigegain)
  save()
}

