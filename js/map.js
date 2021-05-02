let map;
let marker

let currentLocation = { lat: 0, lng: 0}

function changeCurrentPosition() {
  navigator.geolocation.getCurrentPosition(function location(position) {
    currentLocation.lat = position.coords.latitude;
    currentLocation.lng = position.coords.longitude;
  });
  moveCurrentPositionMarker()
  addLayer()
}

function moveCurrentPositionMarker() {
  marker = new google.maps.Marker({
    position: currentLocation,
    map,
  });
}

// query 取ってくる
const campId = window.location.search.slice(1).split("=")[1]

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
  {
    id: 0,
    latitude: 35.155725, 
    longitude: 136.963427,
    camp_id: 1,
  },
  {
    id: 0,
    latitude: 35.155725 + 0.0005, 
    longitude: 136.963427 + 0.0005,
    camp_id: 1,
  },
  {
    id: 0,
    latitude: 35.155725 + 0.0010, 
    longitude: 136.963427 + 0.0010,
    camp_id: 1,
  },
  {
    id: 0,
    latitude: 35.155725 + 0.0015, 
    longitude: 136.963427 + 0.0015,
    camp_id: 2,
  },
];

// MAPの初期化処理
function initMap() {
  // API叩いて一覧取得
  all().then(data => {
    console.log(data)
    data.map(datum => campEncampedLocations.push(datum))
  })

  // 初期化
  navigator.geolocation.getCurrentPosition(function location(position) {
    currentLocation.lat = position.coords.latitude;
    currentLocation.lng = position.coords.longitude;

    map = new google.maps.Map(document.getElementById("map"), {
      center: currentLocation,
      zoom: 17,
    });

    moveCurrentPositionMarker()

    campEncampedLocations.forEach(layer => {
      writeSquare(layer)
    })
  });

  // setInterval("changeCurrentPosition()", 10000);
}

// 位置情報を追加して円を表示
function addLayer() {
  let camp_encamped_location = {
    latitude: 0,
    longitude: 0,
    camp_id: campId,
  }
  navigator.geolocation.getCurrentPosition(function show_location(position) {
    camp_encamped_location.latitude = position.coords.latitude;
    camp_encamped_location.longitude = position.coords.longitude;

    // 重なるやつないかチェック

    writeSquare(camp_encamped_location)
    campEncampedLocations.push(camp_encamped_location)
    // API叩いて作成！！！！！！！！！！！！！！！！！！！！！！！！！！
    save(camp_encamped_location)
  });
}

// 四角形を表示
function genSquareCoords(location) {
  return [
    { lat: location.latitude + 0.0005, lng: location.longitude + 0.0005 },
    { lat: location.latitude + 0.0005, lng: location.longitude - 0.0005 },
    { lat: location.latitude - 0.0005, lng: location.longitude - 0.0005 },
    { lat: location.latitude - 0.0005, lng: location.longitude + 0.0005 },
    { lat: location.latitude + 0.0005, lng: location.longitude + 0.0005 },
  ];
}
function writeSquare(layer) {
  let squareCoords = genSquareCoords(layer)
  console.log(squareCoords)
  const square = new google.maps.Polygon({
    paths: squareCoords,
    strokeColor: "#ffffff",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: campColors[layer.camp_id].color,
    fillOpacity: 0.8,
  });
  square.setMap(map);
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