
const html = `
  <script src="https://cesium.com/downloads/cesiumjs/releases/1.98/Build/Cesium/Cesium.js"></script>
  <link href="https://cesium.com/downloads/cesiumjs/releases/1.98/Build/Cesium/Widgets/widgets.css" rel="stylesheet">
  <style>
  

  </style>
  <script>
  const czml = [
    {
      id: "document",
      name: "CZML Model",
      version: "1.0",
    },
    {
      id: "aircraft model",
      name: "Cesium Air",
      position: {
        cartographicDegrees: [-77, 37, 10000],
      },
      model: {
        gltf: "../3d/windturbine.glb",
        scale: 2.0,
        minimumPixelSize: 128,
      },
    },
  ];
  
  const viewer = new Cesium.Viewer("cesiumContainer", {
    shouldAnimate: true,
  });
  
  const dataSourcePromise = viewer.dataSources.add(
    Cesium.CzmlDataSource.load(czml)
  );
  
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


