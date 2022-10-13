const markerThatTitleIsReearth = reearth.layers.findAll(
  layer => layer.type === "marker"
);

console.log(markerThatTitleIsReearth.property.default.location);
// if (markerThatTitleIsReearth) {
//   // temporally update marker location
//   reearth.layers.overrideProperty(markerThatTitleIsReearth.id, {
//       default: {
//           location: { lat: 100, lng: 0, height: 0 }
//       }
//   });
// }