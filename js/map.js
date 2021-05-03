let map;
let marker
// query 取ってくる
const campId = window.location.search.slice(1).split("=")[1]

let currentLocation = { latitude: 0, longitude: 0, camp_id: campId}

function changeCurrentPosition() {
  navigator.geolocation.getCurrentPosition(function location(position) {
    currentLocation.latitude = position.coords.latitude;
    currentLocation.longitude = position.coords.longitude;
    console.log("初期位置")
    console.log(currentLocation)
    var result = new Promise(function(resolve) {
      moveCurrentPositionMarker()
      resolve("moved Marker");
    })
    result.then(data => {
      console.log(data)
      addLayer()
    }) 
  });
}

function moveCurrentPositionMarker() {
  marker.setMap(null)
  marker = new google.maps.Marker({
    position: { lat: currentLocation.latitude -= 0.0010, lng: currentLocation.longitude -= 0.0010 },
    map,
  });
}

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
  // for debug
  {
    id: 0, latitude: 35.146072 + 0.0003, longitude: 136.9640067 + 0.0003, camp_id: 3
  },
  {
    id: 0, latitude: 35.146072 + 0.0008, longitude: 136.9640067 + 0.0008, camp_id: 3
  },
  {
    id: 0, latitude: 35.146072 + 0.0013, longitude: 136.9640067 + 0.0013, camp_id: 3
  },
  // {
  //   id: 0,
  //   latitude: 35.155725, 
  //   longitude: 136.963427,
  //   camp_id: 1,
  // },
  // {
  //   id: 0,
  //   latitude: 35.155725 + 0.0005, 
  //   longitude: 136.963427,
  //   camp_id: 1,
  // },
  // {
  //   id: 0,
  //   latitude: 35.155725 + 0.0010, 
  //   longitude: 136.963427,
  //   camp_id: 1,
  // },
  // {
  //   id: 0,
  //   latitude: 35.155725 + 0.0015, 
  //   longitude: 136.963427,
  //   camp_id: 2,
  // },
  // {
  //   id: 0,
  //   latitude: 35.155725, 
  //   longitude: 136.963427,
  //   camp_id: 1,
  // },
  // {
  //   id: 0,
  //   latitude: 35.155725 + 0.0005, 
  //   longitude: 136.963427 + 0.0005,
  //   camp_id: 1,
  // },
  // {
  //   id: 0,
  //   latitude: 35.155725 + 0.0010, 
  //   longitude: 136.963427 + 0.0010,
  //   camp_id: 1,
  // },
  // {
  //   id: 0,
  //   latitude: 35.155725 + 0.0015, 
  //   longitude: 136.963427 + 0.0015,
  //   camp_id: 2,
  // },
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
    currentLocation.latitude = position.coords.latitude;
    currentLocation.longitude = position.coords.longitude;

    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: currentLocation.latitude, lng: currentLocation.longitude },
      zoom: 17,
    });

    marker = new google.maps.Marker({
      position: { lat: currentLocation.latitude, lng: currentLocation.longitude },
      map,
    });

    campEncampedLocations.forEach(layer => {
      // writeSquare(layer)
      writeCircle(layer)
    })

    addLayer()
  });

  setInterval("changeCurrentPosition()", 10000);
}

// 位置情報を追加して四角形を表示
function addLayer() {
  // 重なるやつないかチェック
  if (!overlapOwnCircleExists(currentLocation)) {
    console.log("tukuruyo")
    console.log(currentLocation)
    // ポリゴン描画
    // writeSquare(currentLocation)
    writeCircle(currentLocation)
    campEncampedLocations.push(currentLocation)

    // API叩く
    save(currentLocation)
  }
}

// 円の重なりチェック
function overlapOwnCircleExists(camp_encamped_location) {
  let flag = false
  campEncampedLocations.forEach( (cEL, idx) => {
    console.log(cEL)
    console.log(Math.abs(cEL.latitude - camp_encamped_location.latitude))
    console.log(Math.abs(cEL.longitude - camp_encamped_location.longitude) )
    if (Math.abs(cEL.latitude - camp_encamped_location.latitude) < 0.0010 && Math.abs(cEL.longitude - camp_encamped_location.longitude) < 0.0010) {
      if (String(cEL.camp_id) != String(camp_encamped_location.camp_id)) {
        // deleteCircle(cEL, idx)
      } else {
        flag = true
      }
      console.log(flag)
    }
  })
  console.log(flag)
  return flag
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
  layer.circle = cityCircle
}
// 円を削除
function deleteCircle(layer, deleteIdx) {
  console.log("this is deleteCircle")
  layer.circle.setMap(null)
  deleteCEL(layer.id)
  delete campEncampedLocations[deleteIdx]
}

// // 四角形を表示
// function genSquareCoords(location) {
//   return [
//     { lat: location.latitude + 0.0005, lng: location.longitude + 0.0005 },
//     { lat: location.latitude + 0.0005, lng: location.longitude - 0.0005 },
//     { lat: location.latitude - 0.0005, lng: location.longitude - 0.0005 },
//     { lat: location.latitude - 0.0005, lng: location.longitude + 0.0005 },
//     { lat: location.latitude + 0.0005, lng: location.longitude + 0.0005 },
//   ];
// }
// function writeSquare(layer) {
//   let squareCoords = genSquareCoords(layer)
//   console.log(squareCoords)
//   const square = new google.maps.Polygon({
//     paths: squareCoords,
//     strokeColor: "#ffffff",
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//     fillColor: campColors[layer.camp_id].color,
//     fillOpacity: 0.8,
//   });
//   square.setMap(map);
// }


async function all() {
  let resp = await fetch(`http://localhost:8000/camp_encamped_locations`, {mode: 'cors'})
  return resp.json()
}

function save(camp_encamped_location) {
  // credential周り設定したほうが良さそう。
  delete camp_encamped_location.circle
  fetch( 'http://localhost:8000/camp_encamped_locations', { method: "POST", body: JSON.stringify(camp_encamped_location), mode: "cors" } )
  .then(resp => console.log(resp))
}

function deleteCEL(id) {
  // credential周り設定したほうが良さそう。
  fetch( `http://localhost:8000/camp_encamped_locations/${id}`, { method: "DELETE", mode: "cors" } )
  .then(resp => console.log(resp))
}