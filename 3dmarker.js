
const html = `
  <script src="https://cesium.com/downloads/cesiumjs/releases/1.98/Build/Cesium/Cesium.js"></script>
  <link href="https://cesium.com/downloads/cesiumjs/releases/1.98/Build/Cesium/Widgets/widgets.css" rel="stylesheet">
  <style>
  

  </style>
  <script>
  const czml = [
    {
      id: "aircraft model",
      name: "Cesium Air",
      position: {
        cartographicDegrees: [-77, 37, 10000],
      },
      model: {
        gltf: "https://reeath.000webhostapp.com/windturbine.glb",
        scale: 4.0,
        minimumPixelSize: 1008,
      },
    },
  ];
  
  const viewer = new Cesium.Viewer("cesiumContainer", {
    shouldAnimate: true,
  });
  
  
  dataSourcePromise
    .then(function (dataSource) {
      viewer.trackedEntity = dataSource.entities.getById(
        "aircraft model"
      );
    })
    .catch(function (error) {
      window.alert(error);
    });
  
  

  </script>
  `;


  reearth.ui.show(html);


