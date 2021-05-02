// query 取ってくる
const campId = window.location.search.slice(1).split("=")[1]

let map;

const campColors = {
  1: {
    color: "#FF0000",
  },
  2: {
    color: "#0037ff",
  },
  3: {
    color: "#00ff3b",
  },
}

let campEncampedLocations = [
  {
    id: 0,
    latitude: 35.155725, 
    longitude: 136.963427,
    camp_id: 1,
  },
  {
    id: 0,
    latitude: 35.155725 + 0.0005, 
    longitude: 136.963427,
    camp_id: 1,
  },
  {
    id: 0,
    latitude: 35.155725 + 0.0010, 
    longitude: 136.963427,
    camp_id: 1,
  },
  {
    id: 0,
    latitude: 35.155725 + 0.0015, 
    longitude: 136.963427,
    camp_id: 2,
  },
];

// MAPの初期化処理
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.155725, lng: 136.963427 },
    zoom: 17,
  });

  // API叩いて一覧取得！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
  all().then(data => {
    console.log(data)
    // campEncampedLocations = data
  })

  campEncampedLocations.forEach(layer => {
    writeCircle(layer)
  })
}

// 位置情報を追加して円を表示
function addLayer() {
  let layer = {
    latitude: 0,
    longitude: 0,
    camp_id: campId,
  }
  navigator.geolocation.getCurrentPosition(function show_location(position) {
    layer.latitude = position.coords.latitude;
    layer.longitude = position.coords.longitude;

    writeCircle(layer)
    campEncampedLocations.push(layer)
    // API叩いて作成！！！！！！！！！！！！！！！！！！！！！！！！！！
    save(layer)
  });
}

// 円を表示
function writeCircle(layer) {
  const cityCircle = new google.maps.Circle({
    strokeColor: "#ffffff",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: campColors[layer.camp_id].color,
    fillOpacity: 0.8,
    map,
    center: { lat: layer.latitude, lng: layer.longitude },
    radius: 50,
  });
}


async function all() {
  let resp = await fetch(`http://localhost:8000/camp_encamped_locations`, {mode: 'cors'})
  return resp.json()
}

function save(camp_encamped_location) {
  // credential周り設定したほうが良さそう。
  fetch( 'http://localhost:8000/camp_encamped_locations', { method: "POST", body: JSON.stringify(camp_encamped_location), mode: "cors" } )
  .then(resp => console.log(resp))
}

function deleteCEL(camp_encamped_location) {
  // credential周り設定したほうが良さそう。
  fetch( `http://localhost:8000/camp_encamped_locations/${camp_encamped_location.id}`, { method: "DELETE", mode: "cors" } )
  .then(resp => console.log(resp))
}

// API叩くクラスの宣言
class CampEncampedLocation {
  constructor(arg) {
    this.init()
    if ( typeof arg == "number" ) { this.fetch(arg) }
    // if ( typeof arg == "object" ) { Object.assign(this, arg) }
  }

  init(){
    this.camp_id = null,
    this.latitude = null,
    this.longitude = null
  }

  // 取得
  fetch(id){
    fetch(`http://localhost:8000/camp_encamped_locations/${id}`, {mode: 'cors'})
    .then( resp => resp.json() )
    .then( data => Object.assign(this, data.camp_encamped_location) )
  }

  // 全取得
  async all() {
    let resp = await fetch(`http://localhost:8000/camp_encamped_locations`, {mode: 'cors'})
    return resp.json()
  }

  // 作成
  create(object){ // {camp_id: Number, latitude: Number, longitude: Number}
    this.init()
    Object.assign(this, object)
    this.save()
  }

  save() {
    // credential周り設定したほうが良さそう。
    fetch( 'http://localhost:8000/camp_encamped_locations', { method: "POST", body: this.toPostedObject(), mode: "cors" } )
  }

  toPostedObject(){
    var postedObject = {}
    postedObject.camp_id = this.camp_id
    postedObject.latitude = this.latitude
    postedObject.longitude = this.longitude
    return JSON.stringify(postedObject)
  }

  // update(){

  // }
}