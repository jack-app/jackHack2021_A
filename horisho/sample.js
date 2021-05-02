// import CampEncampedLocation from "../js/models/camp_encamped_location";

let map;
let layers;
const camps = {
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

layers = [
  {
    center: { lat: 35.155725, lng: 136.963427 },
    camp: 1,
  },
  {
    center: { lat: 35.155725 + 0.0005, lng: 136.963427 },
    camp: 1,
  },
  {
    center: { lat: 35.155725 + 0.0010, lng: 136.963427 },
    camp: 1,
  },
  {
    center: { lat: 35.155725 + 0.0015, lng: 136.963427 },
    camp: 2,
  },
];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.155725, lng: 136.963427 },
    zoom: 17,
  });

  // CampEncampedLocation.all().then(data => {
  //   layers = data
  // })

  // Construct the circle for each value in layers.
  // Note: We scale the area of the circle based on the population.
  layers.forEach(layer => {
    const cityCircle = new google.maps.Circle({
      strokeColor: "#ffffff",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: camps[layer.camp].color,
      fillOpacity: 0.8,
      map,
      center: layer.center,
      radius: 50,
    });
  })
}

function overlay(layer) {
  addlayer(layer)
  // Construct the circle for each value in layers.
  // Note: We scale the area of the circle based on the population.
  // Add the circle for this city to the map.
  const cityCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: camps[layer.camp].color,
    fillOpacity: 0.35,
    map,
    center: layer.center,
    radius: 50,
  });
}

function addlayer() {
  layers.push(layer)
}