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
}

function Tick(click = false) {
  let ticks = new OmegaNum(dt)
  var answer = window.orientation > 1;
  document.getElementById("answer").innerHTML = answer
  answer = true
  if (answer == true) {
    OmegaNum.mul(ticks, 4) // mobile users get buffed idle gain
  } else if (click == true) {
    OmegaNum.mul(ticks, 2)
  }
  a1 = OmegaNum.mul(a, b).pow(OmegaNum.div(t, 5).add(1).log(2).add(1))
  score = OmegaNum.mul(score, OmegaNum.pow(Math.E, OmegaNum.mul(OmegaNum.div(a, 1000), ticks)))
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
