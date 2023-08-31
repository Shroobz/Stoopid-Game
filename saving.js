

setInterval(save, 100)
let lastsave = Date.now()

function save() {
  if (Date.now()-lastsave <= 5000) {
    return;
  }
  lastsave = Date.now()
  console.log("saving")
  var save = {
    score: score,
    dt: dt,
    a2: a2,
    a3: a3,
    t: t,
    up1: up1,
    up2: up2,
    up3: up3,
    up4: up4,
    pup1: pup1,
    savetime: Date.now()
  }
  localStorage.setItem("save",JSON.stringify(save));
  console.log("done saving")
}

function load() {
  document.getElementById("rebirthbutton").style.display = "none"
  document.getElementById("a3_txt").style.display = "none"
  console.log("loading")
  pup1 = false;
  up1 = new OmegaNum(0);
  up2 = new OmegaNum(0);
  up3 = new OmegaNum(0);
  up4 = new OmegaNum(0);
  t = new OmegaNum(0);
  a3 = new OmegaNum(1);
  a2 = new OmegaNum(0.001);
  dt = new OmegaNum(1);
  score = new OmegaNum(1);
  var savegame = JSON.parse(localStorage.getItem("save"));
  if (typeof savegame.score !== "undefined") score = savegame.score;
  if (typeof savegame.dt !== "undefined") dt = savegame.dt;
  if (typeof savegame.a2 !== "undefined") a2 = savegame.a2;
  if (typeof savegame.a3 !== "undefined") a3 = savegame.a3;
  if (typeof savegame.t !== "undefined") t = savegame.t;
  if (typeof savegame.up1 !== "undefined") up1 = savegame.up1;
  if (typeof savegame.up2 !== "undefined") up2 = savegame.up2;
  if (typeof savegame.up3 !== "undefined") up3 = savegame.up3;
  if (typeof savegame.up4 !== "undefined") up4 = savegame.up4;
  if (typeof savegame.pup1 !== "undefined") pup1 = savegame.pup1;
  console.log("done loading")
  console.log("calculating offline progress")
  if (typeof savegame.savetime !== "undefined") {
    timesincesave = Date.now()-savegame.savetime
    tickstobedone = timesincesave/100
    console.log(tickstobedone)
    if (tickstobedone > 50000) {
      let ticksdone = 0
      for (var i = 0; i < tickstobedone/1000-40; i++) {
        Tick(1000)
        ticksdone += 1000
      }
      tickstobedone -= ticksdone
    }
    if (tickstobedone > 5000) {
      let ticksdone = 0
      for (var i = 0; i < tickstobedone/100-40; i++) {
        Tick(100)
        ticksdone += 100
      }
      tickstobedone -= ticksdone
    }
    if (tickstobedone > 100) {
      let ticksdone = 0
      for (var i = 0; i < tickstobedone/10-40; i++) {
        Tick(10)
        ticksdone += 10
      }
      tickstobedone -= ticksdone
    }
    if (tickstobedone <= 100) {
      for (var i = 0; i < tickstobedone; i++) {
        Tick()
      }
    }
  }
  console.log("Done")
  console.log(savegame)
}

function deletesave() {
  localStorage.removeItem("save")
  location.reload()
}
