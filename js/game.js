const camps = {
  1: {
    color: "#FF0000",
    name: "赤イカ陣営",
    pic_path: "./images/ika_red.PNG" 
  },
  2: {
    color: "#0037ff",
    name: "青イカ陣営",
    pic_path: "./images/ika_blue.PNG" 
  },
  3: {
    color: "#00ff3b",
    name: "緑イカ陣営",
    pic_path: "./images/ika_green.PNG" 
  },
}


// query 取ってくる
var queryStr = window.location.search.slice(1);
let campId = queryStr.split("=")[1]

let color = camps[campId].color
let campName = camps[campId].name
let campPicPath = camps[campId].pic_path

var camp = document.getElementById("camp");
camp.style.color = color;
camp.innerText = campName


var campPic = document.getElementById("camp-pic");
campPic.src = campPicPath


