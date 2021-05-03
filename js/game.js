const camps = {
  1: {
    color: "#FF0000",
    name: "アカイカ",
    pic_path: "./images/ika_red.PNG",
    zinti_path: "./images/zinti_red.PNG"
  },
  2: {
    color: "#0037ff",
    name: "アオイカ",
    pic_path: "./images/ika_blue.PNG",
    zinti_path: "./images/zinti_blue.PNG"
  },
  3: {
    color: "#00ff3b",
    name: "ミドリイカ",
    pic_path: "./images/ika_green.PNG",
    zinti_path: "./images/zinti_green.PNG"
  },
}


// query 取ってくる
var queryStr = window.location.search.slice(1);
let cid = queryStr.split("=")[1]

let color = camps[cid].color
let campName = camps[cid].name
let campPicPath = camps[cid].pic_path
let campZintiPath = camps[cid].zinti_path

var camp = document.getElementById("camp");
camp.style.color = color;
camp.innerText = campName


var campPic = document.getElementById("camp-pic");
campPic.src = campPicPath

var campZinti = document.getElementById("camp-zinti");
campZinti.src = campZintiPath