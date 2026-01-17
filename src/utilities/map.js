export function addRouteAndMarkers(map, from, user) {
  map.addSource("connection", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [from.lng, from.lat],
              [user.lng, user.lat],
            ],
          },
        },
        {
          type: "Feature",
          properties: { role: "from" }, // Göttingen
          geometry: {
            type: "Point",
            coordinates: [from.lng, from.lat],
          },
        },
        {
          type: "Feature",
          properties: { role: "user" }, // User location
          geometry: {
            type: "Point",
            coordinates: [user.lng, user.lat],
          },
        },
      ],
    },
  });

  // Route
  map.addLayer({
    id: "route-line",
    type: "line",
    source: "connection",
    filter: ["==", ["geometry-type"], "LineString"],
    layout: { "line-cap": "round" },
    paint: {
      "line-color": "#3b82f6",
      "line-width": 3,
      "line-dasharray": [2, 2],
    },
  });

  // Markers (PIXEL PERFECT)
  map.addLayer({
    id: "from-marker",
    type: "circle",
    source: "connection",
    filter: ["==", ["get", "role"], "user"],
    paint: {
      "circle-radius": 6,
      "circle-color": "#000",
      "circle-stroke-width": 2,
      "circle-stroke-color": "#fff",
    },
  });

  const img = new Image();
  img.src = "/mini-profile.png"; // Direct path in public folder
  img.onload = () => {
  if (!map.hasImage('user-icon')) {
    map.addImage('user-icon', img);

    map.addLayer({
      id: 'user-marker',
      type: 'symbol',
      source: 'connection',
      filter: ['==', ['get', 'role'], 'from'],
      layout: {
        'icon-image': 'user-icon',
        'icon-size': 0.4,
        'icon-anchor': 'bottom',
      },
    });
  }
};

}



