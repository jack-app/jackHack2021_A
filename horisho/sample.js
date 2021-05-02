let map;
let layers;

layers = [
  {
    center: { lat: 35.155725, lng: 136.963427 },
    population: 50,
    camp: "#FF0000",
  },
  {
    center: { lat: 35.155725 + 0.0005, lng: 136.963427 },
    population: 50,
    camp: "#FF0000",
  },
  {
    center: { lat: 35.155725 + 0.0010, lng: 136.963427 },
    population: 50,
    camp: "#FF0000",
  },
  {
    center: { lat: 35.155725 + 0.0015, lng: 136.963427 },
    population: 50,
    camp: "#0037ff",
  },
];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.155725, lng: 136.963427 },
    zoom: 17,
  });
  // Construct the circle for each value in layers.
  // Note: We scale the area of the circle based on the population.
  layers.forEach(layer => {
    const cityCircle = new google.maps.Circle({
      strokeColor: "#ffffff",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: layer.camp,
      fillOpacity: 0.8,
      map,
      center: layer.center,
      radius: layer.population,
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
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
    center: layer.center,
    radius: layer.population,
  });
}

function addlayer() {
  layers.push(layer)
}