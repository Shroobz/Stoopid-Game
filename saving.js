

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
    a: a,
    a2: a2,
    t: t,
    b: b,
    up1: up1,
    up2: up2,
    savetime: Date.now()
  }
  localStorage.setItem("save",JSON.stringify(save));
  console.log("done saving")
}

function load() {
  console.log("loading")
  var savegame = JSON.parse(localStorage.getItem("save"));
  if (typeof savegame.score !== "undefined") score = savegame.score;
  if (typeof savegame.score == "undefined") score = new OmegaNum(1);
  if (typeof savegame.dt !== "undefined") dt = savegame.dt;
  if (typeof savegame.dt == "undefined") dt = new OmegaNum(1);
  if (typeof savegame.a !== "undefined") a = savegame.a;
  if (typeof savegame.a == "undefined") a = new OmegaNum(1);
  if (typeof savegame.a2 !== "undefined") a2 = savegame.a2;
  if (typeof savegame.a2 == "undefined") a2 = new OmegaNum(0.001);
  if (typeof savegame.t !== "undefined") t = savegame.t;
  if (typeof savegame.t == "undefined") t = new OmegaNum(0);
  if (typeof savegame.b !== "undefined") b = savegame.b;
  if (typeof savegame.b == "undefined") b = new OmegaNum(1);
  if (typeof savegame.up1 !== "undefined") up1 = savegame.up1;
  if (typeof savegame.up1 == "undefined") up1 = new OmegaNum(0);
  if (typeof savegame.up2 !== "undefined") up2 = savegame.up2;
  if (typeof savegame.up2 == "undefined") up2 = new OmegaNum(0);
  console.log("done loading")
  console.log("calculating offline progress")
  if (typeof savegame.savetime !== "undefined") {
    timesincesave = Date.now()-savegame.savetime
    tickstobedone = timesincesave/100
    console.log(tickstobedone)
    if (tickstobedone > 5000) {
      let ticksdone = 0
      for (var i = 0; i < tickstobedone/100; i++) {
        Tick(100)
        ticksdone += 100
      }
      tickstobedone -= ticksdone
    }
    if (tickstobedone > 500) {
      let ticksdone = 0
      for (var i = 0; i < tickstobedone/10; i++) {
        Tick(10)
        ticksdone += 10
      }
      tickstobedone -= ticksdone
    }
    if (tickstobedone <= 500) {
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
