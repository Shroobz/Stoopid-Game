

setInterval(save, 100)
let lastsave = Date.now()
let loadtime = Date.now()
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
    savetime: Date.now(),
    loadtime: loadtime
  }
  localStorage.setItem("save",JSON.stringify(save));
  console.log("done saving")
}

function load() {
  document.getElementById("rebirthbutton").style.display = "none"
  document.getElementById("a3_txt").style.display = "none"
  console.log("loading")
  pup1 = false;
  up1 = new Decimal(0);
  up2 = new Decimal(0);
  up3 = new Decimal(0);
  up4 = new Decimal(0);
  t = new Decimal(0);
  a3 = new Decimal(1);
  a2 = new Decimal(0.001);
  dt = new Decimal(1);
  score = new Decimal(1);
  var savegame = JSON.parse(localStorage.getItem("save"));
  if (savegame.loadtime != null) {
    if (typeof savegame.score !== "undefined") score = new Decimal(savegame.score);
    if (typeof savegame.dt !== "undefined") dt = new Decimal(savegame.dt);
    if (typeof savegame.a2 !== "undefined") a2 = new Decimal(savegame.a2);
    if (typeof savegame.a3 !== "undefined") a3 = new Decimal(savegame.a3);
    if (typeof savegame.t !== "undefined") t = new Decimal(savegame.t);
    if (typeof savegame.up1 !== "undefined") up1 = new Decimal(savegame.up1);
    if (typeof savegame.up2 !== "undefined") up2 = new Decimal(savegame.up2);
    if (typeof savegame.up3 !== "undefined") up3 = new Decimal(savegame.up3);
    if (typeof savegame.up4 !== "undefined") up4 = new Decimal(savegame.up4);
    if (typeof savegame.pup1 !== "undefined" && savegame.savetime > 1730466458683) pup1 = savegame.pup1;
    if (loadtime <= 1730594936401) {
      a3 = a3.pow(0.6)
    }
    console.log("done loading")
    console.log("calculating offline progress")
    if (typeof savegame.savetime !== "undefined") {
      timesincesave = Date.now()-savegame.savetime
      tickstobedone = Math.min(timesincesave/100, 250000)
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
  }
  console.log("Done")
  console.log(savegame)
  document.getElementById("loadingscreen").style.display = "none"
  document.getElementById("game").style.display = "block"
}

function deletesave() {
  localStorage.removeItem("save")
  location.reload()
}
