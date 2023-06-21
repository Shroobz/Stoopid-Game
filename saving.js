

setInterval(save, 10000)

function save() {
  console.log("saving")
  var save = {
    score: score,
    dt: dt,
    a: a,
    t: t,
    b: b,
    up1: up1,
    up2: up2
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
  if (typeof savegame.t !== "undefined") t = savegame.t;
  if (typeof savegame.t == "undefined") t = new OmegaNum(0);
  if (typeof savegame.b !== "undefined") b = savegame.b;
  if (typeof savegame.b == "undefined") b = new OmegaNum(1);
  if (typeof savegame.up1 !== "undefined") up1 = savegame.up1;
  if (typeof savegame.up1 == "undefined") up1 = new OmegaNum(0);
  if (typeof savegame.up2 !== "undefined") up2 = savegame.up2;
  if (typeof savegame.up2 == "undefined") up2 = new OmegaNum(0);
  console.log("done loading")
  console.log(savegame)
}

function deletesave() {
  localStorage.removeItem("save")
}
